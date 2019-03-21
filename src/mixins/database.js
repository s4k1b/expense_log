import * as firebase from "firebase";
import { mapGetters } from "vuex";
export const databaseMixin = {
  computed: {
    ...mapGetters(["user"]),
    userId() {
      return this.user.uid || "";
    }
  },

  methods: {
    async addEntryToDb(ob) {
      if (!this.userId) {
        this.$snack.unsuccessful({
          text: "Please login first",
          button: "⚠"
        });
        return;
      }

      let success = false;
      await firebase
        .database()
        .ref("/" + this.userId + "/logs")
        .push()
        .set(ob, function(error) {
          if (error) {
            success = false;
          } else {
            success = true;
          }
        });
      if (success) {
        this.$router.push("/");
        this.$snack.successful({
          text: "Successfully added entry",
          button: "✔"
        });
      } else {
        this.$snack.unsuccessful({
          text: "Failed to add entry",
          button: "⚠"
        });
      }
    },

    async update(value, entryKey) {
      let success = false;
      await firebase
        .database()
        .ref("/" + this.userId + "/logs/" + entryKey)
        .set(value, function(error) {
          if (error) {
            success = false;
          } else {
            success = true;
          }
        });
      if (success) {
        this.$snack.successful({
          text: "Update successfull",
          button: "✔"
        });
      } else {
        this.$snack.unsuccessful({
          text: "Update failed",
          button: "⚠"
        });
      }
    },

    async getEntryList() {
      let entryListRef = await firebase
        .database()
        .ref("/" + this.userId + "/logs");
      const vm = this;
      entryListRef.on("value", function(snapshot) {
        vm.$store.commit("logs$set", snapshot.val());
        vm.$store.commit("filteredLogs");
      });
    },

    async getEntryDetails(logId) {
      const vm = this;
      let entryRef = await firebase
        .database()
        .ref("/" + this.userId + "/logs/" + logId);
      entryRef.on("value", function(snapshot) {
        vm.$store.commit("log$set", snapshot.val());
      });
    }
  }
};
