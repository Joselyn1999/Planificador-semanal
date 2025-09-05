// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 👈 Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyA5_r51QxPUxlVsvXv4EiYoS8sbCCPVksA",
  authDomain: "planificador-semanal-a933a.firebaseapp.com",
  projectId: "planificador-semanal-a933a",
storageBucket: "planificador-semanal-a933a.appspot.com",
  messagingSenderId: "851917124261",
  appId: "1:851917124261:web:c2592a71ee60c9f558d34c",
  measurementId: "G-XZ61JWC527"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Servicios
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // 👈 Firestore

export { auth, provider, db };
