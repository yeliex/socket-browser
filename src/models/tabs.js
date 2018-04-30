export default {
  namespace: 'tabs',
  state: {
    list: []
  },
  action: {
    add(state, { group, name }) {
      const exist = state.list.filter(({ group: g, name: n }) => g === group && n === name);
      if (exist.length > 0) {
        return state;
      }

      return {
        ...state,
        list: [
          ...state.list,
          {
            group,
            name
          }
        ]
      };
    },
    destroy(state, { group, name }) {
      return {
        ...state,
        list: state.list.filter(({ group: g, name: n }) => g !== group && n !== name)
      };
    },
    clear(state) {
      return {
        ...state,
        list: []
      };
    },
    set(state, { list }) {
      return {
        ...state,
        list
      };
    }
  }
};
