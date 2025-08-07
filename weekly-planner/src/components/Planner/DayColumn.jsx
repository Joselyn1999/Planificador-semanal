import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

function DayColumn({ diaId, dia, onDeleteTask }) {
  return (
    <Droppable droppableId={diaId}>
      {(droppableProvided) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className="bg-white p-4 rounded-lg shadow-md min-h-[200px] flex flex-col"
        >
          <h2 className="font-semibold text-lg mb-3">{dia.nombre}</h2>

          <div className="flex-1 space-y-2">
            {(dia.tareas || []).map((tarea, index) => (
              <Draggable
                key={tarea.id}
                draggableId={tarea.id}
                index={index}
              >
                {(draggableProvided) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <TaskCard
                      tarea={tarea}
                      onDelete={() => onDeleteTask(diaId, tarea.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}

            {droppableProvided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default DayColumn;
