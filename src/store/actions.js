const searchText$set = ({ commit }, searchText) => {
  // console.log("searchText: ", searchText);
  commit("searchText$set", searchText);
  commit("pagination$set", {
    start: 0
  });
  commit("filteredLogs");
  // commit("pagination$set", {start: 0, end: getters.pagination.itemsPerPage })
};

const selectedEntryType$set = ({ commit }, selectedEntryType) => {
  commit("selectedEntryType$set", selectedEntryType);
  commit("pagination$set", {
    start: 0
  });
  commit("filteredLogs");
};

export default {
  searchText$set,
  selectedEntryType$set
};
