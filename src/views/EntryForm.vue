<template>
  <div class="mdc-layout-grid__inner">
    <div class="mdc-layout-grid__cell--span-12">
      <h2 class="form-header">Entry Form</h2>
    </div>
    <div class="mdc-layout-grid__cell--span-12"><hr /></div>
    <div class="mdc-layout-grid__cell--span-12">
      <el-mdc-select
        :options="entryTypeSelectOptions"
        option-class="entry-type-option"
        class="entry-type-select"
        title="Entry Type"
        @change="selectedEntryType = $event.value"
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
      entryTypeSelectOptions: typesOfExpenses,
      selectedEntryType: ""
    };
  },

  computed: {
    form() {
      return this.selectedEntryType && `form-${this.selectedEntryType}`;
    }
  }
};
</script>
<style>
.form-header {
  float: left;
  display: block;
  margin: 0;
  padding: 0;
}

.entry-type-option {
  width: 700px;
}

.entry-type-select {
  width: 700px;
}
</style>
