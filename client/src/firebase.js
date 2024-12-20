
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "collegetradex.firebaseapp.com",
  projectId: "collegetradex",
  storageBucket: "collegetradex.firebasestorage.app",
  messagingSenderId: "280399225604",
  appId: "1:280399225604:web:b453973e9b7718f6042651"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);