import React from 'react';
import { Router, Route, IndexRedirect, Redirect, IndexRoute } from 'react-router';
import App from '../pages/App';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';
import Container from '../components/Container';
import loader from '../components/Import';

const Routers = ({ history }) => (
  <Router history={history}>
    <Route components={Navigation}>

      <Route component={Sidebar}>

        <Route path="/" component={Container}>
          <IndexRoute component={loader(() => import('../pages/home'))} />
        </Route>
      </Route>

      <Route path="/error">
        <Route path=":code" component={loader(() => import('../pages/error'))} />
      </Route>

      <Route path="*" component={loader(() => import('../pages/error'))} />

    </Route>
  </Router>
);

export default Routers;
