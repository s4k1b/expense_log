<template>
  <div>
    <template
      v-if="
        Object.keys(filteredLogs).length === 0 &&
          filteredLogs.constructor === Object
      "
    >
      <ul ref="entrylist" class="mdc-list">
        <span>!! No Entries to show !!</span>
      </ul>
    </template>
    <template v-else>
      <ul ref="entrylist" class="mdc-list mdc-list--two-line">
        <li role="separator" class="mdc-list-divider"></li>
        <template v-for="(value, key) in filteredLogs">
          <li :key="`title-${key}`" class="mdc-list-item entry-list-item">
            <img class="entry-icon" :src="getIcon(value.type)" alt="icon" />
            <span class="mdc-list-item__text">
              <span class="mdc-list-item__primary-text entry-title">
                {{ getTitle(value.type) || "" }}
              </span>
              <span class="mdc-list-item__secondary-text entry-items">
                {{ getItems(value.items) || "" }}
              </span>
            </span>
            <span class="mdc-list-item__meta" aria-hidden="true">
              {{ getDate(value.date) || "" }}
            </span>
          </li>
          <li :key="`hr-${key}`" role="separator" class="mdc-list-divider"></li>
        </template>
      </ul>
    </template>
  </div>
</template>

<script>
import { MDCList } from "@material/list";
import { MDCRipple } from "@material/ripple";
import { mapGetters } from "vuex";
import typesOfExpenses from "../../types_of_expenses.json";

export default {
  computed: {
    ...mapGetters(["filteredLogs"])
  },

  mounted() {
    this.list = new MDCList(this.$refs.entrylist);
    this.listripple = this.list.listElements.map(
      listItemEl => new MDCRipple(listItemEl)
    );
  },

  destroyed() {
    this.list.destroy();
    this.listripple.forEach(element => {
      element.destroy();
    });
  },

  methods: {
    getTitle(value) {
      return typesOfExpenses.find(item => item.value === value).title || "";
    },

    getItems(items) {
      let s = "";
      for (let i = 0; i < items.length; i++) {
        if (i > 0) s += ", ";
        s += `${items[i].name}`;
      }
      return s;
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
    },

    getIcon(type) {
      const ico = typesOfExpenses.find(item => item.value === type).icon || "";
      return require("../../assets/icons/svg/" + ico + ".svg");
    }
  }
};
</script>

<style>
.entry-icon {
  width: 40px;
  height: 40px;
  margin-right: 1em;
}
.entry-list-item {
  border-left: 1px solid rgb(201, 201, 201);
  border-right: 1px solid rgb(201, 201, 201);
}
.entry-title {
  text-align: left;
}
.entry-items {
  text-align: left;
}
</style>
