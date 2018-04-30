import { basename, extname } from 'path';
import { applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer as routing, routerMiddleware } from 'react-router-redux';
import Store, { combine, create } from 'store-decorator';

const Context = require.context('./', false, /\.js$/);

const Modules = Context.keys().filter((k) => k !== './index.js').reduce((total, k) => {
  total[basename(k, extname(k))] = Context(k);

  return total;
}, {});

combine(Modules);

create({ routing }, typeof window === 'object' ? window.__INITIAL_STATE__ || {} : {}, compose(
  applyMiddleware(routerMiddleware(browserHistory)),
  typeof window !== 'undefined' && process.env.NODE_ENV === 'development' && window.devToolsExtension ? window.devToolsExtension() : (f) => f // 调用redux-devtools-extension
));

export default Store();
