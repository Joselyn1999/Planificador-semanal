import React, { useState } from "react";

function AddTaskForm({ diasOrden, dias, onAddTask }) {
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [diaSeleccionado, setDiaSeleccionado] = useState(diasOrden[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = nuevaTarea.trim();
    if (!text) return;
    onAddTask(diaSeleccionado, text);
    setNuevaTarea("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mb-6 flex gap-2">
      <input
        type="text"
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Escribe una nueva tarea..."
        className="flex-1 px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />

      <select
        value={diaSeleccionado}
        onChange={(e) => setDiaSeleccionado(e.target.value)}
        className="px-3 py-2 rounded border"
      >
        {diasOrden.map((id) => (
          <option key={id} value={id}>
            {dias[id].nombre}
          </option>
        ))}
      </select>

      <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Añadir
      </button>
    </form>
  );
}

export default AddTaskForm;
