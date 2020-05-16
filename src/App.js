import React, { Component } from "react";
import ReactPage from "./content/ReactPage";
import "./app.scss";
//import { Content } from 'carbon-components-react/lib/components/UIShell';
//import { Route, Switch } from 'react-router-dom';

/*
// TODO: add content switcher
<Content>
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/repos" component={RepoPage} />
  </Switch>
</Content>
*/
class App extends Component {
  render() {
    return (
      <>
        <ReactPage />
      </>
    );
  }
}

export default App;
