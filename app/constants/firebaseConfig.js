import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.FS_API,
  authDomain: "side-chick-60a33.firebaseapp.com",
  projectId: "side-chick-60a33",
  storageBucket: "side-chick-60a33.appspot.com",
  messagingSenderId: "947750175464",
  appId: "1:947750175464:web:9d7247fe2fee918e58ff5d",
  measurementId: "G-DJYFCY7S0M"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const messaging = getMessaging(app);