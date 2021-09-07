import React from 'react';
import { BrowserRouter,Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/home';
import HooksPage from './pages/react-hooks';
import StatePage from './pages/state-manager';
import PlaygroudPage from './pages/playgroud';

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/">
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route path="/react_hooks" component={HooksPage} />
        <Route path="/state_manager" component={StatePage} />
        <Route path="/playgroud" component={PlaygroudPage} />
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
