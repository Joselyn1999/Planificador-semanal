import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

function DayColumn({ diaId, dia, onDeleteTask }) {
  return (
    <Droppable droppableId={diaId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`bg-white rounded-lg p-4 shadow min-h-[160px] flex flex-col transition ${
            snapshot.isDraggingOver ? "ring-2 ring-indigo-300" : ""
          }`}
        >
          <h3 className="font-semibold mb-3">{dia.nombre}</h3>
          <div className="flex-1">
            {dia.tareas.map((tarea, index) => (
              <TaskCard
                key={tarea.id}
                tarea={tarea}
                index={index}
                onDelete={() => onDeleteTask(diaId, tarea.id)}
              />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default DayColumn;
