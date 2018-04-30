export default {
  namespace: 'sidebar',
  state: {
    list: [],
    opened: []
  },
  actions: {
    setOpened(state, { list }) {
      return {
        ...state,
        opened: list
      };
    },
    setList(state, { list }) {
      return {
        ...state,
        list
      };
    }
  }
};
