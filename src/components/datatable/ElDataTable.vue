<template>
  <table>
    <tr>
      <th v-for="header in headers" :key="header.title">{{ header.title }}</th>
    </tr>
    <tr v-for="item in items" :key="JSON.stringify(item)">
      <td
        v-for="header in headers"
        :key="`${header.variableProp}-${JSON.stringify(item)}`"
      >
        {{ getValue(item, header, header.variableProp) }}
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    getValue(item, header, prop) {
      const returnVal = item[`${prop}`];
      if (prop === "type") {
        return header.options.find(item => item.value === returnVal).title;
      } else return returnVal;
    }
  }
};
</script>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  box-shadow: 0px 0px 5px grey;
}

td,
th {
  box-shadow: 0px 0px 1px grey;
  text-align: center;
  padding: 0.8em;
}

th {
  background: #c5ccd4;
  color: #333232;
}
</style>
