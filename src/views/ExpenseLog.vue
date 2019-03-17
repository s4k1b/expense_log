<template>
  <div class="mdc-layout-grid__inner">
    <div class="mdc-layout-grid__cell--span-12">
      <div class="mdc-layout-grid__inner list-header">
        <div class="mdc-layout-grid__cell--span-2 create-button">
          <el-mdc-fab
            icon="add"
            title="Entry"
            :extended="true"
            @click="goToFormPage()"
          ></el-mdc-fab>
        </div>
        <div class="mdc-layout-grid__cell--span-3">
          <el-mdc-select
            v-bind="propObForSelectEntryType"
            @input="selectedEntryType = $event.value"
          ></el-mdc-select>
        </div>
        <div class="mdc-layout-grid__cell--span-3">
          <el-mdc-input
            title="Search"
            icon="search"
            type="text"
            @input="$store.dispatch('searchText$set', $event.value)"
          ></el-mdc-input>
        </div>
        <div class="mdc-layout-grid__cell--span-4 pagination">
          <div class="mdc-layout-grid__inner">
            <div class="mdc-layout-grid__cell--span-7 pagi-info">
              Showing 1-10 of 50
            </div>
            <div class="mdc-layout-grid__cell--span-2">
              <el-mdc-fab icon="chevron_left" class="navigation"></el-mdc-fab>
            </div>
            <div class="mdc-layout-grid__cell--span-2">
              <el-mdc-fab icon="chevron_right" class="navigation"></el-mdc-fab>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mdc-layout-grid__cell--span-12 entry-list">
      <entry-list></entry-list>
    </div>
  </div>
</template>

<script>
import typesOfExpenses from "../types_of_expenses.json";
import ElMdcSelect from "../components/select/ElMdcSelect.vue";
import ElMdcInput from "../components/input/ElMdcInput.vue";
import ElMdcFab from "../components/fab/ElMdcFab.vue";
import EntryList from "../components/entrylist/EntryList.vue";
import { firebaseMixin } from "../mixins/firebase.js";

export default {
  data() {
    return {
      propObForSelectEntryType: {
        options: typesOfExpenses,
        title: "Entry type",
        icon: "ballot"
      }
    };
  },
  components: {
    ElMdcSelect,
    ElMdcInput,
    ElMdcFab,
    EntryList
  },
  mixins: [firebaseMixin],
  methods: {
    goToFormPage() {
      this.$router.push("entry_form");
    }
  },
  created() {
    this.$store.commit("searchText$set", ""); // reset searchText
  }
};
</script>
<style scoped>
.list-header {
  padding: 0.5em;
  box-shadow: 0px 0px 2px grey;
}
.entry-list {
  margin-top: -24px;
  padding-left: 0.5em;
  padding-right: 0.5em;
  box-shadow: 0px 0px 2px grey;
}
.create-button {
  padding-top: 0.15em;
}
.navigation {
  width: 2.5em;
  height: 2.5em;
}
.pagination {
  padding-top: 0.6em;
}
.pagi-info {
  padding-top: 0.6em;
}
</style>
