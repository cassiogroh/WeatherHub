import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import About from '../pages/About';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/signin' component={SignIn} />
      <Route path='/signup' component={SignUp} />
      <Route path='/about' component={About} />
      
      <Route path='/dashboard' component={Dashboard} isPrivate />
    </Switch>
  )
};

export default Routes;