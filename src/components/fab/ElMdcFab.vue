<template>
  <button ref="elmdcfab" class="mdc-fab mdc-fab--extended">
    <span class="material-icons mdc-fab__icon">{{ icon }}</span>
    <span class="mdc-fab__label">{{ title }}</span>
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
    this.ripple = new MDCRipple(this.$refs.elmdcfab);
  },

  destroyed() {
    this.ripple.destroy();
  }
};
</script>
<style scoped></style>
