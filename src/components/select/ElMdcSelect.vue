<template>
  <div class="mdc-select mdc-select--outlined" ref="select">
    <!-- Other elements from the native or enhanced select remain. -->
    <input type="hidden" name="enhanced-select" />
    <i class="mdc-select__dropdown-icon"></i>
    <div class="mdc-select__selected-text"></div>
    <div
      class="mdc-select__menu mdc-menu mdc-menu-surface"
      :class="`${optionClass}`"
    >
      <ul class="mdc-list">
        <li
          class="mdc-list-item mdc-list-item--selected"
          data-value=""
          aria-selected="true"
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
        <label class="mdc-floating-label">{{ title }}</label>
      </div>
      <div class="mdc-notched-outline__trailing"></div>
    </div>
  </div>
</template>

<script>
import { MDCSelect } from "@material/select";
import { MDCRipple } from "@material/ripple";

export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },

    optionClass: {
      type: String,
      default: ""
    },

    title: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      selectedValue: "",
      selectedIndex: null
    };
  },

  mounted() {
    const select = new MDCSelect(this.$refs.select);
    this.ripple = new MDCRipple(this.$refs.select);

    select.listen("MDCSelect:change", () => {
      this.selectedValue = select.value;
      this.selectedIndex = select.selectedIndex;
      this.$emit("change", {
        value: this.selectedValue,
        index: this.selectedIndex
      });
      //console.log("User selected ", this.selectedValue);
    });
  },

  destroyed() {
    this.ripple.destroy();
  }
};
</script>
<style scoped></style>
