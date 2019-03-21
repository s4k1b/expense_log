<template>
  <div class="mdc-layout-grid__inner">
    <ul class="mdc-layout-grid__cell--span-12 item-card">
      <li
        v-for="(respItem, index) in respItems"
        :key="`resp-item-${respItem.id}`"
        class="item"
        @mouseenter="respItem.delShow = true"
        @mouseleave="respItem.delShow = false"
      >
        <ul class="mdc-layout-grid__inner card-items">
          <li
            v-for="(field, fidx) in fields"
            :key="`resp-item-field-${respItem.id}-${fidx}`"
            :class="`mdc-layout-grid__cell--span-${span}`"
          >
            <component
              :is="field.component"
              v-bind="getPropOb(field, index)"
              class="input-items"
              @input="handle($event)"
            ></component>
          </li>
          <div v-show="respItem.delShow" class="remove-btn-wrapper">
            <el-mdc-fab
              :key="`resp-item-field-del-${respItem.id}`"
              icon="remove"
              class="remove-btn"
              @click="removeItem(index)"
            ></el-mdc-fab>
          </div>
        </ul>
      </li>
    </ul>
    <div class="mdc-layout-grid__cell--span-12">
      <el-mdc-fab
        icon="add"
        title="add"
        :extended="true"
        class="add-btn"
        @click="addItem()"
      ></el-mdc-fab>
    </div>
  </div>
</template>

<script>
import ElMdcInput from "../../input/ElMdcInput.vue";
import ElMdcSelect from "../../select/ElMdcSelect.vue";
import ElMdcFab from "../../fab/ElMdcFab.vue";

export default {
  components: {
    ElMdcInput,
    ElMdcSelect,
    ElMdcFab
  },
  props: {
    fields: {
      type: Array,
      default: () => []
    },

    span: {
      type: [Number, String],
      default: 3
    },

    propRespItems: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      respItems: [
        {
          id: 0,
          delShow: false
        }
      ],
      delShow: false
    };
  },

  watch: {
    respItems(newVal) {
      let emitArr = newVal.map(item => {
        let newItem = {};
        Object.assign(newItem, item);
        delete newItem.id;
        delete newItem.delShow;
        return newItem;
      });
      this.$emit("input", emitArr);
    }
  },

  mounted() {
    //for supporting multiple items editing
    if (this.propRespItems.length > 0)
      this.respItems = this.propRespItems.map((item, index) => {
        const date = new Date();
        const timestamp = date.getTime();
        this.$set(item, "id", `${timestamp}-${index}`);
        this.$set(item, "delShow", false);
        // Object.assign(item, { id: `${timestamp}-${index}`, delShow: false });
        return item;
      });
  },

  methods: {
    handle(resp) {
      //for making resposive, (vue is not resposive to array index accessing)
      const newRow = this[resp.variableName][resp.variableIndex];
      newRow[resp.variableProp] = resp.value;
      this.$set(this[resp.variableName], resp.variableIndex, newRow);
    },

    getPropOb(field, val) {
      let o = {};
      //directly assigning field to o will cause pass by reference and modifying o will cause modifiaction in field prop
      Object.assign(o, field, {
        variableName: "respItems",
        variableIndex: val
      });
      delete o.component;
      //for details page edit button
      if (
        this.propRespItems.length > 0 &&
        this.respItems.length <= this.propRespItems.length //to enable add button in LogDetails page
      )
        Object.assign(o, {
          propValue: this.respItems[val][`${field.variableProp}`]
        });

      return o;
    },

    removeItem(index) {
      this.$delete(this.respItems, index);
    },

    addItem() {
      const date = new Date();
      const timestamp = date.getTime();
      this.respItems.push({ id: timestamp, delShow: false });
    }
  }
};
</script>
<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.item-card {
  margin-top: 2%;
  padding: 1em;
  box-shadow: 0px 0px 2px grey;
  background-color: rgb(237, 237, 253);
}

.item-card .item + .item {
  margin-top: 0.9em;
}

.input-items {
  width: 100%;
}

.add-btn {
  margin-top: -1.5%;
  margin-bottom: 1%;
  height: 2.5em;
  width: 9em;
}

.remove-btn-wrapper {
  position: absolute;
  width: 5.5em;
  margin-left: -5.5em;
}

.remove-btn {
  background-color: red;
}
</style>
