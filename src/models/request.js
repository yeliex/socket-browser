// requesting flags
export default {
  namespace: 'request',
  state: {
    running: false
  },
  actions: {
    start(state) {
      return {
        ...state,
        running: true
      };
    },
    stop(state) {
      return {
        ...state,
        running: false
      };
    }
  }
};
