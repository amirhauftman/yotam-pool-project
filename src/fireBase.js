import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// our web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR5R*************************",
  authDomain: "********.firebaseapp.com",
  projectId: "********",
  storageBucket: "******.appspot.com",
  messagingSenderId: "85*******",
  appId: "1:85550**************",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
