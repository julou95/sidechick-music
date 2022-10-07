import 'firebase/messaging';
import "firebase/firestore";
import firebase from 'firebase/app';
import localforage from 'localforage';
import { config } from '@/constants/firebaseData'

const firebaseCloudMessaging = {
  //checking whether token is available in indexed DB
  tokenInlocalforage: async () => {
    return localforage.getItem('fcm_token');
  },

  //initializing firebase app
  init: async function () {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyCOlV7NKYUoBM05aqFOzzzE7MX3vqMnLVE',
        authDomain: "side-chick-60a33.firebaseapp.com",
        projectId: "side-chick-60a33",
        storageBucket: "side-chick-60a33.appspot.com",
        messagingSenderId: "947750175464",
        appId: "1:947750175464:web:9d7247fe2fee918e58ff5d",
        measurementId: "G-DJYFCY7S0M"
      });

      try {
        const messaging = firebase.messaging();
        const tokenInLocalForage = await this.tokenInlocalforage();

        //if FCM token is already there just return the token
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }

        //requesting notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === 'granted') {
          //getting token from FCM
          const fcm_token = await messaging.getToken({ vapidKey: 'BJ5bkzc_OwliWwVb_rlq_6-LdfV5Gz7tJYWdQbFqRsjq17D9F9n6J5dcA0xRGKB7CmXasTnfqqSwgbVSZM5fY_o' });
          if (fcm_token) {
            //setting FCM token in indexed db using localforage
            localforage.setItem('fcm_token', fcm_token);
            //return the FCM token after saving it
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
export { firebaseCloudMessaging };

export const db = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyCOlV7NKYUoBM05aqFOzzzE7MX3vqMnLVE',
      authDomain: "side-chick-60a33.firebaseapp.com",
      projectId: "side-chick-60a33",
      storageBucket: "side-chick-60a33.appspot.com",
      messagingSenderId: "947750175464",
      appId: "1:947750175464:web:9d7247fe2fee918e58ff5d",
      measurementId: "G-DJYFCY7S0M"
    });
  }
  return firebase.firestore()
}

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getMessaging } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: process.env.FS_API,
//   authDomain: "side-chick-60a33.firebaseapp.com",
//   projectId: "side-chick-60a33",
//   storageBucket: "side-chick-60a33.appspot.com",
//   messagingSenderId: "947750175464",
//   appId: "1:947750175464:web:9d7247fe2fee918e58ff5d",
//   measurementId: "G-DJYFCY7S0M"
// };

// export const app = initializeApp(firebaseConfig);
// export const messaging = getMessaging(app);
// export const database = getFirestore(app);

// export const getToken = (setTokenFound) => {
//   return getToken(messaging, {vapidKey: 'BJ5bkzc_OwliWwVb_rlq_6-LdfV5Gz7tJYWdQbFqRsjq17D9F9n6J5dcA0xRGKB7CmXasTnfqqSwgbVSZM5fY_o'}).then((currentToken) => {
//     if (currentToken) {
//       console.log('current token for client: ', currentToken);
//       setTokenFound(true);
//       // Track the token -> client mapping, by sending to backend server
//       // show on the UI that permission is secured
//     } else {
//       console.log('No registration token available. Request permission to generate one.');
//       setTokenFound(false);
//       // shows on the UI that permission is required 
//     }
//   }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     // catch error while creating client token
//   });
// }

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
// });