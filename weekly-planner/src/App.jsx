import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable
} from 'react-beautiful-dnd';

const diasIniciales = {
  lunes: { nombre: 'Lunes', tareas: ['Tarea 1', 'Tarea 2'] },
  martes: { nombre: 'Martes', tareas: ['Tarea 3'] },
  miercoles: { nombre: 'Miércoles', tareas: [] },
  jueves: { nombre: 'Jueves', tareas: [] },
  viernes: { nombre: 'Viernes', tareas: [] },
};

function App() {
  const [dias, setDias] = useState(diasIniciales);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceDia = dias[source.droppableId];
    const destDia = dias[destination.droppableId];

    const sourceTareas = [...sourceDia.tareas];
    const destTareas = [...destDia.tareas];

    const [movedTask] = sourceTareas.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTareas.splice(destination.index, 0, movedTask);
      setDias({
        ...dias,
        [source.droppableId]: {
          ...sourceDia,
          tareas: sourceTareas,
        },
      });
    } else {
      destTareas.splice(destination.index, 0, movedTask);
      setDias({
        ...dias,
        [source.droppableId]: {
          ...sourceDia,
          tareas: sourceTareas,
        },
        [destination.droppableId]: {
          ...destDia,
          tareas: destTareas,
        },
      });
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(dias).map(([diaId, dia]) => (
          <Droppable key={diaId} droppableId={diaId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  backgroundColor: '#f0f0f0',
                  padding: '10px',
                  width: '200px',
                  minHeight: '300px',
                  borderRadius: '8px',
                }}
              >
                <h3>{dia.nombre}</h3>
                {dia.tareas.map((tarea, index) => (
                  <Draggable key={tarea} draggableId={tarea} index={index}s>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          padding: 10,
                          margin: '0 0 8px 0',
                          backgroundColor: '#fff',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {tarea}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}

export default App;
