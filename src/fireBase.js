import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// our web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDR5R*************************",
//   authDomain: "********.firebaseapp.com",
//   projectId: "********",
//   storageBucket: "******.appspot.com",
//   messagingSenderId: "85*******",
//   appId: "1:85550**************",
// };
const firebaseConfig = {
  apiKey: "AIzaSyDR5Rrqa7v7VC8zZ3Xi9Zx6sMV3lcRgLj8",
  authDomain: "pool-f5bd9.firebaseapp.com",
  projectId: "pool-f5bd9",
  storageBucket: "pool-f5bd9.appspot.com",
  messagingSenderId: "855508855433",
  appId: "1:855508855433:web:48850ea577d2c533c23458",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
