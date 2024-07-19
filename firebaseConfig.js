// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIzsPMb5I8bmzaPszXkmczjkde37jtBAI",
  authDomain: "test-5f1af.firebaseapp.com",
  databaseURL: "https://test-5f1af.firebaseio.com",
  projectId: "test-5f1af",
  storageBucket: "test-5f1af.appspot.com",
  messagingSenderId: "332507125702",
  appId: "1:332507125702:web:72227aac579ec8f4f804c7",
  measurementId: "G-9L56QX547B",
};
const app = initializeApp(firebaseConfig);

// const storage = firebase.storage();
// const db = getFirestore(app);

export { app };
