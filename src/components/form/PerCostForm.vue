<template>
  <div>
    <el-mdc-input title="Date" icon="event" type="date" v-model="inputDate" class="input-date"></el-mdc-input>
    <el-mdc-text-area rows="2" title="Description" @input="description = $event"></el-mdc-text-area>
    <input-list :fields="fields" v-model="itemList"></input-list>
    <hr>
    <div class="mdc-layout-grid__inner">
      <div class="mdc-layout-grid__cell--span-2">
        <el-mdc-button title="Submit" icon="done_all" @click="addEntry()" type="raised"></el-mdc-button>
      </div>
      <div class="mdc-layout-grid__cell--span-10">
        <div class="total-cost">
          Total Cost:
          <span class="amount">{{ totalCost }}</span> tk
        </div>
      </div>
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

      inputDate: "",
      itemList: [],
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
      if (this.itemList.length === 0 || ind) {
        this.emptyField = true;
      } else {
        if (this.inputDate && this.description) {
          // Create entry object
          this.emptyField = false;
          const entryOb = {
            type: "personal",
            date: this.inputDate.value,
            description: this.description,
            items: this.itemList
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
  width: 9em;
  display: block;
  float: right;
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
}
</style>
