<template>
  <div>
    <el-mdc-input
      title="Date"
      icon="event"
      type="date"
      v-model="inputDate"
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
    <input-list :fields="fields" v-model="itemList"></input-list>
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
          title="I need to pay"
          icon="create"
          type="text"
          v-model="needToPay"
        ></el-mdc-input>
      </div>
      <div class="mdc-layout-grid__cell--span-6">
        <el-mdc-input
          title="I paid"
          icon="create"
          type="text"
          v-model="paid"
        ></el-mdc-input>
      </div>
    </div>
    <div class="mdc-layout-grid__inner">
      <div class="mdc-layout-grid__cell--span-12">
        <div class="list-title-div participants">Participants</div>
      </div>
    </div>
    <input-list
      :fields="participantsField"
      v-model="participantList"
      span="4"
    ></input-list>
    <hr />
    <div class="mdc-layout-grid__cell--span-2">
      <el-mdc-button
        title="Submit"
        icon="done_all"
        @click="addEntry()"
        type="raised"
      ></el-mdc-button>
    </div>
  </div>
</template>

<script>
import ElMdcTextArea from "../input/ElMdcTextArea.vue";
import ElMdcInput from "../input/ElMdcInput.vue";
import ElMdcButton from "../button/ElMdcButton.vue";
import InputList from "./shared/InputList.vue";
import itemTypes from "../../types_of_items.json";
import { databaseMixin } from "../../mixins/database.js";

//import writeOb from "../../write.js";

export default {
  data() {
    return {
      description: "",
      fields: [
        {
          title: "Item name",
          icon: "create",
          type: "text",
          component: "ElMdcInput",
          variableProp: "name"
        },
        {
          title: "Type",
          options: itemTypes,
          icon: "sort",
          component: "ElMdcSelect",
          variableProp: "type"
        },
        {
          title: "Amount",
          icon: "create",
          type: "text",
          component: "ElMdcInput",
          variableProp: "amount"
        },
        {
          title: "Cost per unit",
          icon: "create",
          type: "text",
          component: "ElMdcInput",
          variableProp: "cost"
        }
      ],

      participantsField: [
        {
          title: "Name",
          icon: "person_outline",
          type: "text",
          component: "ElMdcInput",
          variableProp: "name"
        },
        {
          title: "Need to pay",
          icon: "create",
          type: "text",
          component: "ElMdcInput",
          variableProp: "needToPay"
        },
        {
          title: "Paid",
          icon: "create",
          type: "text",
          component: "ElMdcInput",
          variableProp: "paid"
        }
      ],

      inputDate: "",
      needToPay: 0,
      paid: 0,
      itemList: [],
      participantList: [],
      emptyField: false
    };
  },

  mixins: [databaseMixin],

  computed: {
    totalCost() {
      if (this.itemList.length == 0) return 0;
      return this.itemList.reduce(function(total, currentVal) {
        return total + (currentVal.amount || 0) * (currentVal.cost || 0);
      }, 0);
    }
  },

  components: {
    ElMdcTextArea,
    ElMdcInput,
    ElMdcButton,
    InputList
  },

  methods: {
    addEntry() {
      const ind = this.itemList.find(item => {
        if (item.name && item.type && item.amount && item.cost) return false;
        else return true;
      });
      const indP = this.participantList.find(part => {
        if (part.name && part.needToPay && part.paid) return false;
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
          const entryOb = {
            type: "sharedcost",
            date: this.inputDate.value,
            description: this.description,
            items: this.itemList,
            iNeedToPay: this.needToPay,
            iPaid: this.paid,
            participants: this.participantList
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
  },

  mounted() {
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
    this.inputDate = { value: today };
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
