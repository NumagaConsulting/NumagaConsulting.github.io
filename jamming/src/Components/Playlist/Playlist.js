import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  renderSuccessfulMessage() {
    if (this.props.test) {
      return (
        <div>
          <br />
          <br />
          <p>
            Hey {this.props.test[0].split(' ')[0]}, "{this.props.test[1]}"
            saved!
          </p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className='Playlist'>
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
        {/* Pass the playlist tracks from the Playlist component to the TrackList component. */}
        <TrackList
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
        />
        <button className='Playlist-save' onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </button>
        {this.renderSuccessfulMessage()}
      </div>
    );
  }
}

export default Playlist;
