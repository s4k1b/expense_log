<template>
  <div class="mdc-layout-grid__inner form-div">
    <div class="mdc-layout-grid__cell--span-12 header-div">
      <h2 class="form-header">{{ entryTitle }}</h2>
      <p class="date">{{ date }}</p>
    </div>
    <div class="mdc-layout-grid__cell--span-12 header-div">
      <div class="mdc-layout-grid__inner">
        <div class="mdc-layout-grid__cell--span-12 description-header">
          <h3 class="form-header sub-title">Description</h3>
          <el-mdc-fab
            :icon="desEditIcon"
            class="mod-btn"
            @click="desEditFunc()"
          ></el-mdc-fab>
        </div>
        <div class="mdc-layout-grid__cell--span-12">
          <p v-if="!desEdit" class="description">{{ log.description }}</p>
          <el-mdc-text-area
            v-else
            v-model="description"
            rows="2"
            title="Description"
            :prop-value="logDescription"
          ></el-mdc-text-area>
        </div>
      </div>
    </div>
    <div class="mdc-layout-grid__cell--span-12 header-div">
      <div class="mdc-layout-grid__inner">
        <div class="mdc-layout-grid__cell--span-12 description-header">
          <h3 class="form-header sub-title">{{ itemsTitle }}</h3>
          <el-mdc-fab
            :icon="itemsEditIcon"
            class="mod-btn"
            @click="itemsEditFunc()"
          ></el-mdc-fab>
        </div>
        <div class="mdc-layout-grid__cell--span-12">
          <p v-if="!itemsEdit" class="description">{{ logItems }}</p>
          <input-list
            v-else
            v-model="items"
            :fields="fields"
            :prop-resp-items="logItems"
            :span="inputListSpan"
          ></input-list>
        </div>
      </div>
    </div>
    <!-- <div class="mdc-layout-grid__cell--span-12">
      <component :is="form"></component>
    </div> -->
  </div>
</template>

<script>
import { databaseMixin } from "../mixins/database";
import { mapGetters } from "vuex";
import expenseTypes from "../types_of_expenses.json";
import ElMdcFab from "../components/fab/ElMdcFab.vue";
import ElMdcTextArea from "../components/input/ElMdcTextArea.vue";
import InputList from "../components/form/shared/InputList.vue";
import inputListField from "../input_list_field.json";

export default {
  components: {
    ElMdcFab,
    ElMdcTextArea,
    InputList
  },

  mixins: [databaseMixin],

  data() {
    return {
      description: "",
      desEdit: false,
      desEditIcon: "create",
      items: [],
      itemsEdit: false,
      itemsEditIcon: "create"
    };
  },

  computed: {
    ...mapGetters(["log"]),

    logDescription() {
      return (this.log && this.log.description) || "";
    },

    logItems() {
      return (this.log && this.log.items) || [];
    },

    entryTitle() {
      const type = (this.log && this.log.type) || "";
      if (type) return expenseTypes.find(item => item.value === type).title;
      else return "";
    },

    itemsTitle() {
      const type = (this.log && this.log.type) || "";
      if (type === "personalcost" || type === "sharedcost") return "Items";
      else if (type === "moneyloanedto" || type === "moneygiven")
        return "Receivers";
      else if (type === "moneyloanedfrom" || type === "moneyreceived")
        return "Providers";
      else return "";
    },

    fields() {
      const type = (this.log && this.log.type) || "";
      if (type === "personalcost" || type === "sharedcost")
        return inputListField.itemsFields;
      else if (type === "moneyloanedto" || type === "moneygiven")
        return inputListField.giveFields;
      else if (type === "moneyloanedfrom" || type === "moneyreceived")
        return inputListField.receiveFields;
      else return [];
    },

    inputListSpan() {
      const type = (this.log && this.log.type) || "";
      if (type === "personalcost" || type === "sharedcost") return 3;
      else return 6;
    },

    date() {
      return this.getDate(this.log.date);
    }
  },

  watch: {
    logDescription(newVal) {
      this.description = newVal;
    },
    logItems(newVal) {
      this.items = newVal;
    }
  },

  created() {
    this.getEntryDetails(this.$route.params.logid);
  },

  methods: {
    desEditFunc() {
      if (this.desEdit) {
        this.desEdit = false;
        this.desEditIcon = "create";
        this.update(
          this.description,
          `${this.$route.params.logid}/description`
        );
      } else {
        this.desEdit = true;
        this.desEditIcon = "exit_to_app";
      }
    },
    itemsEditFunc() {
      if (this.itemsEdit) {
        this.itemsEdit = false;
        this.itemsEditIcon = "create";
        this.update(this.items, `${this.$route.params.logid}/items`);
      } else {
        this.itemsEdit = true;
        this.itemsEditIcon = "exit_to_app";
      }
    },
    getDate(date) {
      const d = new Date(date);
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const month = months[d.getMonth()];
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const day = days[d.getDay()];

      const dayOfMonth = d.getDate();
      const year = d.getFullYear();
      // console.log(d);

      return `${day}, ${dayOfMonth} ${month}, ${year}`;
    }
  }
};
</script>

<style scoped>
.form-header {
  float: left;
  display: block;
  margin: 0;
  /* padding: 2%;
  border-radius: 15px;
  border-left: 3px solid #0077ce;
  border-bottom: 3px solid #0077ce; */
}

.header-div {
  padding: 2%;
  border-radius: 5px 20px 10px 15px;
  border-left: 5px solid #0077ce;
  border-bottom: 0px solid #0077ce;
  box-shadow: 0px 0px 3px grey;
  background-color: rgb(221, 225, 231);
}

.form-div {
  padding: 4%;
  border: 0px solid grey;
  box-shadow: 0px 0px 8px grey;
  border-radius: 5px;
  background-color: rgb(247, 249, 250);
}

.entry-type-select {
  width: 100%;
}

.mod-btn {
  float: right;
  width: 3em;
  height: 3em;
}

.description {
  text-align: left;
  margin-top: -15px;
}

.date {
  text-align: right;
  margin-top: 5px;
}
</style>
