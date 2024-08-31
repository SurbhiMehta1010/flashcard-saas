// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMxKz17uHLgpQCmlUVB7gb5wxeRroVQ9E",
  authDomain: "flashcardsaas-5f19c.firebaseapp.com",
  projectId: "flashcardsaas-5f19c",
  storageBucket: "flashcardsaas-5f19c.appspot.com",
  messagingSenderId: "67477443265",
  appId: "1:67477443265:web:81c36678dfb2f762e53a40",
  measurementId: "G-2QLST9LZLE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default db;
