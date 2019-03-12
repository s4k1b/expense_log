<template>
  <div id="app">
    <el-mdc-top-app-bar></el-mdc-top-app-bar>
    <div class="mdc-layout-grid content">
      <div class="mdc-layout-grid__inner">
        <div class="mdc-layout-grid__cell--span-2">
          <router-view name="left-side-bar"></router-view>
        </div>
        <div class="mdc-layout-grid__cell--span-8">
          <router-view name="main"></router-view>
        </div>
        <div class="mdc-layout-grid__cell--span-2">
          <router-view name="right-side-bar"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElMdcTopAppBar from "../src/components/topappbar/ElMdcTopAppBar.vue";

export default {
  components: {
    ElMdcTopAppBar
  }
};
</script>

<style lang="scss">
@import "@material/layout-grid/mdc-layout-grid";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.content {
  margin-top: 3em;
}
</style>
