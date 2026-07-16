import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZg0HxkF0qw2W3St_gLb1PvuSkORxzx7Y",
  authDomain: "projeto-fiap-9358a.firebaseapp.com",
  projectId: "projeto-fiap-9358a",
  storageBucket: "projeto-fiap-9358a.firebasestorage.app",
  messagingSenderId: "156560012374",
  appId: "1:156560012374:web:457c13cc631c441430f7f7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
