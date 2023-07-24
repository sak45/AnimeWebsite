
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPJFUPxq23VeEqW1eiARarpD4r_pho0kk",
  authDomain: "test-86e9e.firebaseapp.com",
  projectId: "test-86e9e",
  storageBucket: "test-86e9e.appspot.com",
  messagingSenderId: "156156509370",
  appId: "1:156156509370:web:b4ceeda2b75787a23c1683",
  measurementId: "G-7N1V9LXPST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
