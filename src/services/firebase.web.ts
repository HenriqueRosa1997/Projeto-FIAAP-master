import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAZg0HxkF0qw2W3St_gLb1PvuSkORxzx7Y",
  authDomain: "projeto-fiap-9358a.firebaseapp.com",
  projectId: "projeto-fiap-9358a",
  storageBucket: "projeto-fiap-9358a.firebasestorage.app",
  messagingSenderId: "156560012374",
  appId: "1:156560012374:web:457c13cc631c441430f7f7",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
