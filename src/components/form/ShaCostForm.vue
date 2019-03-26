<template>
  <div>
    <el-mdc-input
      v-model="inputDate"
      title="Date"
      icon="event"
      type="datetime-local"
      class="input-date"
    ></el-mdc-input>
    <el-mdc-text-area
      rows="2"
      title="Description"
      @input="description = $event"
    ></el-mdc-text-area>
    <div class="mdc-layout-grid__inner">
      <div class="mdc-layout-grid__cell--span-12">
        <div class="list-title-div items">Items</div>
      </div>
    </div>
    <input-list v-model="itemList" :fields="fields"></input-list>
    <hr />
    <div class="mdc-layout-grid__inner">
      <div class="mdc-layout-grid__cell--span-12">
        <div class="total-cost">
          Total Cost:
          <span class="amount">{{ totalCost }}</span> tk
        </div>
      </div>
    </div>
    <div class="mdc-layout-grid__inner my-cost">
      <div class="mdc-layout-grid__cell--span-6">
        <el-mdc-input
          v-model="needToPay"
          title="I need to pay"
          icon="create"
          type="text"
        ></el-mdc-input>
      </div>
      <div class="mdc-layout-grid__cell--span-6">
        <el-mdc-input
          v-model="paid"
          title="I paid"
          icon="create"
          type="text"
        ></el-mdc-input>
      </div>
    </div>
    <div class="mdc-layout-grid__inner">
      <div class="mdc-layout-grid__cell--span-12">
        <div class="list-title-div participants">Participants</div>
      </div>
    </div>
    <input-list
      v-model="participantList"
      :fields="participantsField"
      span="4"
    ></input-list>
    <hr />
    <div class="mdc-layout-grid__cell--span-2">
      <el-mdc-button
        title="Submit"
        icon="done_all"
        type="raised"
        @click="addEntry()"
      ></el-mdc-button>
    </div>
  </div>
</template>

<script>
import ElMdcTextArea from "../input/ElMdcTextArea.vue";
import ElMdcInput from "../input/ElMdcInput.vue";
import ElMdcButton from "../button/ElMdcButton.vue";
import InputList from "./shared/InputList.vue";
import inputListField from "../../input_list_field.json";
import { databaseMixin } from "../../mixins/database.js";
import { chartMixin } from "../../mixins/chart.js";
import { mapGetters } from "vuex";

//import writeOb from "../../write.js";

export default {
  components: {
    ElMdcTextArea,
    ElMdcInput,
    ElMdcButton,
    InputList
  },

  mixins: [databaseMixin, chartMixin],
  data() {
    return {
      description: "",
      fields: inputListField.itemsFields,

      participantsField: inputListField.participantsFields,

      inputDate: "",
      needToPay: 0,
      paid: 0,
      itemList: [],
      participantList: [],
      emptyField: false
    };
  },

  computed: {
    ...mapGetters(["users"]),
    totalCost() {
      if (this.itemList.length == 0) return 0;
      return this.itemList.reduce(function(total, currentVal) {
        return total + (currentVal.amount || 0) * (currentVal.cost || 0);
      }, 0);
    }
  },

  mounted() {
    var today = new Date().toJSON().slice(0, 16);
    this.inputDate = { value: today };
  },

  methods: {
    convDateStrToNum(str) {
      const d = new Date(str);
      return d.getTime();
    },

    findUserInfo(email) {
      return Object.values(this.users).find(ob => ob.email === email);
    },

    addEntry() {
      //get user info
      this.participantList.forEach(item => {
        const userInfo = this.findUserInfo(item.email);
        this.$set(item, "userInfo", userInfo);
      });

      const ind = this.itemList.find(item => {
        if (item.name && item.type && item.amount && item.cost) return false;
        else return true;
      });
      const indP = this.participantList.find(part => {
        if (part.email && part.needToPay && part.paid) return false;
        else return true;
      });
      if (
        this.itemList.length === 0 ||
        ind ||
        this.participantList.length === 0 ||
        indP
      ) {
        this.emptyField = true;
      } else {
        if (this.inputDate && this.description && this.needToPay && this.paid) {
          // Create entry object
          this.emptyField = false;

          const ind2 = this.participantList.find(item => {
            if (item.userInfo) return false;
            else return true;
          });

          if (ind2) {
            this.$snack.unsuccessful({
              text: "Email not found in databse",
              button: "⚠"
            });
            return;
          }

          const entryOb = {
            type: "sharedcost",
            date: this.convDateStrToNum(this.inputDate.value),
            description: this.description,
            items: this.itemList,
            iNeedToPay: this.needToPay.value,
            iPaid: this.paid.value,
            participants: this.participantList,
            chart: this.calculateChart(
              this.participantList,
              this.paid.value,
              this.needToPay.value
            )
          };

          this.addEntryToDb(entryOb);
        } else {
          this.emptyField = true;
        }
      }
      if (this.emptyField) {
        //show form fillum requirement
        this.$snack.unsuccessful({
          text: "Please fill out all the required fields",
          button: "⚠"
        });
      }
    }
  }
};
</script>
<style scoped>
.input-date {
  margin-bottom: 2em;
  float: left;
}
.total-cost {
  display: block;
  padding: 0.4em;
  border-radius: 5px;
  box-shadow: 2px 2px 15px grey;
  background-color: #669900;
  color: white;
}
.amount {
  font-size: 1.5em;
  text-shadow: 2px 2px grey;
}
hr {
  margin-bottom: 1em;
  height: 0.1em;
  background-color: #0099cc;
  border-radius: 10px;
}
.list-title-div {
  margin-top: 1em;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 1.2em;
  background-color: #0099cc;
  color: #fff;
  border-radius: 5px 20px 5px 15px;
  padding-left: 0.6em;
  padding-bottom: 0.3em;
  padding-right: 0.6em;
  padding-top: 0.3em;
}
.participants {
  width: 100px;
}
.items {
  width: 50px;
}
.my-cost {
  margin-top: 2em;
}
</style>
