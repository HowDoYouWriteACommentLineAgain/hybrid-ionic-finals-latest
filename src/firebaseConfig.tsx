import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDy1iDjWa56NR8GWpw96D1dVjTxepPJy-M",
  authDomain: "testing-216c7.firebaseapp.com",
  projectId: "testing-216c7",
  storageBucket: "testing-216c7.firebasestorage.app",
  messagingSenderId: "688943822477",
  appId: "1:688943822477:web:052a8e97950bb28a71d4c4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
