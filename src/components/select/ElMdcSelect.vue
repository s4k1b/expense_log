<template>
  <div class="mdc-select mdc-select--outlined" ref="select">
    <!-- Other elements from the native or enhanced select remain. -->
    <i class="material-icons mdc-select__icon">{{ icon }}</i>
    <input type="hidden" name="enhanced-select" />
    <i class="mdc-select__dropdown-icon"></i>
    <div class="mdc-select__selected-text"></div>
    <div
      class="mdc-select__menu mdc-menu mdc-menu-surface"
      :style="optionStyle"
    >
      <ul class="mdc-list">
        <li
          class="mdc-list-item mdc-list-item--selected"
          aria-selected="true"
          data-value=""
        ></li>
        <li
          class="mdc-list-item"
          v-for="(option, index) in options"
          :data-value="option.value"
          :key="`${option.value}-${index}`"
        >
          {{ option.title }}
        </li>
      </ul>
    </div>
    <div class="mdc-notched-outline">
      <div class="mdc-notched-outline__leading"></div>
      <div class="mdc-notched-outline__notch">
        <label
          class="mdc-floating-label mdc-floating-label--float-above"
          ref="selectfloatinglabel"
          >{{ title }}</label
        >
      </div>
      <div class="mdc-notched-outline__trailing"></div>
    </div>
  </div>
</template>

<script>
import { MDCSelect } from "@material/select";
import { MDCRipple } from "@material/ripple";
import { MDCFloatingLabel } from "@material/floating-label";

export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },

    title: {
      type: String,
      default: ""
    },

    icon: {
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
      selectedValue: "",
      selectedIndex: null,
      optionStyle: {
        width: ""
      }
    };
  },

  mounted() {
    this.select = new MDCSelect(this.$refs.select);
    this.ripple = new MDCRipple(this.$refs.select);
    this.floatingLabel = new MDCFloatingLabel(this.$refs.selectfloatinglabel);

    this.select.listen("MDCSelect:change", () => {
      this.selectedValue = this.select.value;
      this.selectedIndex = this.select.selectedIndex;
      this.$emit("input", {
        value: this.selectedValue,
        selIndex: this.selectedIndex,
        variableName: this.variableName,
        variableProp: this.variableProp,
        variableIndex: this.variableIndex
      });
      //console.log("User selected ", this.selectedValue);
    });

    this.optionStyle.width = `${this.$refs.select.offsetWidth}px`;
  },

  destroyed() {
    this.ripple.destroy();
    this.select.destroy();
    this.floatingLabel.destroy();
  }
};
</script>
<style scoped>
.test {
  width: 569px;
}
</style>
