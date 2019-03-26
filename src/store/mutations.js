export default {
  user$set(state, o) {
    state.user = o;
  },
  users$set(state, o) {
    state.users = o;
  },
  logs$set(state, o) {
    //sort item by date
    let newOb = {};
    const logKeys = Object.keys(o);
    logKeys.sort((logKey1, logKey2) => {
      if (o[`${logKey1}`].date > o[`${logKey2}`].date) return -1;
      else if (o[`${logKey1}`].date < o[`${logKey2}`].date) return 1;
      else return 0;
    });
    logKeys.forEach(logKey => (newOb[`${logKey}`] = o[`${logKey}`]));
    state.logs = newOb;
  },
  searchText$set(state, searchText) {
    state.searchText = searchText;
  },
  selectedEntryType$set(state, selectedEntryType) {
    state.selectedEntryType = selectedEntryType;
  },
  filteredLogs(state) {
    if (state.searchText) {
      const regExp = new RegExp(state.searchText, "i");
      const logKeys = Object.keys(state.logs).filter(log => {
        const items = state.logs[`${log}`].items.map(
          item => (item.userInfo && item.userInfo.fullName) || item.name
        );
        const sText = Object.values(items).join(", ");
        const res = sText.search(regExp);
        return res > -1;
      });

      let newOb = {};
      logKeys.forEach(logKey => (newOb[`${logKey}`] = state.logs[`${logKey}`]));
      state.filteredLogs = newOb;
    } else {
      state.filteredLogs = state.logs;
    }
    //for type selection
    let newObType = {};
    let logKeys = Object.keys(state.filteredLogs).filter(log => {
      if (state.selectedEntryType)
        return state.filteredLogs[`${log}`].type === state.selectedEntryType;
      else return true;
    });
    logKeys.forEach(
      logKey => (newObType[`${logKey}`] = state.filteredLogs[`${logKey}`])
    );
    state.filteredLogs = newObType;

    //for pagination
    newObType = {};
    state.paginationItemCount = Object.keys(state.filteredLogs).length;
    const pagination = state.pagination;
    const start = pagination.start;
    const end = Math.min(
      start + pagination.itemsPerPage,
      state.paginationItemCount
    );
    logKeys = Object.keys(state.filteredLogs).slice(start, end);
    logKeys.forEach(
      logKey => (newObType[`${logKey}`] = state.filteredLogs[`${logKey}`])
    );
    state.pagination.start = start;
    state.pagination.end = end;
    state.filteredLogs = newObType;
  },
  pagination$set(state, pagination) {
    state.pagination = {
      ...state.pagination,
      start: pagination.start
    };
  },
  log$set(state, o) {
    state.log = o;
  }
};
