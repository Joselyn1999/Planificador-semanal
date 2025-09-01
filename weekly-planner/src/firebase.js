// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA5_r51QxPUxlVsvXv4EiYoS8sbCCPVksA",
  authDomain: "planificador-semanal-a933a.firebaseapp.com",
  projectId: "planificador-semanal-a933a",
  storageBucket: "planificador-semanal-a933a.firebasestorage.app",
  messagingSenderId: "851917124261",
  appId: "1:851917124261:web:c2592a71ee60c9f558d34c",
  measurementId: "G-XZ61JWC527"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Analytics solo si está soportado en navegador
let analytics;
isSupported().then(supported => {
  if (supported) analytics = getAnalytics(app);
});

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, analytics };
