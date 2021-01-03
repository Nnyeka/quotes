import React from "react"
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

import AddQuote from "./component/AddQuote"
import Quote from "./component/Quote"
import QuoteList from "./component/QuoteList"

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/quotes" className="navbar-brand">
          DisQuotes
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/quotes"} className="nav-link">
              Quotes
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/quotes"]} component={QuoteList} />
          <Route exact path="/add" component={AddQuote} />
          <Route path="/quotes/:id" component={Quote} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
