import React from "react";
import { Draggable } from "@hello-pangea/dnd";

function TaskCard({ tarea, index, onDelete }) {
  return (
    <Draggable draggableId={tarea.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
          className={`mb-3 p-3 rounded border flex justify-between items-center text-sm transition ${
            snapshot.isDragging ? "bg-gray-50 shadow" : "bg-white"
          }`}
        >
          <span>{tarea.text}</span>
          <button
            onClick={onDelete}
            className="ml-3 text-red-500 hover:underline"
            type="button"
            aria-label={`Eliminar ${tarea.text}`}
          >
            Eliminar
          </button>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
