import React from "react";
import ReactDOM from "react-dom";
import MyTitle from "./MyTitle";

const MyFirstComponent = function() {
  return React.createElement("div", {}, [
    React.createElement(MyTitle, { color: "peru", title: "Legion" }),
    React.createElement(MyTitle, {
      color: "mediumseagreen",
      title: "Westworld"
    }),
    React.createElement(MyTitle, {
      color: "dodgerblue",
      title: "Game of Thrones"
    }),
    React.createElement(MyTitle, {
      color: "papayawhip",
      title: "Sons of Anarchy"
    })
  ]);
};

ReactDOM.render(
  React.createElement(MyFirstComponent, {}, null),
  document.getElementById("app")
);
