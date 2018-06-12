import React from "react";

const ShowCard = props => (
  <div className="show-card">
    <img
      alt={`${props.show.title} show poster`}
      src="http://placecorgi.com/400/400"
    />
    <div>
      <h3>{props.show.title}</h3>
      <h4>({props.show.year})</h4>
      <p>{props.show.description}</p>
    </div>
  </div>
);

export default ShowCard;
