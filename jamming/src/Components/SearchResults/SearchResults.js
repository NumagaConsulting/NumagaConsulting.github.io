import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

class SearchResults extends React.Component {
  renderResults() {
    if (this.props.totalSearchResults) {
      return <h2>Results: {this.props.totalSearchResults} tracks.</h2>;
    }
    return <h2>Results</h2>;
  }

  render() {
    return (
      <div className='SearchResults'>
        {this.renderResults()}
        {/* Pass the search results from the SearchResults component to the TrackList component. */}
        <TrackList
          tracks={this.props.searchResults}
          onAdd={this.props.onAdd}
          isRemoval={false}
        />
      </div>
    );
  }
}

export default SearchResults;
