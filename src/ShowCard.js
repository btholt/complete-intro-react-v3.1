import React from "react";
import { string } from "prop-types";
import styled from "react-emotion";
import axios from "axios";

const Wrapper = styled("div")`
  width: 32%;
  border: 2px solid #333;
  border-radius: 4px;
  margin-bottom: 25px;
  padding-right: 10px;
  overflow: hidden;
`;

class ShowCard extends React.Component {
  state = {
    score: -1
  };
  componentDidMount() {
    axios.get(`http://localhost:3000/${this.props.imdbID}`).then(response => {
      this.setState({
        score: response.data.rating
      });
    });
  }
  render() {
    let score;
    if (this.state.score < 0) {
      score = <h4>loading …</h4>;
    } else {
      score = <h4>{this.state.score}</h4>;
    }
    return (
      <Wrapper>
        <img
          alt={`${this.props.title} show poster`}
          src="http://placecorgi.com/400/400"
        />
        <div>
          <h3>{this.props.title}</h3>
          <h4>({this.props.year})</h4>
          {score}
          <p>{this.props.description}</p>
        </div>
      </Wrapper>
    );
  }
}

ShowCard.propTypes = {
  title: string.isRequired,
  year: string.isRequired,
  description: string.isRequired
};

export default ShowCard;
