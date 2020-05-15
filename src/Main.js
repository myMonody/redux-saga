import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import List from "./components/List";
import Input from "./components/Input";
import User from "./components/User";

class Main extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-intro">wellcome use react-redux</h1>
        <User />
        <hr />
        <h1 className="App-intro">wellcome use redux-saga</h1>
        <hr />
        <div className="todo">
          <Header />
          <Input />
          <List />
        </div>
      </div>
    );
  }
}

export default Main;
