import { auth, provider } from "../firebase/config"; // tu firebase.js actualizado
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Usuario logueado:", result.user);
      navigate("/app"); // redirige a tu app
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      alert("No se pudo iniciar sesión. Revisa la consola.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
        <p className="text-sm text-gray-600 mb-6">Usa tu cuenta de Google para entrar al planificador.</p>
        <button
          onClick={handleGoogleSignIn}
          className="w-full inline-flex items-center justify-center gap-3 px-4 py-2 rounded-lg border hover:bg-gray-50"
        >
          {/* Icono Google */}
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
