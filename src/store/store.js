import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    users: {},
    logs: {},
    log: {},
    filteredLogs: {},
    searchText: "",
    selectedEntryType: "",
    paginationItemCount: null,
    pagination: {
      itemsPerPage: 10,
      start: 0,
      end: 10
    }
  },
  getters,
  mutations,
  actions
});
