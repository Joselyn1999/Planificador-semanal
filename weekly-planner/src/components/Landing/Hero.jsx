import React from "react";
import LoginButton from "./LoginButton";

function Hero() {
  return (
    <section className="text-center py-16 px-6">
      <h2 className="text-4xl font-bold mb-4">Organiza tu semana con estilo</h2>
      <p className="mb-6 text-lg">Tareas arrastrables, guardado automático y login con Google.</p>
      <LoginButton />
    </section>
  );
}

export default Hero;
