<template>
  <div
    ref="textarea"
    class="mdc-text-field mdc-text-field--fullwidth mdc-text-field--textarea"
  >
    <textarea
      id="textarea"
      class="mdc-text-field__input"
      :rows="rows"
      cols="40"
      @input="$emit('input', $event.target.value)"
    ></textarea>
    <div class="mdc-notched-outline">
      <div class="mdc-notched-outline__leading"></div>
      <div class="mdc-notched-outline__notch">
        <label
          ref="textareafloatinglabel"
          for="textarea"
          class="mdc-floating-label"
          >{{ title }}</label
        >
      </div>
      <div class="mdc-notched-outline__trailing"></div>
    </div>
  </div>
</template>

<script>
import { MDCTextField } from "@material/textfield";
import { MDCFloatingLabel } from "@material/floating-label";

export default {
  props: {
    rows: {
      type: String,
      default: ""
    },

    title: {
      type: String,
      default: ""
    }
  },

  mounted() {
    this.textField = new MDCTextField(this.$refs.textarea);
    this.floatingLabel = new MDCFloatingLabel(this.$refs.textareafloatinglabel);
  },

  destroyed() {
    this.textField.destroy();
    this.floatingLabel.destroy();
  }
};
</script>
<style scoped>
.personal {
  box-shadow: 0px 0px 2px grey;
}
</style>
