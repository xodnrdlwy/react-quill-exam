// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxxxx",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage()