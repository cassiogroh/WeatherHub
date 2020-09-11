import React from 'react';
import { BrowserRouter , Route } from 'react-router-dom';

import Home from '../pages/Home';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import About from '../pages/About';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Home} />
      <Route path='/register' component={Register} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/about' component={About} />
    </BrowserRouter>
  )
};

export default Routes;