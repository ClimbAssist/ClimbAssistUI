export const state = () => ({
  snackbar: false,
  message: undefined,
  timeout: 1000,
  type: undefined,
  link: undefined,
  linkMessage: undefined,
});
export const getters = {};
export const mutations = {
  updateMessage: (state, payload) => {
    state.message = payload;
  },
  updateTimeout: (state, payload) => {
    state.timeout = payload;
  },
  updateSnackbar: (state, payload) => {
    state.snackbar = payload;
  },
  updateType: (state, payload) => {
    state.type = payload;
  },
  updateLink: (state, payload) => {
    state.link = payload;
  },
  updateLinkMessage: (state, payload) => {
    state.linkMessage = payload;
  },
};
export const actions = {
  updateMessage: (payload) => {
    payload.commit("updateMessage");
  },
  updateTimeout: (payload) => {
    payload.commit("updateTimeout");
  },
  updateSnackbar: (payload) => {
    payload.commit("updateSnackbar");
  },
  updateType: (payload) => {
    payload.commit("updateType");
  },
  updateLink: (payload) => {
    payload.commit("updateLink");
  },
  updateLinkMessage: (payload) => {
    payload.commit("updateLinkMessage");
  },
};
