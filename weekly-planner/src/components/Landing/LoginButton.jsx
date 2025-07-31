import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/config";

function LoginButton() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/app");
    } catch (err) {
      console.error("Error al iniciar sesión", err);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-white text-indigo-700 px-6 py-2 rounded-full shadow-lg hover:bg-gray-100 transition"
    >
      Iniciar sesión con Google
    </button>
  );
}

export default LoginButton;
