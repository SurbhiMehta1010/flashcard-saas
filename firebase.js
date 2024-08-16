// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);