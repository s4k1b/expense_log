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
        <div class="list-title-div items">Recipients</div>
      </div>
    </div>
    <input-list
      v-model="itemList"
      :fields="fields"
      :span="Number(6)"
    ></input-list>
    <hr />
    <div class="mdc-layout-grid__inner">
      <div class="mdc-layout-grid__cell--span-2">
        <el-mdc-button
          title="Submit"
          icon="done_all"
          type="raised"
          @click="addEntry()"
        ></el-mdc-button>
      </div>
      <div class="mdc-layout-grid__cell--span-10">
        <div class="total-cost">
          Total Loaned:
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
import inputListField from "../../input_list_field.json";
import InputList from "./shared/InputList.vue";
import { databaseMixin } from "../../mixins/database.js";
import { mapGetters } from "vuex";

//import writeOb from "../../write.js";

export default {
  components: {
    ElMdcTextArea,
    ElMdcInput,
    ElMdcButton,
    InputList
  },

  mixins: [databaseMixin],
  data() {
    return {
      description: "",
      fields: inputListField.giveFields,

      inputDate: "",
      itemList: [],
      emptyField: false
    };
  },

  computed: {
    ...mapGetters(["users"]),
    totalCost() {
      if (this.itemList.length == 0) return 0;
      return this.itemList.reduce(function(total, currentVal) {
        return total + (Number(currentVal.amount) || 0);
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
      this.itemList.forEach(item => {
        const userInfo = this.findUserInfo(item.email);
        this.$set(item, "userInfo", userInfo);
      });
      // console.log("itemList: ", this.itemList);
      const ind = this.itemList.find(item => {
        if (item.email && item.amount) return false;
        else return true;
      });
      if (this.itemList.length === 0 || ind) {
        this.emptyField = true;
      } else {
        if (this.inputDate && this.description) {
          // Create entry object
          this.emptyField = false;

          const ind2 = this.itemList.find(item => {
            if (item.userInfo) return false;
            else return true;
          });

          // console.log("ind2: ", ind2);

          if (ind2) {
            this.$snack.unsuccessful({
              text: "Email not found in databse",
              button: "⚠"
            });
            return;
          }
          const entryOb = {
            type: "moneyloanedto",
            date: this.convDateStrToNum(this.inputDate.value),
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
.items {
  width: 100px;
}
</style>
