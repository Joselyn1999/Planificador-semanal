import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Texto */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Organiza tu semana. <span className="text-indigo-600">Sin complicaciones.</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl">
            Planifica tareas con drag & drop, guarda automáticamente y accede con tu cuenta de Google.
            Ideal para mantener foco y mostrar resultados rápidamente.
          </p>

          <div className="mt-6 flex gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-3 bg-indigo-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-indigo-700 transition"
            >
              {/* icono Google estilizado como CTA (opcional) */}
              Iniciar sesión
            </Link>

            <a
              href="#features"
              className="inline-flex items-center gap-2 border px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
            >
              Conoce las funcionalidades
            </a>
          </div>

          <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
            <span>🔒 Login con Google • ☁️ Guardado local • ✨ UI moderna</span>
          </div>
        </div>

        {/* Ilustración / mockup */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md p-6 bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-lg">
            {/* Mockup simple: columnas */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="h-6 bg-indigo-100 rounded mb-2" />
                <div className="h-8 bg-indigo-50 rounded mb-2" />
                <div className="h-8 bg-indigo-50 rounded" />
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="h-6 bg-indigo-100 rounded mb-2" />
                <div className="h-8 bg-indigo-50 rounded mb-2" />
                <div className="h-8 bg-indigo-50 rounded" />
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="h-6 bg-indigo-100 rounded mb-2" />
                <div className="h-8 bg-indigo-50 rounded mb-2" />
                <div className="h-8 bg-indigo-50 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
