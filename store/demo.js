export const state = () => ({
  drawer: undefined,
  sheet: undefined,
});
export const getters = {};
export const mutations = {
  updateDrawer: (state, payload) => {
    state.drawer = payload;
  },
  updateSheet: (state, payload) => {
    state.sheet = payload;
  },
};
export const actions = {};
