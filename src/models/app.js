const name = 'Socket-Browser';

export default {
  namespace: 'app',
  state: {
    title: ''
  },
  actions: {
    title(state, { title }) {
      window.document.title = `${title ? `${title}-` : ''}${name}`;
      return {
        ...state,
        title
      };
    }
  }
};
