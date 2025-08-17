// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "cinebot-7b9d6.firebaseapp.com",
  projectId: "cinebot-7b9d6",
  storageBucket: "cinebot-7b9d6.firebasestorage.app",
  messagingSenderId: "570548849072",
  appId: "1:570548849072:web:645f3e0c082d99c077ae75",
  measurementId: "G-JBE2DPJS6E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);