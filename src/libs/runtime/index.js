import * as locations from '../location';

const that = typeof window === 'object' ? window : global;

const wait = (ms) => {
  return new Promise((rec) => {
    setTimeout(() => {
      rec();
    }, ms);
  });
};

Promise.handle = () => {
  return new Promise(() => {
  });
};

Promise.wait = wait;

that.router = that.router || {};

Object.keys(locations).forEach((k) => {
  if (!that.router[k]) {
    that.router[k] = locations[k];
  }
}, {});

module.exports = that;
