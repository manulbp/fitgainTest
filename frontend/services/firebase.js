// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAvBNhdHeIUZ36_WkOvG5AD40QLvsCU_40",
    authDomain: "itp-project-a9f3b.firebaseapp.com",
    projectId: "itp-project-a9f3b",
    storageBucket: "itp-project-a9f3b.firebasestorage.app",
    messagingSenderId: "635635280893",
    appId: "1:635635280893:web:dd50a6651dbc8515438794"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth();
export default app;
