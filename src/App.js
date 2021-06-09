import React from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Page from "./components/Page";
import './App.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">

          <nav>
            <Link to="/">2FA</Link>
            <Link to="/p2">Маркет</Link>
          </nav>

          <main>
            <Switch>
              <Route path="/" exact>
                <Page name="2FA"/>
              </Route>
              <Route path="/p2">
                <Page name="Маркет"/>
              </Route>
            </Switch>
          </main>

        </div>
      </BrowserRouter>
    )
  }
}
export default App;