<template>
  <div class="mdc-layout-grid__cell">
    <p class="login-message">
      You have to <strong>login</strong> first to use this site
    </p>
    <el-mdc-fab
      title="Login"
      icon="person_outline"
      :extended="true"
      @click="login()"
    ></el-mdc-fab>
  </div>
</template>

<script>
import ElMdcFab from "../components/fab/ElMdcFab";
import { firebaseMixin } from "../mixins/firebase.js";

export default {
  components: {
    ElMdcFab
  },
  mixins: [firebaseMixin]
};
</script>

<style>
.login-message {
  font-size: 2.5em;
}
</style>
