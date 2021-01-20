import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      const { displayName, photoURL, email } = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
      };
      return signedInUser;
      // console.log(displayName, email, photoURL);
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
};

export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      const signOutUser = {
        isSignedIn: false,
        name: "",
        photo: "",
        email: "",
        success: false,
      };
      return signOutUser;
    })
    .catch((error) => {});
};

// export const createUserWithEmailAndPassword = () => {
//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(user.email, user.password)
//     .then((res) => {
//       const newUserInfo = { ...user };
//       newUserInfo.error = "";
//       newUserInfo.success = true;
//       setUser(newUserInfo);
//       updateUserName(user.name);
//       // ...
//     })
//     .catch((error) => {
//       const newUserInfo = { ...user };
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       // var errorCode = error.code;
//       // var errorMessage = error.message;
//       // console.log(errorCode, errorMessage);
//       setUser(newUserInfo);
//     });
// };

// export const signInWithEmailAndPassword = () => {
//   firebase
//     .auth()
//     .signInWithEmailAndPassword(user.email, user.password)
//     .then((res) => {
//       // Signed in
//       // ...
//       const newUserInfo = { ...user };
//       newUserInfo.error = "";
//       newUserInfo.success = true;
//       setUser(newUserInfo);
//       setLoggedInUser(newUserInfo);
//       history.replace(from);
//       //   console.log('sign in user info', res.user);
//     })
//     .catch((error) => {
//       const newUserInfo = { ...user };
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       // var errorCode = error.code;
//       // var errorMessage = error.message;
//       // console.log(errorCode, errorMessage);
//       setUser(newUserInfo);
//     });
// };

// const updateUserName = (name) => {
//   const user = firebase.auth().currentUser;

//   user
//     .updateProfile({
//       displayName: name,
//       // photoURL: "https://example.com/jane-q-user/profile.jpg",
//     })
//     .then(function () {
//       // Update successful.
//       console.log("user name update successfully");
//     })
//     .catch(function (error) {
//       // An error happened.
//       console.log(error);
//     });
// };
