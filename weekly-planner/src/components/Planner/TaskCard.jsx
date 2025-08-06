import React from "react";
import { Draggable } from "react-beautiful-dnd";

function TaskCard({ tarea, index, onDelete }) {
  return (
    <Draggable draggableId={tarea.id} index={index}>
      {(prov, snap) => (
        <div
          ref={prov.innerRef}
          {...prov.draggableProps}
          {...prov.dragHandleProps}
          style={prov.draggableProps.style}
          className={`mb-3 p-3 rounded border flex justify-between items-center text-sm transition ${
            snap.isDragging ? "bg-gray-50 shadow" : "bg-white"
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
