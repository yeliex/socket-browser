import React from 'react';
import { Router, Route, IndexRedirect, Redirect, IndexRoute } from 'react-router';
import App from '../pages/App';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';
import MainWrapper from '../components/MainWrapper';
import loader from '../components/Import';

const Routers = ({ history }) => (
  <Router history={history}>
    <Route components={Navigation}>

      <Route component={Sidebar}>

        <Route path="/" component={MainWrapper}>
          <IndexRoute component={loader(() => import('../pages/home'))} />

          <Route path="*" component={loader(() => import('../pages/error'))} />
        </Route>
      </Route>

      <Route path="/error">
        <Route path=":code" component={loader(() => import('../pages/error'))} />
      </Route>
    </Route>
  </Router>
);

export default Routers;
