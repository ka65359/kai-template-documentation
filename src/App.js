import React, { Component } from "react";
//import ReactPage from "./content/ReactPage";
import TicTacToePage from "./content/TicTacToePage";
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
/**
 * @class App - Contains the actual content
 * */
class App extends Component {
  render() {
    return (
      <>
        <TicTacToePage />
      </>
    );
  }
}

export default App;
