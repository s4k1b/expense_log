<template>
  <div class="mdc-layout-grid__inner form-div">
    <div class="mdc-layout-grid__cell--span-12 header-div">
      <h2 class="form-header">{{ entryTitle }}</h2>
      <p class="date">{{ date }}</p>
    </div>
    <div class="mdc-layout-grid__cell--span-12 inner-div">
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
    <div class="mdc-layout-grid__cell--span-12 inner-div">
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
          <!-- <p v-if="!itemsEdit" class="description">{{ logItems }}</p> -->
          <el-data-table
            v-if="!itemsEdit"
            :headers="fields"
            :items="logItems"
          ></el-data-table>
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
    <template v-if="log && log.type === 'sharedcost'">
      <div class="mdc-layout-grid__cell--span-12 inner-div">
        <div class="mdc-layout-grid__inner">
          <div class="mdc-layout-grid__cell--span-12 description-header">
            <h3 class="form-header sub-title">My payment</h3>
            <el-mdc-fab
              :icon="mpEditIcon"
              class="mod-btn"
              @click="mpEditFunc()"
            ></el-mdc-fab>
          </div>
          <div class="mdc-layout-grid__cell--span-12">
            <!-- <p v-if="!itemsEdit" class="description">{{ logItems }}</p> -->
            <div class="mdc-layout-grid__inner">
              <div class="mdc-layout-grid__cell--span-6">
                <span v-if="!mpEdit">
                  <strong>Paid:</strong>
                  <span class="i-paid">{{ logPaid }}</span>
                </span>

                <el-mdc-input
                  v-else
                  v-model="paid"
                  title="I paid"
                  icon="create"
                  type="text"
                  :prop-value="logPaid"
                ></el-mdc-input>
              </div>
              <div class="mdc-layout-grid__cell--span-6">
                <span v-if="!mpEdit">
                  <strong>Need to pay:</strong>
                  <span class="i-need-to-pay">{{ logNeedToPay }}</span>
                </span>
                <el-mdc-input
                  v-else
                  v-model="needToPay"
                  title="I need to pay"
                  icon="create"
                  type="text"
                  :prop-value="logNeedToPay"
                ></el-mdc-input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mdc-layout-grid__cell--span-12 inner-div">
        <div class="mdc-layout-grid__inner">
          <div class="mdc-layout-grid__cell--span-12 description-header">
            <h3 class="form-header sub-title">Participants</h3>
            <el-mdc-fab
              :icon="parEditIcon"
              class="mod-btn"
              @click="parEditFunc()"
            ></el-mdc-fab>
          </div>
          <div class="mdc-layout-grid__cell--span-12">
            <!-- <p v-if="!itemsEdit" class="description">{{ logItems }}</p> -->
            <el-data-table
              v-if="!parEdit"
              :headers="participantsFields"
              :items="logParticipants"
            ></el-data-table>
            <input-list
              v-else
              v-model="participants"
              :fields="participantsFields"
              :prop-resp-items="logParticipants"
              :span="parListSpan"
            ></input-list>
          </div>
        </div>
      </div>

      <!-- ******************** Chart div ********************** -->

      <div class="mdc-layout-grid__cell--span-12 inner-div">
        <div class="mdc-layout-grid__inner">
          <div class="mdc-layout-grid__cell--span-12 description-header">
            <h3 class="form-header sub-title">Chart</h3>
          </div>
          <div class="mdc-layout-grid__cell--span-12">
            <el-chart :chart="logChart"></el-chart>
          </div>
          <template v-if="logChart.unHandled">
            <h3 class="form-header sub-title red-color">Missmatch</h3>
            <div
              v-for="(prop, key) in logChart.unHandled"
              :key="`${prop}-${key}`"
              class="mdc-layout-grid__cell--span-12"
            >
              <div class="mdc-layout-grid__inner">
                <div class="mdc-layout-grid__cell--span-6">
                  <span>
                    <strong>Name:</strong>
                    <span class="i-need-to-pay red-color">{{ key }}</span>
                  </span>
                </div>
                <div class="mdc-layout-grid__cell--span-6">
                  <span>
                    <strong>Missmatch amount:</strong>
                    <span class="i-need-to-pay">{{ prop }}</span>
                  </span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
    <!-- <div class="mdc-layout-grid__cell--span-12">
      <component :is="form"></component>
    </div>-->
  </div>
</template>

<script>
import { databaseMixin } from "../mixins/database";
import { mapGetters } from "vuex";
import expenseTypes from "../types_of_expenses.json";
import ElMdcFab from "../components/fab/ElMdcFab.vue";
import ElMdcTextArea from "../components/input/ElMdcTextArea.vue";
import ElMdcInput from "../components/input/ElMdcInput";
import InputList from "../components/form/shared/InputList.vue";
import inputListField from "../input_list_field.json";
import ElDataTable from "../components/datatable/ElDataTable";
import ElChart from "../components/chart/ElChart";
import { chartMixin } from "../mixins/chart.js";
export default {
  components: {
    ElMdcFab,
    ElMdcTextArea,
    ElMdcInput,
    InputList,
    ElDataTable,
    ElChart
  },

  mixins: [databaseMixin, chartMixin],

  data() {
    return {
      description: "",
      desEdit: false,
      desEditIcon: "create",
      items: [],
      itemsEdit: false,
      itemsEditIcon: "create",
      participants: [],
      parEdit: false,
      parEditIcon: "create",
      paid: null,
      needToPay: null,
      mpEdit: false,
      mpEditIcon: "create"
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

    logParticipants() {
      return (
        (this.log && this.log.type === "sharedcost" && this.log.participants) ||
        []
      );
    },

    logPaid() {
      return (this.log && this.log.iPaid) || null;
    },

    logNeedToPay() {
      return (this.log && this.log.iNeedToPay) || null;
    },

    logChart() {
      return (this.log && this.log.chart) || {};
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

    participantsFields() {
      return inputListField.participantsFields;
    },

    inputListSpan() {
      const type = (this.log && this.log.type) || "";
      if (type === "personalcost" || type === "sharedcost") return 3;
      else return 6;
    },

    parListSpan() {
      return 4;
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
    },
    logParticipants(newVal) {
      this.participants = newVal;
    },
    logPaid(newVal) {
      this.paid = newVal;
    },
    logNeedToPay(newVal) {
      this.needToPay = newVal;
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
    parEditFunc() {
      if (this.parEdit) {
        this.parEdit = false;
        this.parEditIcon = "create";
        this.update(
          this.participants,
          `${this.$route.params.logid}/participants`
        );
        this.update(
          this.calculateChart(
            this.participants,
            (this.paid && this.paid.value) || this.logPaid,
            (this.needToPay && this.needToPay.value) || this.logNeedToPay
          ),
          `${this.$route.params.logid}/chart`
        );
      } else {
        this.parEdit = true;
        this.parEditIcon = "exit_to_app";
      }
    },
    mpEditFunc() {
      if (this.mpEdit) {
        this.mpEdit = false;
        this.mpEditIcon = "create";
        this.update(this.paid.value, `${this.$route.params.logid}/iPaid`);
        this.update(
          this.needToPay.value,
          `${this.$route.params.logid}/iNeedToPay`
        );
        this.update(
          this.calculateChart(
            this.participants || this.logParticipants,
            this.paid.value,
            this.needToPay.value
          ),
          `${this.$route.params.logid}/chart`
        );
      } else {
        this.mpEdit = true;
        this.mpEditIcon = "exit_to_app";
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

.inner-div {
  padding: 2%;
  border-radius: 5px 20px 10px 15px;
  border-left: 5px solid #0077ce;
  border-bottom: 0px solid #0077ce;
  box-shadow: 0px 0px 3px grey;
  background-color: rgb(255, 255, 255);
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

.i-paid {
  padding: 1em;
  color: rgb(38, 116, 38);
  font-weight: 900;
}

.i-need-to-pay {
  padding: 1em;
  color: rgb(192, 45, 26);
  font-weight: 900;
}

.red-color {
  color: rgb(192, 45, 26);
}
</style>
