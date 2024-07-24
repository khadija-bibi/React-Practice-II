// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI84GWW_G_dGZMq_ZcK0NmO6itAqitcYM",
  authDomain: "todo-app-dd82a.firebaseapp.com",
  projectId: "todo-app-dd82a",
  storageBucket: "todo-app-dd82a.appspot.com",
  messagingSenderId: "165840593620",
  appId: "1:165840593620:web:3a8797d53d4c53e006d141"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);