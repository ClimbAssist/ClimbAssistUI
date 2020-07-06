export const state = () => ({
  loadedModels: [],
});
export const getters = {};
export const mutations = {
  updateLoadedModels: (state, payload) => {
    state.loadedModels.push(payload);
  },
};
export const actions = {};
