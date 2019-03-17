export default {
  user$set(state, o) {
    state.user = o;
  },
  logs$set(state, o) {
    state.logs = o;
  },
  searchText$set(state, searchText) {
    state.searchText = searchText;
  },
  filteredLogs(state) {
    if (state.searchText) {
      const regExp = new RegExp(state.searchText, "i");
      const logKeys = Object.keys(state.logs).filter(log => {
        const items = state.logs[`${log}`].items.map(item => item.name);
        const sText = Object.values(items).join(", ");
        // console.log("sText: ", sText);
        const res = sText.search(regExp);
        return res > -1;
      });

      let newOb = {};
      logKeys.forEach(logKey => (newOb[`${logKey}`] = state.logs[`${logKey}`]));
      state.filteredLogs = newOb;
      // logs.filter(log => {
      //   const items = log.items;
      //   let s = "";
      //   console.log("items: ", items);
      //   for (let i = 0; i < items.length; i++) {
      //     if (i > 0) s += ", ";
      //     s += `${items[i].name}`;
      //   }
      //   console.log("s: ", s);
      // })
    } else {
      state.filteredLogs = state.logs;
    }
    // state.paginationItemCount = filterKubeLists.length;
    // const pagination = state.pagination;
    // state.filterKubeLists = filterKubeLists.slice(
    //   pagination.start,
    //   pagination.end
    // );
  }
};
