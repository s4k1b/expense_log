import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

import * as firebase from "firebase";

import "./theme.scss";

Vue.config.productionTip = false;

//firebase
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

//snackbar
import VueSnackbar from "vue-snack";
import "vue-snack/dist/vue-snack.min.css";

Vue.use(VueSnackbar, {
  // Possible values: 'top', 'top-left', 'top-right', 'bottom', 'bottom-left'
  // default 'bottom'
  position: "bottom-right",
  // default 7500
  time: 2500,
  // default false
  close: true,
  // default []
  methods: [
    {
      // default ''
      name: "successful",
      // Any valid HTML color
      // default '#ecf0f1'
      color: "#00b300"
    },
    {
      name: "unsuccessful",
      color: "#ff0000"
    }
  ]
});

import VueSelect from "vue-cool-select";

Vue.use(VueSelect, {
  theme: "material-design" // or "bootstrap"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
