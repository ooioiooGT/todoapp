import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import {getAuth} from "firebase/auth";
// import {...} from "firebase/database";
import {getFirestore} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC-tOco85yz9SUeVYn_ggcC_kUaiCVSUI4",
    authDomain: "todo-a7b4c.firebaseapp.com",
    projectId: "todo-a7b4c",
    storageBucket: "todo-a7b4c.appspot.com",
    messagingSenderId: "513529194138",
    appId: "1:513529194138:web:9d523ff7a914ca03be6123",
    measurementId: "G-JRX9387K0D"
  };

export const app = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(app);
export const FIREBASE_AUTH = getAuth(app);
