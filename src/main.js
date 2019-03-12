import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

import * as firebase from "firebase";

import "./theme.scss";

Vue.config.productionTip = false;

var config = {
  apiKey: "AIzaSyBQsbxd4xNm8InJNHxCLVB_tVGcNWim7qo",
  authDomain: "expense-log-s4k1b.firebaseapp.com",
  databaseURL: "https://expense-log-s4k1b.firebaseio.com",
  projectId: "expense-log-s4k1b",
  storageBucket: "",
  messagingSenderId: "423666784319"
};
firebase.initializeApp(config);
global.fs = firebase;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
