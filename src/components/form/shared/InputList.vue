<template>
  <div class="mdc-layout-grid__inner">
    <ul class="mdc-layout-grid__cell--span-12 item-card">
      <li
        v-for="(respItem, index) in respItems"
        :key="`resp-item-${respItem.id}`"
        @mouseenter="respItem.delShow = true"
        @mouseleave="respItem.delShow = false"
      >
        <ul class="mdc-layout-grid__inner card-items">
          <li
            v-for="(field, fidx) in fields"
            :key="`resp-item-field-${respItem.id}-${fidx}`"
            class="mdc-layout-grid__cell--span-3"
          >
            <component
              :is="field.component"
              v-bind="getPropOb(field, index)"
              @input="handle($event)"
              class="input-items"
            ></component>
          </li>
          <div class="remove-btn-wrapper" v-show="respItem.delShow">
            <el-mdc-fab
              icon="remove"
              class="remove-btn"
              @click="removeItem(index)"
              :key="`resp-item-field-del-${respItem.id}`"
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
        @click="addItem()"
        class="add-btn"
      ></el-mdc-fab>
    </div>
  </div>
</template>

<script>
import ElMdcInput from "../../input/ElMdcInput.vue";
import ElMdcSelect from "../../select/ElMdcSelect.vue";
import ElMdcFab from "../../fab/ElMdcFab.vue";

export default {
  props: {
    fields: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      respItems: [{ id: 0, delShow: false }],
      delShow: false
    };
  },

  components: {
    ElMdcInput,
    ElMdcSelect,
    ElMdcFab
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
}

.card-items {
  margin-top: 1%;
}

.input-items {
  width: 100%;
}

.add-btn {
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
