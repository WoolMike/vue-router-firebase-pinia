// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRdqKlO1kqW0IeIMHuZAQzsIIh7MG7gG4",
  authDomain: "vue-firebase-e16fb.firebaseapp.com",
  projectId: "vue-firebase-e16fb",
  storageBucket: "vue-firebase-e16fb.firebasestorage.app",
  messagingSenderId: "1055760326681",
  appId: "1:1055760326681:web:53ace2139ba05f217b0a88"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth=getAuth();

export{auth};