import { auth, provider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Usuario logueado:", result.user);
      // Pequeño delay para mostrar el estado de éxito
      setTimeout(() => {
        navigate("/app");
      }, 800);
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      alert("No se pudo iniciar sesión. Revisa la consola.");
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute -bottom-32 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      
      {/* Contenedor principal */}
      <div className="relative">
        {/* Card principal con glassmorphism */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 max-w-md w-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            {/* Icono del planificador */}
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform transition-transform duration-300 hover:rotate-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              WeeklyPlanner
            </h1>
            <p className="text-gray-600 text-sm">
              Organiza tu semana de forma inteligente
            </p>
          </div>

          {/* Formulario */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Bienvenido de vuelta</h2>
              <p className="text-gray-600 text-sm mb-6">
                Inicia sesión para acceder a tu planificador personal
              </p>
            </div>

            {/* Botón de Google */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className={`
                w-full group relative overflow-hidden
                ${isLoading 
                  ? 'bg-gray-100 cursor-not-allowed' 
                  : 'bg-white hover:bg-gray-50 active:bg-gray-100'
                }
                border-2 border-gray-200 rounded-xl
                px-6 py-4 transition-all duration-300
                shadow-lg hover:shadow-xl hover:-translate-y-1
                focus:outline-none focus:ring-4 focus:ring-blue-500/20
              `}
            >
              <div className="flex items-center justify-center gap-3">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                <span className={`font-medium transition-colors duration-200 ${
                  isLoading ? 'text-gray-400' : 'text-gray-700 group-hover:text-gray-900'
                }`}>
                  {isLoading ? 'Iniciando sesión...' : 'Continuar con Google'}
                </span>
              </div>
              
              {/* Efecto de hover */}
              {!isLoading && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              )}
            </button>

            {/* Botón volver */}
            <button
              onClick={handleGoBack}
              className="w-full text-center py-3 text-gray-500 hover:text-gray-700 transition-colors duration-200 font-medium group"
            >
              <span className="border-b border-transparent group-hover:border-gray-400 transition-colors duration-200">
                ← Volver al inicio
              </span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200/50">
            <p className="text-xs text-gray-500 text-center">
              Al continuar, aceptas nuestros términos de servicio y política de privacidad
            </p>
          </div>
        </div>

        {/* Elementos decorativos adicionales */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full opacity-60 animate-bounce delay-1000"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-indigo-400 rounded-full opacity-40 animate-bounce delay-500"></div>
      </div>
    </div>
  );
}

export default Login;