// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-okanhjvi-U09cIiaykhojTRodvqMvzQ",
  authDomain: "digitech-2e3ba.firebaseapp.com",
  databaseURL: "https://digitech-2e3ba-default-rtdb.firebaseio.com",
  projectId: "digitech-2e3ba",
  storageBucket: "digitech-2e3ba.appspot.com",
  messagingSenderId: "423265742619",
  appId: "1:423265742619:web:7952089c9c701863626dbe",
  measurementId: "G-XCW4T8CX0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export {firebaseConfig}