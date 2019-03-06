<template>
  <div
    class="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon personal"
    ref="input"
  >
    <i class="material-icons mdc-text-field__icon">{{ icon }}</i>
    <input
      :type="type"
      id="tf-outlined"
      class="mdc-text-field__input"
      @input="emitValue($event.target.value)"
      :value="value"
    />
    <div class="mdc-notched-outline">
      <div class="mdc-notched-outline__leading"></div>
      <div class="mdc-notched-outline__notch">
        <label
          for="tf-outlined"
          class="mdc-floating-label"
          ref="inputfloatinglabel"
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
    icon: {
      type: String,
      default: ""
    },

    type: {
      type: String,
      default: ""
    },

    title: {
      type: String,
      default: ""
    },

    variableName: {
      type: String,
      default: ""
    },

    variableProp: {
      type: String,
      default: ""
    },

    variableIndex: {
      type: null,
      default: null
    }
  },

  data() {
    return {
      value: ""
    };
  },

  mounted() {
    this.textField = new MDCTextField(this.$refs.input);
    this.floatingLabel = new MDCFloatingLabel(this.$refs.inputfloatinglabel);

    if (this.type === "date") {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();

      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }

      today = yyyy + "-" + mm + "-" + dd;
      this.value = today;
    }
  },

  methods: {
    emitValue(val) {
      let respOb = {
        value: val,
        variableName: this.variableName,
        variableProp: this.variableProp,
        variableIndex: this.variableIndex
      };
      this.$emit("input", respOb);
    }
  },

  destroyed() {
    this.textField.destroy();
    this.floatingLabel.destroy();
  }
};
</script>
<style scoped>
.personal {
  box-shadow: 1px 1px 2px grey;
}
</style>
