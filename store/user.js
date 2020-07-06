export const state = () => ({
  username: undefined,
  email: undefined,
  isAdministrator: false,
});
export const getters = {};
export const mutations = {
  updateUser: (state, payload) => {
    state.user = payload;
  },
  updateUsername: (state, payload) => {
    state.username = payload;
  },
  updateEmail: (state, payload) => {
    state.email = payload;
  },
  updateIsAdministrator: (state, payload) => {
    state.isAdministrator = payload;
  },
};
export const actions = {};
