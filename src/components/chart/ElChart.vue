<template>
  <table>
    <tr>
      <th>Names</th>
      <th
        v-for="header in headers"
        :key="`header-${header}`"
        class="chart-names"
      >
        <img :src="getSrc(header)" class="profile-pic" />
        {{ findName(header) }}
      </th>
    </tr>
    <tr v-for="taker in takers" :key="JSON.stringify(taker)">
      <td class="chart-names">
        <img :src="getSrc(taker)" class="profile-pic" />
        {{ findName(taker) }}
      </td>
      <td
        v-for="header in headers"
        :key="`value-${taker}-${header}`"
        :class="{ greenColor: ifGreen(header, taker) }"
      >
        {{ chart[`${header}`][`${taker}`] || "-" }}
      </td>
    </tr>
    <!-- <tr v-for="item in items" :key="JSON.stringify(item)">
      <td
        v-for="header in headers"
        :key="`${header.variableProp}-${JSON.stringify(item)}`"
      >
        {{ getValue(item, header, header.variableProp) }}
      </td>
    </tr> -->
  </table>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    chart: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    ...mapGetters(["users", "user"]),
    headers() {
      return Object.keys(this.chart).filter(key => key != "unHandled");
    },

    takers() {
      let o = {};
      for (let header of this.headers) {
        Object.assign(o, this.chart[`${header}`]);
      }

      return Object.keys(o);
    }
  },

  methods: {
    ifGreen(header, taker) {
      const val = this.chart[`${header}`][`${taker}`];
      if (val) return true;
      else return false;
    },

    findName(userId) {
      // console.log("userId: ", userId);
      if (userId === "Me") return "Me";
      // console.log("users: ", this.users[`${userId}`]);
      return this.users[`${userId}`] && this.users[`${userId}`].fullName;
    },

    getSrc(userId) {
      if (userId === "Me") return this.user.photoURL;
      else return this.users[`${userId}`] && this.users[`${userId}`].profilePic;
    }
  }
};
</script>

<style>
.chart-names {
  background: #e2e2e2;
  color: #1f1f1f;
  font-weight: 500;
}
.greenColor {
  color: rgb(38, 116, 38);
}
</style>
