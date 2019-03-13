import * as firebase from "firebase";
export const firebaseMixin = {
  methods: {
    async login() {
      var provider = new firebase.auth.GoogleAuthProvider();

      let userOb = {};
      await firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          //var token = result.credential.accessToken;
          // The signed-in user info.
          result.user;
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              userOb = { ...user };
            } else {
              return null;
            }
          });
        })
        .catch(function(error) {
          // Handle Errors here.
          //var errorCode = error.code;
          /*var errorMessage =*/ error.message;
          // The email of the user's account used.
          //var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          //var credential = error.credential;
          // ...
        });
      this.$store.commit("user$set", { ...userOb });
    },

    async logout() {
      let signOutSucc = false;
      await firebase
        .auth()
        .signOut()
        .then(function() {
          signOutSucc = true;
        })
        .catch(function() {
          // An error happened.
        });
      if (signOutSucc) this.$store.commit("user$set", {});
    }
  }
};
