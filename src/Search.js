import React from "react";
import preload from "../data.json";
import ShowCard from "./ShowCard";

class Search extends React.Component {
  render() {
    return (
      <div className="search">
        <header>
          <h1>The Big Show?</h1>
          <input
            onChange={this.props.handleSearchTermChange}
            value={this.props.searchTerm}
            type="text"
            placeholder="Search"
          />
        </header>
        <div>
          {preload.shows
            .filter(
              show =>
                `${show.title} ${show.description}`
                  .toUpperCase()
                  .indexOf(this.props.searchTerm.toUpperCase()) >= 0
            )
            .map(tvShow => <ShowCard key={tvShow.imdbID} {...tvShow} />)}
        </div>
      </div>
    );
  }
}

export default Search;
