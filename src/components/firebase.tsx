import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm31tAER0CdUDKw7q108hNEUY36OWwYcM",
  authDomain: "check1-3b50a.firebaseapp.com",
  projectId: "check1-3b50a",
  storageBucket: "check1-3b50a.appspot.com",
  messagingSenderId: "992845448715",
  appId: "1:992845448715:web:38459704763ac732b0e90e",
  databaseURL: "https://check1-3b50a-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
