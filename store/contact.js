export const state = () => ({
  recaptchaKey: undefined,
});
export const getters = {};
export const mutations = {
  updateRecaptchaKey: (state, payload) => {
    state.recaptchaKey = payload;
  },
};
export const actions = {};
