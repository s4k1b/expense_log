<template>
  <button class="mdc-button mdc-button--raised" ref="button">
    <i class="material-icons mdc-button__icon" aria-hidden="true">{{ icon }}</i>
    <span class="mdc-button__label">{{ title }}</span>
  </button>
</template>

<script>
import { MDCRipple } from "@material/ripple";

export default {
  props: {
    icon: {
      type: String,
      default: ""
    },

    title: {
      type: String,
      default: ""
    }
  },

  mounted() {
    this.ripple = new MDCRipple(this.$refs.button);
  },

  destroyed() {
    this.ripple.destroy();
  }
};
</script>
<style scoped>
.mdc-button {
  height: 3em;
}
</style>
