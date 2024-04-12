// firebase.js

import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBYlN1KP9FQGVpjUCOpTdTdhXr4RZv3nbw",
    authDomain: "cliq-4671c.firebaseapp.com",
    projectId: "cliq-4671c",
    storageBucket: "cliq-4671c.appspot.com",
    messagingSenderId: "373018896505",
    appId: "1:373018896505:web:ae6a849ff7641f92500ca8"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
