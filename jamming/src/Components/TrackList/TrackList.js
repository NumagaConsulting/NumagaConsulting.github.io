import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  render() {
    return (
      <div className='TrackList'>
        {/* add a map method that renders a set of Track components */}
        {this.props.tracks.map((element, index) => {
          return (
            <Track
              track={element}
              index={index + 1}
              key={element.id}
              onAdd={this.props.onAdd}
              onRemove={this.props.onRemove}
              isRemoval={this.props.isRemoval}
            />
          );
        })}
      </div>
    );
  }
}

export default TrackList;
