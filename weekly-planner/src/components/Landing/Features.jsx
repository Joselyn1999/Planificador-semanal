import React from "react";

function Features() {
  return (
    <section className="py-12 px-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
      <div>
        <h3 className="text-xl font-semibold mb-2">📅 Drag & Drop</h3>
        <p>Organiza tus tareas fácilmente con interacción visual.</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">🧠 Guardado Automático</h3>
        <p>Todo se guarda localmente sin que lo notes.</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">🔐 Login Seguro</h3>
        <p>Autenticación con Google, sin contraseñas.</p>
      </div>
    </section>
  );
}

export default Features;
