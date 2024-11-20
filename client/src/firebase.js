// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-5f2ca.firebaseapp.com",
  projectId: "mern-blog-5f2ca",
  storageBucket: "mern-blog-5f2ca.firebasestorage.app",
  messagingSenderId: "395280977085",
  appId: "1:395280977085:web:9e9eb5fbf3cf589816fbd4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);