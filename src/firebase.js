import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyAmUmbS4v02zJ2DSoFDHYzodt5BoSjYIFo",
  authDomain: "dictionary-auth.firebaseapp.com",
  projectId: "dictionary-auth",
  storageBucket: "dictionary-auth.appspot.com",
  messagingSenderId: "61538623771",
  appId: "1:61538623771:web:1c56b4ccf5cd59595bb3be",
});

export const auth = firebaseConfig.auth();
export default firebaseConfig;
