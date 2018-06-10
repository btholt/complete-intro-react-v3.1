---
title: "Data in React"
---

So now we want to add a third page: a page where we can watch the trailer. This is going to be an application of what we know already.

Create a new file in js/ called Details.jsx. In Details put:

```javascript
import React from "react";

const Details = () => (
  <div className="details">
    <h1>lolhi</h1>
  </div>
);

export default Details;
```

In App.jsx, put your new route:

```javascript
// require your new route
import Details from './Details'

// add as last route in the nested routes
<Match pattern='/details/:id' component={Details} />
```

Here we've added a URL parameter using the colon. Now as a prop to Details you'll get whatever :id was. So now try to manually change the anchor on your url to be `http://localhost:8080/#/details/1`. You should see your new component here.

If you see a blank page and a 404 error in your console, chances are you need to add a leading slash to your script and link tags in your index.html file for the paths, `<&NegativeMediumSpace;script src="/public/bundle.js"></script>` and `<&NegativeMediumSpace;link rel="stylesheet" href="/public/style.css" />`.

Let's show you a neat debugging tip I totally stole from [Ryan Florence][ryflo]. replace that h1 with this:

```javascript
// instead of the h1 in render
const Details = props => (
  <div className="details">
    <pre>
      <code>{JSON.stringify(props, null, 4)}</code>
    </pre>
  </div>
);
```

This is a useful way to dump your params to the page to see what react-router is giving you. This is **awesome** for state too; it shows you in real time what your state looks like. We'll dig into React Tools here in a sec for even better debugging but for now let's keep trucking with our Details.jsx.

We're going to show all the details of a show on this page and be able to play the trailer. There's a _big_ problem here that we don't have that data on this page though; it's available in the Search route. We _could_ require in data.json here given that our data is available that way but that typically isn't the case: we typically get this data from the server. If that's the case, you don't want to make two AJAX requests to get the same data. In other words, we need to share this state between components. The way you do this is by pushing up the state to the highest common ancestor component. In this case, that'd be the router in App. So let's first refactor Search to still work while it pulls in that data from Search.

```javascript
// in App.jsx
// another import
import preload from '../data.json'

// modify the existing route
<Route path="/search" component={props => <Search shows={preload.shows} {...props} />} />
```

Now make Search use it

```javascript
// delete import preload from '../data.json'

// change the map call instead of {preload.shows
{this.props.route.shows
```

Cool. Now it should still work but Search no longer imports the data but merely receives it as props. Now we can share this data with Details. Notice that Search has a function instead of a React component, but if you think about it a function that returns markup _is_ a React component, so this works. This allows us to pass in the shows as a parameter to Search. You'll see this pattern often with react-router v4.

Now we're going to pass the correct show to the Details page. There's a bunch of ways to do this:

- We could pass all the shows and let Details select the correct show. This isn't great because Details is given an additional concern it doesn't need to have.
- We could create a callback in App that it passes to Details that Details calls with the correct ID and ClientApp hands back the correct show. This is slightly better but it's an odd API for getting data. Ideally we just hand down props and not a callback, especially since this isn't async.
- Or we could hook into react-router's ability to pass props down through stateless functions like we did with Search and just pass down the correct show. This is the best approach.

Add the following to App:

```javascript
// add at the imports at the top
<Route
  path="/details/:id"
  component={props => {
    const selectedShow = preload.shows.find(
      show => props.params.id === show.imdbID
    );
    return <Details show={selectedShow} {...props} />;
  }}
/>
```

This should put the correct show as one of the props that App passes down to Details. If you refresh the page, you should see it now. (You have to have a valid URL for a details page, like `<your localhost>/details/tt4574334`).

As an aside, I've found the _best_ way to organize React method component is the following

1.  props / defaultProps/ props
1.  constructor
1.  Other lifecycle methods like componentDidUpdate (we'll talk about those in a sec)
1.  Your methods you create (like assignShow)
1.  render

Makes it easier to find things when you look for them.

So let's actually display some cool stuff:

```javascript
import React from "react";

const Details = props => {
  const { title, description, year, poster, trailer } = props.show;
  return (
    <div className="details">
      <header>
        <h1>The Big Show</h1>
      </header>
      <section>
        <h1>{title}</h1>
        <h2>({year})</h2>
        <img
          src={`/public/img/posters/${poster}`}
          alt={`Poster for ${title}`}
        />
        <p>{description}</p>
      </section>
      <div>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&amp;controls=0&amp;showinfo=0`}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Details;
```

Now you should have some nice looking UI.

Well, now we have a header in two places. That's a **strong** indicator that you should make it's its own component. Let's abstract that in a component and use that in both places. Create a new file called Header.jsx and put this in there:

```javascript
import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <h1>
      <Link to="/">The Big Show</Link>
    </h1>
  </header>
);

export default Header;
```

We're even going to throw in a link back to the home page for fun. Now open Details.jsx and put:

```javascript
// add to the top
import Header from './Header'

// replace <header>...</header>
<Header />
```

Let's put a back button on the Header so you can get back to Search after you reach it.

```javascript
// after the h1 inside .header
<h2>
  <Link to="/search">Back</Link>
</h2>
```

So let's integrate this to Search. But it's not so simple since on Search we want the header to have a search input and on Details we want a back button. So let's see how to do that. In Header.jsx put:

```javascript
import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  let utilSpace;
  if (props.showSearch) {
    utilSpace = (
      <input
        type="text"
        placeholder="Search"
        value={props.searchTerm}
        onChange={props.handleSearchTermChange}
      />
    );
  } else {
    utilSpace = (
      <h2 className="header-back">
        <Link to="/search">Back</Link>
      </h2>
    );
  }
  return (
    <header>
      <h1>
        <Link to="/">svideo</Link>
      </h1>
      {utilSpace}
    </header>
  );
};

export default Header;
```

In Search.jsx:

```javascript
// add to requires
import Header from "./Header";

// replace <header></header>
<Header
  handleSearchTermChange={this.handleSearchTermChange}
  showSearch
  searchTerm={this.state.searchTerm}
/>;
```

This is how you have a child component modify a parent's state: you pass down the callback and let it call the parent to let the parent modify the state. This also demonstrates how to conditionally show one component and not another.

Lastly let's make our show cards clickable.

```javascript
// @flow

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 32%;
  border: 2px solid #333;
  border-radius: 4px;
  margin-bottom: 25px;
  padding-right: 10px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 46%;
  float: left;
  margin-right: 10px;
`;

const ShowCard = props => (
  <Link to={`/details/${props.imdbID}`}>
    <Wrapper>
      <Image
        alt={`${props.title} Show Poster`}
        src={`/public/img/posters/${props.poster}`}
      />
      <div>
        <h3>{props.title}</h3>
        <h4>({props.year})</h4>
        <p>{props.description}</p>
      </div>
    </Wrapper>
  </Link>
);

export default ShowCard;
```

Oh 💩! We messed up our styles. The reason is that the way Link works is that it outputs an `<a>` tag. Luckily, we can even style that too! Try this:

```javascript
// replace styled.div with styled(Link)
const Wrapper = styled(Link)`

// add two lines to Wrapper's CSS, otherwise you'll get blue text styles
text-decoration: none;
color: black;
```

Now each of the cards should be clickable through to the details page and styled correctly!

But now we've messed up Search's tests. If you remember, Enzyme's testing library only shallowly renders the components. Since we moved the Header logic from inside Search into Header, this is going to mess up the existing snapshot (which we can just fix easily) and we won't be able to directly interact with the input inside of Header without some additional code.

We also changed the contract of Search since it now requires the shows to passed in. Modify the three `<Search />` to be `<Search shows={preload.shows} />`.

First, run `npm run test:update` to fix your snapshot. Your third test will still fail but the first one will update.

Next, open Search.spec.jsx and add this:

```javascript
// last import
import Header from "../Header";

// modify the simulation line
component
  .find(Header)
  .dive()
  .find("input")
  .simulate("change", { target: { value: searchWord } });
```

By finding and "diving" on the Header component, we're telling Enzyme to also render that Header so that we can interact with it. Run your tests again and now they should pass!

[ryflo]: https://twitter.com/ryanflorence
