import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAhNKE2xEM4TXaFkGP4WLvX6bRDtFkKvSE",
  authDomain: "week7-yaoyan.firebaseapp.com",
  projectId: "week7-yaoyan",
  storageBucket: "week7-yaoyan.appspot.com",
  messagingSenderId: "468651552332",
  appId: "1:468651552332:web:38487667f9d6228380cee9"
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();

export { auth, db, provider };
