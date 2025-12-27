import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Our web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuo4KhyYKy6vXix5O2Q5ab460HUq19ZgY",
  authDomain: "ai-trip-planner-c02ea.firebaseapp.com",
  projectId: "ai-trip-planner-c02ea",
  storageBucket: "ai-trip-planner-c02ea.firebasestorage.app",
  messagingSenderId: "663608335606",
  appId: "1:663608335606:web:26dae4093c8a805c3160d7",
  measurementId: "G-EVS5K7P1NF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);