// src/auth.js
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

// Iniciar sesión con Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Usuario:", user);
    return user;
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    throw error;
  }
};

// Cerrar sesión
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("Usuario desconectado ✅");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
