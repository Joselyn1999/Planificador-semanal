import React, { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";

import DayColumn from "../components/Planner/DayColumn";
import AddTaskForm from "../components/Planner/AddTaskForm";

console.log("DayColumn:", DayColumn);
console.log("AddTaskForm:", AddTaskForm);

const STORAGE_KEY = "weekly-planner-dias-v1";

const INITIAL_DATA = {
  lunes: { nombre: "Lunes", tareas: [{ id: uuidv4(), text: "Tarea 1" }] },
  martes: { nombre: "Martes", tareas: [{ id: uuidv4(), text: "Tarea 2" }] },
  miercoles: { nombre: "Miércoles", tareas: [] },
  jueves: { nombre: "Jueves", tareas: [] },
  viernes: { nombre: "Viernes", tareas: [] },
  sabado: { nombre: "Sábado", tareas: [] },
  domingo: { nombre: "Domingo", tareas: [] },
};

const diasOrden = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

function PlannerApp() {
  const [dias, setDias] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_DATA;
    } catch {
      return INITIAL_DATA;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dias));
  }, [dias]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceTasks = Array.from(dias[source.droppableId].tareas);
    const destTasks = Array.from(dias[destination.droppableId].tareas);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setDias((prev) => ({
        ...prev,
        [source.droppableId]: { ...prev[source.droppableId], tareas: sourceTasks },
      }));
    } else {
      destTasks.splice(destination.index, 0, movedTask);
      setDias((prev) => ({
        ...prev,
        [source.droppableId]: { ...prev[source.droppableId], tareas: sourceTasks },
        [destination.droppableId]: { ...prev[destination.droppableId], tareas: destTasks },
      }));
    }
  };

  const handleAddTask = (diaId, text) => {
    if (!text) return;
    const newTask = { id: uuidv4(), text };
    setDias((prev) => ({
      ...prev,
      [diaId]: {
        ...prev[diaId],
        tareas: [...prev[diaId].tareas, newTask],
      },
    }));
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Weekly Planner</h1>
        <p className="text-sm text-gray-600">Arrastra tareas entre días • Guardado automático</p>
      </header>

      <AddTaskForm diasOrden={diasOrden} dias={dias} onAddTask={handleAddTask} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {diasOrden.map((diaId) => (
            <DayColumn
              key={diaId}
              diaId={diaId}
              dia={dias[diaId]}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default PlannerApp;
