<template>
  <div class="mdc-layout-grid__inner">
    <div class="mdc-layout-grid__cell--span-8">
      <!-- empty cell, for spacing -->
    </div>
    <div class="mdc-layout-grid__cell" id="entry_btn">
      <el-mdc-fab
        icon="add"
        title="Entry"
        :extended="true"
        @click="goToFormPage()"
      ></el-mdc-fab>
    </div>
  </div>
</template>

<script>
import ElMdcFab from "../components/fab/ElMdcFab.vue";

export default {
  components: {
    ElMdcFab
  },

  methods: {
    goToFormPage() {
      this.$router.push("entry_form");
    }
  }
};
</script>
<style scoped>
#entry_btn {
  float: right;
}
</style>
