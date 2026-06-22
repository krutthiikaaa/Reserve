// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeuTr4a4HnVShOFqCkW5u6bElY_pEeVmQ",
  authDomain: "reserve-174cf.firebaseapp.com",
  projectId: "reserve-174cf",
  storageBucket: "reserve-174cf.firebasestorage.app",
  messagingSenderId: "177547875574",
  appId: "1:177547875574:web:c6e276e8a6746c540688d7",
  measurementId: "G-JZNB2NK5K0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;