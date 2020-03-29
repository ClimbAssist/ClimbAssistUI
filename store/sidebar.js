export const state = () => ({
  sidebar: "defaultV"
});
export const getters = {};
export const mutations = {
  updateSidebar: (state, payload) => {
    state.sidebar = payload;
  }
};
export const actions = {};
