const searchText$set = ({ commit }, searchText) => {
  // console.log("searchText: ", searchText);
  commit("searchText$set", searchText);
  commit("filteredLogs");
  // commit("pagination$set", {start: 0, end: getters.pagination.itemsPerPage })
};

export default {
  searchText$set
};
