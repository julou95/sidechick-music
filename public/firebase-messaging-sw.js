import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: process.env.FS_API,
  authDomain: "side-chick-60a33.firebaseapp.com",
  projectId: "side-chick-60a33",
  storageBucket: "side-chick-60a33.appspot.com",
  messagingSenderId: "947750175464",
  appId: "1:947750175464:web:9d7247fe2fee918e58ff5d",
  measurementId: "G-DJYFCY7S0M"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);