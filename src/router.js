import Vue from "vue";
import Router from "vue-router";
// import store from "./store/store.js";
import LeftSideBar from "./views/LeftSideBar.vue";
import ExpenseLog from "./views/ExpenseLog.vue";
import RightSideBar from "./views/RightSideBar.vue";
import LoginPage from "./views/LoginPage.vue";

import EntryForm from "./views/EntryForm.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        "left-side-bar": LeftSideBar,
        main: ExpenseLog,
        "right-side-bar": RightSideBar
      }
    },
    {
      path: "/login_first",
      name: "loginFirst",
      components: {
        main: LoginPage
      }
    },
    {
      path: "/entry_form",
      name: "entryForm",
      components: {
        "left-side-bar": LeftSideBar,
        main: EntryForm,
        "right-side-bar": RightSideBar
      }
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   if (to.path !== "/login_first") {
//     const user = store.getters.user;
//     if (!user.uid) {
//       next("/login_first");
//     } else next();
//   } else {
//     next();
//   }
// });

export default router;
