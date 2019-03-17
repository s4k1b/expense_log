import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    logs: {},
    filteredLogs: {},
    searchText: "",
    paginationItemCount: null,
    pagination: {
      itemsPerPage: 10,
      start: 0,
      end: 10,

      innerTable: {
        itemsPerPage: 5,
        start: 0,
        end: 5
      }
    }
  },
  getters,
  mutations,
  actions
});
