export const state = () => ({
  frameTabs: null,
  activeRoute: null
});
export const getters = {};
export const mutations = {
  cragView: (state, payload) => {
    state.frameTabs = payload;
  },
  updateActiveRoute: (state, payload) => {
    state.activeRoute = payload;
  }
};
export const actions = {};
