<template>
  <button
    ref="button"
    class="mdc-button"
    :class="buttonClass"
    :style="styleOb"
    @click="$emit('click')"
  >
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
    },

    type: {
      type: String,
      default: ""
    },

    styleOb: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    buttonClass() {
      if (this.type === "raised") return "mdc-button--raised";
      if (this.type === "outlined") return "mdc-button--outlined";
      else return "";
    }
  },

  mounted() {
    this.buttonripple = new MDCRipple(this.$refs.button);
  },

  destroyed() {
    this.buttonripple.destroy();
  }
};
</script>
<style scoped>
.mdc-button {
  height: 3em;
}
</style>
