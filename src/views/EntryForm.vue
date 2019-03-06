<template>
  <div class="mdc-layout-grid__inner">
    <div class="mdc-layout-grid__cell--span-12">
      <h2 class="form-header">Entry Form</h2>
    </div>
    <div class="mdc-layout-grid__cell--span-12"><hr /></div>
    <div class="mdc-layout-grid__cell--span-12">
      <el-mdc-select
        v-bind="propObForSelectEntryType"
        class="entry-type-select"
        @input="selectedEntryType = $event.value"
      ></el-mdc-select>
    </div>
    <div class="mdc-layout-grid__cell--span-12">
      <component :is="form"></component>
    </div>
  </div>
</template>

<script>
import typesOfExpenses from "../types_of_expenses.json";
import ElMdcSelect from "../components/select/ElMdcSelect.vue";
//forms
import PerCostForm from "../components/form/PerCostForm.vue";
import ShaCostForm from "../components/form/ShaCostForm.vue";
import MonLoanToForm from "../components/form/MonLoanToForm.vue";
import MonLoanFromForm from "../components/form/MonLoanFromForm.vue";
import MonGivForm from "../components/form/MonGivForm.vue";
import MonRecForm from "../components/form/MonRecForm.vue";

export default {
  components: {
    ElMdcSelect,
    "form-personalcost": PerCostForm,
    "form-sharedcost": ShaCostForm,
    "form-moneyloanedto": MonLoanToForm,
    "form-moneyloanedfrom": MonLoanFromForm,
    "form-moneygiven": MonGivForm,
    "form-moneyreceived": MonRecForm
  },

  data() {
    return {
      selectedEntryType: "",
      propObForSelectEntryType: {
        options: typesOfExpenses,
        title: "Entry type",
        icon: "ballot"
      }
    };
  },

  computed: {
    form() {
      return this.selectedEntryType && `form-${this.selectedEntryType}`;
    }
  }
};
</script>
<style scoped>
.form-header {
  float: left;
  display: block;
  margin: 0;
  padding: 0;
}

.entry-type-select {
  width: 100%;
}
</style>
