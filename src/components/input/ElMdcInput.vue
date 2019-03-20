<template>
  <div
    ref="input"
    class="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon"
  >
    <i class="material-icons mdc-text-field__icon">{{ icon }}</i>
    <input
      id="tf-outlined"
      :type="type"
      class="mdc-text-field__input"
      :value="value"
      @input="emitValue($event.target.value)"
    />
    <div class="mdc-notched-outline">
      <div class="mdc-notched-outline__leading"></div>
      <div class="mdc-notched-outline__notch">
        <label
          ref="inputfloatinglabel"
          for="tf-outlined"
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

    if (this.type === "datetime-local") {
      var today = new Date().toJSON().slice(0, 16);
      // var dd = today.getDate();
      // var mm = today.getMonth() + 1; //January is 0!
      // var yyyy = today.getFullYear();

      // if (dd < 10) {
      //   dd = "0" + dd;
      // }

      // if (mm < 10) {
      //   mm = "0" + mm;
      // }

      // today = yyyy + "-" + mm + "-" + dd;
      this.value = today;
    }
  },

  destroyed() {
    this.textField.destroy();
    this.floatingLabel.destroy();
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
  }
};
</script>
<style scoped>
.personal {
  box-shadow: 0px 0px 3px grey;
}
</style>
