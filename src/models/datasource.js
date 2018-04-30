export default {
  namespace: 'datasource',
  state: {
    name: '', // project name
    source: '', // link source
    groups: [],
    actions: []
  },
  actions: {
    addGroup(state, { name }) {

    },
    destroyGroup(state, { name }) {

    },
    editGroup(state, { name }) {

    },
    addItem(state, { name, group, method, query, body, header }) {

    },
    destroyItem(state, { id }) {

    },
    editItem(state, { id }) {

    }
  }
};
