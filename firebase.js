import firebase from 'firebase/app'
import 'firebase/auth'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjoA5JSREry14gmnwzqrToQnrQkmeBv50",
  authDomain: "otp-app-demo-ee8c3.firebaseapp.com",
  projectId: "otp-app-demo-ee8c3",
  storageBucket: "otp-app-demo-ee8c3.appspot.com",
  messagingSenderId: "784517343980",
  appId: "1:784517343980:web:8747eed9049d4bf32553c9",
  measurementId: "G-6T5M06QTMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);