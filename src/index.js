import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import 'node.date-time';
import './libs/runtime';
import Store from './models';
import Routers from './routers';

import './style/ant.plain.less';
import './style/index.less';

import('./style/fonticon/css/fontawesome.css');
import('./style/fonticon/css/fa-solid.css');
import('./style/fonticon/css/fa-brands.css');
import('./style/fonticon/css/fa-regular.css');
import('./style/fonticon/css/fa-light.css');

moment.locale('zh-cn');

const history = syncHistoryWithStore(browserHistory, Store);

ReactDom.render((
  <Provider store={Store}>
    <Routers history={history} />
  </Provider>
), window.document.getElementById('react-root'));
