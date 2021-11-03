import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing.jsx";
import GameDisplay from "./components/GameDisplay.jsx";
import Nav from "./components/Nav.jsx";
import Detail from "./components/Detail.jsx";
import CreateGame from "./components/CreateGame.jsx";

function App() {
  return (
    <Router>
      <React.Fragment>
        <Route exact path="/" component={Landing} />
        <Route exact path="/videogames" component={GameDisplay} def={""} />
        <Route
          exact
          path="/videogames/:id"
          component={({ match }) => <Detail id={match.params.id} />}
        />
        <Route path="/create" component={CreateGame} />
      </React.Fragment>
    </Router>
  );
}

export default App;
