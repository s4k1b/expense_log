import Vue from "vue";
import Router from "vue-router";
import LeftSideBar from "./views/LeftSideBar.vue";
import ExpenseLog from "./views/ExpenseLog.vue";
import RightSideBar from "./views/RightSideBar.vue";

Vue.use(Router);

export default new Router({
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
    }
  ]
});
