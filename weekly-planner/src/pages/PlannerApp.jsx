import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from "uuid";

/*
  PlannerApp.jsx
  - Guarda en localStorage (por usuario si quieres luego integrar Firebase)
  - Añadir / eliminar tareas
  - Drag & drop entre días y reordenado dentro del mismo día
  - Usa Tailwind para estilos
*/

const STORAGE_KEY = "weekly-planner-dias-v1";

const INITIAL_DATA = {
  lunes: { nombre: "Lunes", tareas: [{ id: uuidv4(), text: "Tarea 1" }, { id: uuidv4(), text: "Tarea 2" }] },
  martes: { nombre: "Martes", tareas: [{ id: uuidv4(), text: "Tarea 3" }] },
  miercoles: { nombre: "Miércoles", tareas: [] },
  jueves: { nombre: "Jueves", tareas: [] },
  viernes: { nombre: "Viernes", tareas: [] },
  sabado: { nombre: "Sábado", tareas: [] },
  domingo: { nombre: "Domingo", tareas: [] },
};

function PlannerApp() {
  const [dias, setDias] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : INITIAL_DATA;
    } catch (err) {
      console.error("Error leyendo localStorage:", err);
      return INITIAL_DATA;
    }
  });

  const [nuevaTarea, setNuevaTarea] = useState("");
  const [diaSeleccionado, setDiaSeleccionado] = useState("lunes");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dias));
    } catch (err) {
      console.error("Error guardando en localStorage:", err);
    }
  }, [dias]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    // mismo día: reordenar
    if (source.droppableId === destination.droppableId) {
      const col = Array.from(dias[source.droppableId].tareas);
      const [moved] = col.splice(source.index, 1);
      col.splice(destination.index, 0, moved);

      setDias((prev) => ({
        ...prev,
        [source.droppableId]: {
          ...prev[source.droppableId],
          tareas: col,
        },
      }));
      return;
    }

    // diferente día: mover entre columnas
    const srcCol = Array.from(dias[source.droppableId].tareas);
    const dstCol = Array.from(dias[destination.droppableId].tareas);
    const [moved] = srcCol.splice(source.index, 1);
    dstCol.splice(destination.index, 0, moved);

    setDias((prev) => ({
      ...prev,
      [source.droppableId]: {
        ...prev[source.droppableId],
        tareas: srcCol,
      },
      [destination.droppableId]: {
        ...prev[destination.droppableId],
        tareas: dstCol,
      },
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const text = nuevaTarea.trim();
    if (!text) return;
    const newTask = { id: uuidv4(), text };

    setDias((prev) => ({
      ...prev,
      [diaSeleccionado]: {
        ...prev[diaSeleccionado],
        tareas: [...prev[diaSeleccionado].tareas, newTask],
      },
    }));

    setNuevaTarea("");
  };

  const handleDeleteTask = (diaId, taskId) => {
    setDias((prev) => ({
      ...prev,
      [diaId]: {
        ...prev[diaId],
        tareas: prev[diaId].tareas.filter((t) => t.id !== taskId),
      },
    }));
  };

  const diasOrden = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Weekly Planner</h1>
        <p className="text-sm text-gray-600">Arrastra tareas entre días • Guardado automático</p>
      </header>

      {/* Form para añadir tareas */}
      <form onSubmit={handleAddTask} className="max-w-4xl mx-auto mb-6 flex gap-2">
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

        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Añadir</button>
      </form>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {diasOrden.map((diaId) => {
            const dia = dias[diaId];
            return (
              <Droppable key={diaId} droppableId={diaId}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-white rounded-lg p-4 shadow min-h-[160px] flex flex-col ${
                      snapshot.isDraggingOver ? "ring-2 ring-indigo-300" : ""
                    }`}
                  >
                    <h3 className="font-semibold mb-3">{dia.nombre}</h3>

                    <div className="flex-1">
                      {dia.tareas.map((tarea, index) => (
                        <Draggable key={tarea.id} draggableId={tarea.id} index={index}>
                          {(prov, snap) => (
                            <div
                              ref={prov.innerRef}
                              {...prov.draggableProps}
                              {...prov.dragHandleProps}
                              style={prov.draggableProps.style}
                              className={`mb-3 p-3 rounded border flex justify-between items-center ${
                                snap.isDragging ? "bg-gray-50 shadow" : "bg-white"
                              }`}
                            >
                              <span className="text-sm">{tarea.text}</span>
                              <button
                                onClick={() => handleDeleteTask(diaId, tarea.id)}
                                className="ml-3 text-red-500 text-sm hover:underline"
                                aria-label={`Eliminar ${tarea.text}`}
                                type="button"
                              >
                                Eliminar
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default PlannerApp;
