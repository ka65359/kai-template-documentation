import React, { Component } from "react";
import logo from "./logo.svg";
import "./ReactPage.css";

// TODO: Change this to non-class component check carbon files for example
// this is going to be the landing page that servers up tictac toe in one tab
// and will this code below in another... I'm not sure if I want to use a class
// but it could be cood to have an example class component... check how it's instantiated
// in the original template project
//
// You also need to break up the styles and such as per Carbon styling guides and move
// these helper functions in TicTacToe out to a library or something
// And write all your tests for those functions!
class ReactPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      greeting: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let nameStr = this.state.name || "World";
    let urlStr = `/kai-api/greeting?name=${nameStr}`;
    fetch(urlStr)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return "Error: Bad response";
      })
      .then((state) => {
        this.setState(state);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Enter your name: </label>
            <input
              id="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{this.state.greeting}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default ReactPage;
