import React from 'react';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Settings from './pages/Settings';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/profile/:id">
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
