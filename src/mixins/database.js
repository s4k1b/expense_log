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
    addEntryToDb(ob) {
      firebase
        .database()
        .ref("/" + this.userId)
        .set(ob, function(error) {
          if(error) {
            console.log("data write failed");
          } else {
            console.log("data successfully written")
          }
        });
    }
  }
};
