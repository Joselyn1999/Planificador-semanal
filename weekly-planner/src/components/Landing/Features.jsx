import React from "react";

const features = [
  {
    title: "Drag & Drop intuitivo",
    desc: "Mueve tareas entre días con una experiencia fluida y rápida.",
    icon: "📦",
  },
  {
    title: "Inicio con Google",
    desc: "Autentícate fácilmente sin contraseñas y protege tus datos.",
    icon: "🔐",
  },
  {
    title: "Guardado automático",
    desc: "Tus cambios se guardan al instante en el navegador (o en la nube si integras Firebase).",
    icon: "💾",
  },
  {
    title: "Diseño responsive",
    desc: "Funciona bien tanto en móvil como en escritorio.",
    icon: "📱",
  },
  {
    title: "Componentes limpios",
    desc: "Código modular pensado para mantener y escalar el proyecto.",
    icon: "🧩",
  },
  {
    title: "Fácil de desplegar",
    desc: "Sube tu proyecto a Vercel o Netlify en minutos.",
    icon: "🚀",
  },
];

function Features() {
  return (
    <section id="features" className="py-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl mb-3">{f.icon}</div>
            <h4 className="font-semibold mb-2">{f.title}</h4>
            <p className="text-sm text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
