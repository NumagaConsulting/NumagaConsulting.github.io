import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      totalSearchResults: '',
      playlistName: '',
      playlistTracks: [],
      test: '',
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const newPlaylistTracks = this.state.playlistTracks;
    if (newPlaylistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }

    newPlaylistTracks.push(track);
    this.setState({ playlistTracks: newPlaylistTracks });
  }

  removeTrack(track) {
    const newPlaylistTracks = this.state.playlistTracks.filter(
      (savedTrack) => savedTrack.id !== track.id
    );
    this.setState({ playlistTracks: newPlaylistTracks });
    // this.addTrack(track);
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((element) => element.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then((response) =>
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: [],
        test: response,
      })
    );
  }

  search(term) {
    Spotify.search(term).then((searchResults) =>
      this.setState({
        searchResults: searchResults,
        totalSearchResults: searchResults.length,
      })
    );
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className='highlight'>mmm</span>ing
        </h1>
        <div className='App'>
          <SearchBar onSearch={this.search} />
          <div className='App-playlist'>
            {/* Pass the state of the App component’s searchResults to the SearchResults component. */}
            <SearchResults
              searchResults={this.state.searchResults}
              totalSearchResults={this.state.totalSearchResults}
              onAdd={this.addTrack}
            />
            {/* Pass the playlist name and tracks from the App component to the Playlist component. */}
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              test={this.state.test}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
