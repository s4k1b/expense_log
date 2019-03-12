export default {
  user$set(state, o) {
    Object.assign(state.user, { ...o });
  }
};
