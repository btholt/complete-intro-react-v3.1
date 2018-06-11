import React from "react";

class MyTitle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontWeight: "normal",
      somethingElse: true
    };

    this.toggleFontWeight = this.toggleFontWeight.bind(this);
  }
  toggleFontWeight() {
    const newFontWeight = this.state.fontWeight === "bold" ? "normal" : "bold";

    this.setState({
      fontWeight: newFontWeight
    });
  }
  render() {
    return React.createElement(
      "div",
      {},
      React.createElement(
        "h1",
        {
          onClick: this.toggleFontWeight,
          style: { color: this.props.color, fontWeight: this.state.fontWeight }
        },
        this.props.title
      )
    );
  }
}

export default MyTitle;
