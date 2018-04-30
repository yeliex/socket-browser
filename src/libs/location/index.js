import * as routerAction from 'react-router-redux';
import { parse, format } from 'url';
import Store from '../../models';

export const go = (params) => {
  params = typeof params === 'string' ? { pathname: params } : params;
  params.query = Object.assign({}, {
    plateNum: undefined
  }, params.query || {});
  console.log(params.query);
  Store.dispatch(routerAction.push(params));
};

export const redirect = (params) => {
  params = typeof params === 'string' ? { pathname: params } : params;
  params.query = Object.assign({}, {
    plateNum: undefined
  }, params.query || {});
  Store.dispatch(routerAction.replace(params));
};

export const goBack = (...params) => Store.dispatch(routerAction.goBack(...params));

export const goForward = (...params) => Store.dispatch(routerAction.goForward(...params));

export const goHistory = (...params) => Store.dispatch(routerAction.go(...params));

export const setTitle = (title) => {
  Store.app.setTitle({ title });
};

export const setQuery = (query) => {
  const url = parse(window.location.href, true);
  redirect({
    protocol: url.protocol,
    host: url.host,
    pathname: url.pathname,
    hash: url.hash,
    query: { ...url.query, ...query }
  });
};

export const reload = () => {
  const url = parse(window.location.href, true);
  window.location.replace(format({
    protocol: url.protocol,
    host: url.host,
    pathname: url.pathname,
    query: Object.assign({}, url.query, {
      _t: new Date().getTime()
    })
  }));
};
