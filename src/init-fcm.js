import * as firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
  // Project Settings => Add Firebase to your web app
  apiKey: "AIzaSyBYh4kM41BWVUf7tF_RB56QxYK9Ua3CFXI",
  authDomain: "tryfirebaseproject-34025.firebaseapp.com",
  databaseURL: "https://tryfirebaseproject-34025.firebaseio.com",
  projectId: "tryfirebaseproject-34025",
  storageBucket: "tryfirebaseproject-34025.appspot.com",
  messagingSenderId: "242828897331",
  appId: "1:242828897331:web:e6a77f6a72affb02438746",
});
const messaging = initializedFirebaseApp.messaging();
export { messaging };
