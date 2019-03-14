<template>
  
</template>

<script>
import { MDCSnackbar } from "@material/snackbar";

export default {
  mounted() {
    this.snackbar = new MDCSnackbar(this.$refs.snackbar);
  },

  destroyed() {
    this.snackbar.destroy();
  }
};
</script>

