import React from "react";
import { Link } from "react-router-dom";
const Landing = props => (
  <div className="landing">
    <h1>The Big Show</h1>
    <input
      value={props.searchTerm}
      onChange={props.handleSearchTermChange}
      type="text"
      placeholder="search"
    />
    <Link to="/search">Submit</Link>
  </div>
);

export default Landing;
