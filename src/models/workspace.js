export default {
  namespace: 'workspace',
  state: {
    projectName: '',
    console: true,
    sidebar: true,
    theme: 'dark'
  },
  actions: {
    toggleSidebat(state, { open = !state.sidebar }) {
      return {
        ...state,
        sidebar: open
      };
    },
    toggleConsole(state, { open = !state.console }) {
      return {
        ...state,
        console: open
      };
    },
    toggleTheme(state, { theme }) {
      return {
        ...state,
        theme: theme || (theme === 'dark' ? 'light' : 'dark')
      };
    }
  }
};
