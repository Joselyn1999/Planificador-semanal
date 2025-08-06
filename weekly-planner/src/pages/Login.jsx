import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";

function Login() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      // login ok
      navigate("/app");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      alert("No se pudo iniciar sesión. Revisa la consola.");
    }
  };

  // Si quieres, lanzar el popup al entrar en la página:
  // useEffect(() => { handleGoogleSignIn(); }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
        <p className="text-sm text-gray-600 mb-6">Usa tu cuenta de Google para entrar al planificador.</p>

        <button
          onClick={handleGoogleSignIn}
          className="w-full inline-flex items-center justify-center gap-3 px-4 py-2 rounded-lg border hover:bg-gray-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            {/* icono Google simple */}
            <path fill="#EA4335" d="M24 9.5c3.9 0 6.6 1.6 8.6 2.9l6.2-6.2C35.5 3.1 30.1 1 24 1 14.7 1 7 6.2 3.1 14.2l7.5 5.8C12.7 15.1 18 9.5 24 9.5z" />
            <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-2.8-.4-4.1H24v7.9h12.7c-.6 2.9-2.2 5.2-4.7 6.7l6.9 5.2c4-3.7 6.9-9 6.9-15.7z" />
            <path fill="#4A90E2" d="M10.6 28.9a14 14 0 01-.9-4.4c0-1.5.3-2.8.9-4.1L3 15.4C.9 18.5 0 21.2 0 24c0 2.8.9 5.5 2.6 7.7l8-2.8z" />
            <path fill="#FBBC05" d="M24 46.5c6.4 0 11.6-2 15.4-5.4l-7.4-5.7c-2 1.4-4.6 2.3-8 2.3-6.7 0-12.3-5.4-13.9-12.5l-8 2.8C6.9 40.6 14.7 46.5 24 46.5z" />
          </svg>
          Iniciar sesión con Google
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full text-sm text-gray-600 hover:underline"
        >
          Volver a la landing
        </button>
      </div>
    </div>
  );
}

export default Login;
