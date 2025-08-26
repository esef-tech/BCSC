// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYWg0Xka9QpbYygTan7_bh2okrfwqopWo",
  authDomain: "best-c11d0.firebaseapp.com",
  projectId: "best-c11d0",
  storageBucket: "best-c11d0.firebasestorage.app",
  messagingSenderId: "532201094063",
  appId: "1:532201094063:web:3cb74d55535f3c0cb4cd5a",
  measurementId: "G-FRYNMS3681"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);