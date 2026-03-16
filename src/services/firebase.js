import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';

// Reusing the configuration from the user's previous 'Piggy' project
const firebaseConfig = {
  apiKey: "AIzaSyCedcTzrFvO-4XOWRq-7JrmiYw5pQEVViU",
  authDomain: "piggy-app-7f42d.firebaseapp.com",
  projectId: "piggy-app-7f42d",
  storageBucket: "piggy-app-7f42d.firebasestorage.app",
  messagingSenderId: "1046144368349",
  appId: "1:1046144368349:web:cf026a7139d4ec3ec82534",
  measurementId: "G-YXSKM4BLL8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, doc, setDoc, getDoc, onSnapshot };
