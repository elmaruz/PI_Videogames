import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing.jsx';
import GameDisplay from './components/GameDisplay.jsx';
import Detail from './components/Detail.jsx';
import CreateGame from './components/CreateGame.jsx';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Landing} />
      <Route exact path='/videogames' component={GameDisplay} />
      <Route
        exact
        path='/videogames/:id'
        component={({ match }) => <Detail id={match.params.id} />}
      />
      <Route path='/create' component={CreateGame} />
    </Router>
  );
}

export default App;
