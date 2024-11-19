// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "campus-market-1f645.firebaseapp.com",
  projectId: "campus-market-1f645",
  storageBucket: "campus-market-1f645.firebasestorage.app",
  messagingSenderId: "32392551435",
  appId: "1:32392551435:web:b8199e26fe4596d48a7b0e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);