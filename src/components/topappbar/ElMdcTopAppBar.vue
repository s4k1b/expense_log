<template>
  <header ref="topappbar" class="mdc-top-app-bar" style="top: 0px; left: 0px;">
    <div class="mdc-top-app-bar__row">
      <section
        class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start"
      >
        <!-- <a href="#" class="material-icons mdc-top-app-bar__navigation-icon" -->
        <!--   >menu</a -->
        <!-- > -->
        <button class="home" @click.prevent="goToHome()">
          Expense Log
        </button>
      </section>
      <section
        class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
        role="toolbar"
      >
        <el-mdc-button
          v-if="!displayName"
          title="Login"
          icon="person_outline"
          type="raised"
          :style-ob="{ 'background-color': '#009933' }"
          @click="login()"
        ></el-mdc-button>
        <template v-else>
          <span class="profile">
            <img :src="photoURL" alt="profile_pic" class="profile-pic" />
            <span class="display-name">{{ displayName }}</span>
          </span>
          <el-mdc-button
            title="Logout"
            icon="power_settings_new"
            type="raised"
            :style-ob="{ 'background-color': '#e63900' }"
            @click="logout()"
          ></el-mdc-button>
        </template>
      </section>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import { MDCTopAppBar } from "@material/top-app-bar/index";
import ElMdcButton from "../button/ElMdcButton.vue";
import { firebaseMixin } from "../../mixins/firebase.js";

export default {
  components: {
    ElMdcButton
  },

  mixins: [firebaseMixin],

  computed: {
    ...mapGetters(["user"]),

    displayName() {
      return (this.user && this.user.displayName) || "";
    },

    photoURL() {
      return this.user.photoURL || "";
    }
  },

  mounted() {
    const topAppBarElement = this.$refs.topappbar;
    this.topAppBar = new MDCTopAppBar(topAppBarElement);
  },

  destroyed() {
    this.topAppBar.destroy();
  },

  methods: {
    goToHome() {
      this.$router.push("/");
    }
  }
};
</script>
<style>
.profile {
  border-right: 2px solid white;
  border-left: 2px solid white;
  margin: 1em;
  border-radius: 10px;
  box-shadow: 1px 1px 10px white;
}
.profile-pic {
  vertical-align: middle;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  margin: 0.5em;
}
.display-name {
  margin-right: 1em;
}
.home {
  border: none;
  background-color: transparent;
  color: white;
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 1.25rem;
  line-height: 2rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  text-decoration: inherit;
  text-transform: inherit;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  z-index: 1;

  padding-left: 1em;
  padding-right: 1em;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  border-radius: 10px;
}
.home:hover {
  cursor: pointer;
  box-shadow: 1px 1px 15px #00004d;
}
.home:focus {
  outline: 0;
}
</style>
