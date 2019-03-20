<template>
  <button
    ref="elmdcfab"
    class="mdc-fab"
    :class="{ 'mdc-fab--extended': extended }"
    @click="$emit('click')"
  >
    <span class="material-icons mdc-fab__icon">{{ icon }}</span>
    <span v-if="extended" class="mdc-fab__label">{{ title }}</span>
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
    },

    extended: {
      type: Boolean,
      default: false
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
