// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { FIREBASE_API_KEY } from "@env";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "matura360-7f90e.firebaseapp.com",
  projectId: "matura360-7f90e",
  storageBucket: "matura360-7f90e.appspot.com",
  messagingSenderId: "756096172243",
  appId: "1:756096172243:web:934b6bb8ad67e604491426",
  measurementId: "G-JWD6W5N7KS",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
