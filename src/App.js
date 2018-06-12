import React from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import Landing from "./Landing";
import Search from "./Search";
import Details from "./Details";

const FourOhFour = () => <h1>404</h1>;

class App extends React.Component {
  state = {
    searchTerm: ""
  };
  handleSearchTermChange = event => {
    event.preventDefault();
    this.setState({
      searchTerm: event.target.value
    });
  };
  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Landing
                searchTerm={this.state.searchTerm}
                handleSearchTermChange={this.handleSearchTermChange}
                {...props}
              />
            )}
          />
          <Route
            path="/search"
            render={props => (
              <Search
                searchTerm={this.state.searchTerm}
                handleSearchTermChange={this.handleSearchTermChange}
                {...props}
              />
            )}
          />
          <Route path="/details/:id" component={Details} />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    );
  }
}

export default hot(module)(App);
