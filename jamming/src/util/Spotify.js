let accessToken;
const clientID = '876e0dffcac442d3a88bc0c8f9030193';
const redirectURI = 'https://numagaconsulting.github.io/live/jamming/';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expireInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expireInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = parseFloat(expireInMatch[1]);
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(term) {
    accessToken = Spotify.getAccessToken();
    return fetch(
      `https://api.spotify.com/v1/search?type=track&limit=20&q=${term}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
      .then(
        (response) => {
          return response.json();
        },
        (networkError) => {
          alert(networkError.message);
        }
      )
      .then((jsonResponse) => {
        // if (!jsonResponse.tracks.items.length) {
        //   return;
        // }
        return jsonResponse.tracks.items.map((element) => ({
          id: element.id,
          name: element.name,
          artist: element.artists[0].name,
          album: element.album.name,
          releaseDate: element.album.release_date,
          uri: element.uri,
        }));
      });
  },

  // .savePlaylist() method accepts a playlist name and an array of track URIs. It makes the following three requests to the Spotify API:
  // GET current user’s ID
  // POST a new playlist with the input name to the current user’s Spotify account. Receive the playlist ID back from the request.
  // POST the track URIs to the newly-created playlist, referencing the current user’s account (ID) and the new playlist (ID)

  savePlaylist(playlistName, playlistTracks) {
    if (!playlistName || !playlistTracks.length) {
      return;
    }

    accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    let userID;

    return fetch('https://api.spotify.com/v1/me', { headers: headers })
      .then(
        (response) => {
          return response.json();
        },
        (networkError) => {
          alert(networkError.message);
        }
      )
      .then((jsonResponse) => {
        userID = jsonResponse.id;
        const userName = jsonResponse.display_name;

        // create a named playlist by POST
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: playlistName }),
        })
          .then(
            (respons) => {
              return respons.json();
            },
            (networkError) => {
              alert(`Create playlist: ${networkError.message}`);
            }
          )
          .then((jsonResponse) => {
            const playlistID = jsonResponse.id;

            // save newly added tracks to the playlist just created on the step above
            return fetch(
              `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
              {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ uris: playlistTracks }),
              }
            )
              .then(
                (respons) => {
                  return respons.json();
                },
                (networkError) => {
                  alert(`add tracks to playlist: ${networkError.message}`);
                }
              )
              .then((jsonResponse) => {
                return [userName, playlistName];
              });
          });
      });
  },
};

export default Spotify;
