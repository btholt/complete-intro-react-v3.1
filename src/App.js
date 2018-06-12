import React from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import Landing from "./Landing";
import Search from "./Search";
import Details from "./Details";

const FourOhFour = () => <h1>404</h1>;

const App = function() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/search" component={Search} />
        <Route path="/details/:id" component={Details} />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  );
};

export default hot(module)(App);
