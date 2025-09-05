import React, { useState, useEffect } from "react";
// Importa useNavigate para la redirección con React Router
import { useNavigate } from "react-router-dom";

// Simulación mejorada de DragDropContext con funcionalidad real
const DragDropContext = ({ children, onDragEnd }) => {
  return <div>{children}</div>;
};

const Droppable = ({ droppableId, children }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (data) {
      const { taskId, sourceDayId } = JSON.parse(data);
      // Simular el evento onDragEnd
      const mockResult = {
        draggableId: taskId,
        type: 'DEFAULT',
        source: { droppableId: sourceDayId, index: 0 },
        destination: { droppableId: droppableId, index: 0 },
        reason: 'DROP'
      };
      // Buscar el contexto padre y llamar onDragEnd
      const dragContext = document.querySelector('[data-drag-context]');
      if (dragContext && dragContext.onDragEnd) {
        dragContext.onDragEnd(mockResult);
      }
    }
  };

  return (
    <div 
      data-droppable-id={droppableId}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="min-h-[100px]"
    >
      {children({ 
        provided: { 
          innerRef: (ref) => {}, 
          placeholder: null,
          droppableProps: {
            onDragOver: handleDragOver,
            onDrop: handleDrop
          }
        }, 
        snapshot: { isDraggingOver: false } 
      })}
    </div>
  );
};

const Draggable = ({ draggableId, index, children, sourceDayId }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ 
      taskId: draggableId, 
      sourceDayId: sourceDayId 
    }));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div 
      data-draggable-id={draggableId} 
      data-index={index}
      draggable="true"
      onDragStart={handleDragStart}
      className="cursor-move"
    >
      {children({ 
        provided: { 
          innerRef: (ref) => {}, 
          draggableProps: {
            draggable: true,
            onDragStart: handleDragStart
          }, 
          dragHandleProps: {
            draggable: true,
            onDragStart: handleDragStart
          }
        }, 
        snapshot: { isDragging: false } 
      })}
    </div>
  );
};

// Función para generar IDs únicos
const generateId = () => Math.random().toString(36).substr(2, 9);

// Datos iniciales con tareas de ejemplo más profesionales
const INITIAL_DATA = {
  lunes: { 
    nombre: "Lunes", 
    tareas: [
      { id: generateId(), text: "Reunión de planificación semanal", priority: "high", time: "09:00" },
      { id: generateId(), text: "Revisar KPIs del mes anterior", priority: "medium", time: "11:30" },
      { id: generateId(), text: "Llamada con cliente principal", priority: "high", time: "15:00" }
    ] 
  },
  martes: { 
    nombre: "Martes", 
    tareas: [
      { id: generateId(), text: "Desarrollo de propuesta comercial", priority: "high", time: "10:00" },
      { id: generateId(), text: "Sesión de brainstorming equipo", priority: "medium", time: "14:00" }
    ] 
  },
  miercoles: { 
    nombre: "Miércoles", 
    tareas: [
      { id: generateId(), text: "Presentación proyecto Q4", priority: "high", time: "09:30" },
      { id: generateId(), text: "Revisión de presupuesto", priority: "medium", time: "16:00" }
    ] 
  },
  jueves: { 
    nombre: "Jueves", 
    tareas: [
      { id: generateId(), text: "Entrevistas candidatos", priority: "medium", time: "10:00" },
      { id: generateId(), text: "Análisis competencia", priority: "low", time: "15:30" }
    ] 
  },
  viernes: { 
    nombre: "Viernes", 
    tareas: [
      { id: generateId(), text: "Cierre informe semanal", priority: "high", time: "09:00" },
      { id: generateId(), text: "One-on-one con equipo", priority: "medium", time: "11:00" },
      { id: generateId(), text: "Planificación próxima semana", priority: "medium", time: "17:00" }
    ] 
  },
  sabado: { 
    nombre: "Sábado", 
    tareas: [
      { id: generateId(), text: "Formación online", priority: "low", time: "10:00" }
    ] 
  },
  domingo: { 
    nombre: "Domingo", 
    tareas: [
      { id: generateId(), text: "Preparación presentación lunes", priority: "medium", time: "19:00" }
    ] 
  },
};

const diasOrden = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

// Utilidad para obtener fechas de la semana
const getWeekDates = (startDate) => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date);
  }
  return dates;
};

// Utilidad para formatear fechas
const formatDate = (date, format = 'short') => {
  const options = {
    short: { day: 'numeric', month: 'numeric' },
    long: { day: 'numeric', month: 'long', year: 'numeric' },
    weekday: { weekday: 'long' }
  };
  return date.toLocaleDateString('es-ES', options[format]);
};

// Componente para las tareas individuales
const TaskCard = ({ tarea, onDelete, diaId }) => {
  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-50 border-red-200 text-red-800',
      medium: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      low: 'bg-green-50 border-green-200 text-green-800'
    };
    return colors[priority] || colors.medium;
  };

  const getPriorityDot = (priority) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    return colors[priority] || colors.medium;
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md 
                   transition-all duration-200 cursor-move hover:border-blue-200
                   hover:scale-[1.02] active:scale-[0.98]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {tarea.time && (
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {tarea.time}
              </span>
            )}
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${getPriorityDot(tarea.priority)}`}></div>
              <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(tarea.priority)}`}>
                {tarea.priority === 'high' ? 'Alta' : tarea.priority === 'medium' ? 'Media' : 'Baja'}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{tarea.text}</p>
          
          {/* Indicador visual de arrastrar */}
          <div className="mt-2 flex items-center gap-1 opacity-30 group-hover:opacity-60 transition-opacity">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
            </svg>
            <span className="text-xs text-gray-400">Arrastra para mover</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(diaId, tarea.id);
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                   text-red-400 hover:text-red-600 hover:bg-red-50 w-7 h-7 rounded-full
                   flex items-center justify-center text-sm font-bold shrink-0"
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Componente DayColumn mejorado con drop zone visual
const DayColumn = ({ diaId, dia, fecha, onDeleteTask, onAddTaskToDay, isToday, isWeekend, isDraggedOver }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [isDragOver, setIsDragOver] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      const newTask = {
        text: newTaskText.trim(),
        time: newTaskTime,
        priority: newTaskPriority
      };
      onAddTaskToDay(diaId, newTask);
      setNewTaskText("");
      setNewTaskTime("");
      setNewTaskPriority("medium");
      setShowAddForm(false);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    // Solo quitar el estado si realmente salimos del contenedor
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const dayClasses = `
    bg-white rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1
    ${isToday ? 'ring-2 ring-blue-500 border-blue-200 bg-blue-50/30' : 'border-gray-200'}
    ${isWeekend ? 'bg-gradient-to-br from-indigo-50/50 to-purple-50/30' : ''}
    ${isDragOver ? 'ring-2 ring-green-400 border-green-300 bg-green-50/20 shadow-2xl scale-[1.02]' : ''}
    h-full min-h-[700px]
  `;
  
  return (
    <div className={`${dayClasses} p-5 flex flex-col`}>
      {/* Header del día con fecha */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className={`font-bold text-xl ${isToday ? 'text-blue-700' : 'text-gray-800'}`}>
            {dia.nombre}
          </h3>
          <div className="flex items-center gap-2">
            {isToday && (
              <span className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                Hoy
              </span>
            )}
            {isDragOver && (
              <span className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-medium animate-pulse">
                Soltar aquí
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-600'}`}>
            {formatDate(fecha)}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
              {dia.tareas.length}
            </span>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full 
                       flex items-center justify-center hover:scale-110 transition-transform duration-200
                       shadow-lg hover:shadow-xl"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Formulario para agregar tarea */}
      {showAddForm && (
        <div className="mb-5 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div className="space-y-3">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Nueva tarea..."
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 
                         focus:border-blue-500 outline-none transition-all duration-200 text-sm"
              autoFocus
            />
            
            <div className="grid grid-cols-2 gap-2">
              <input
                type="time"
                value={newTaskTime}
                onChange={(e) => setNewTaskTime(e.target.value)}
                className="p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 
                           focus:border-blue-500 outline-none transition-all duration-200 text-sm"
              />
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                className="p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 
                           focus:border-blue-500 outline-none transition-all duration-200 text-sm"
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-3 
                           rounded-lg font-medium hover:shadow-lg transition-all duration-200 text-sm
                           transform hover:-translate-y-0.5"
              >
                Agregar
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 text-sm"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de tareas - contenedor flexible */}
      <div className="flex-1 overflow-y-auto">
        <Droppable droppableId={diaId}>
          {(provided) => (
            <div 
              ref={provided.innerRef} 
              className="space-y-3 min-h-[200px]"
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={(e) => e.preventDefault()}
            >
              {dia.tareas.map((tarea, index) => (
                <Draggable key={tarea.id} draggableId={tarea.id} index={index} sourceDayId={diaId}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard 
                        tarea={tarea} 
                        onDelete={onDeleteTask} 
                        diaId={diaId} 
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              
              {/* Zona de drop visual cuando está vacío */}
              {dia.tareas.length === 0 && isDragOver && (
                <div className="border-2 border-dashed border-green-300 rounded-xl p-8 bg-green-50/50 animate-pulse">
                  <div className="text-center text-green-600">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    <p className="text-sm font-medium">Suelta la tarea aquí</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </Droppable>

        {/* Estado vacío */}
        {dia.tareas.length === 0 && !isDragOver && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm font-medium">Sin tareas</p>
            <p className="text-xs mt-1 opacity-70">Haz clic en + para agregar</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente principal del Planner
function PlannerApp() {
  const [dias, setDias] = useState(() => INITIAL_DATA);
  const [lastMoved, setLastMoved] = useState(null);
  
  // Opción 1: Usa `useNavigate` de React Router
  // const navigate = useNavigate();

  const [currentWeek, setCurrentWeek] = useState(() => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    return startOfWeek;
  });

  // Obtener fechas de la semana actual
  const weekDates = getWeekDates(currentWeek);
  const today = new Date().toDateString();

  // Funciones de navegación
  const goToPreviousWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(newWeek.getDate() - 7);
    setCurrentWeek(newWeek);
  };

  const goToNextWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(newWeek.getDate() + 7);
    setCurrentWeek(newWeek);
  };

  const goToCurrentWeek = () => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    setCurrentWeek(startOfWeek);
  };
  
  const handleLogout = () => {
   
    
    // --- OPCIÓN 1: USANDO REACT ROUTER (Recomendado) ---
    // Limpia los datos del usuario (ej. token)
    // localStorage.removeItem('authToken');
    // Navega a la ruta de la landing page (ej. '/login' o '/')
    // navigate('/');

    // --- OPCIÓN 2: USANDO window.location (Cualquier app JS) ---
    // Establece la URL a la que quieres redirigir
    window.location.href = '/'; 
  };

  // Simulación del guardado automático
  useEffect(() => {
    console.log("Datos guardados automáticamente:", dias);
  }, [dias]);

  // Función principal de drag and drop
  const onDragEnd = (result) => {
    console.log("Drag ended:", result);
    
    const { destination, source, draggableId } = result;

    // Si no hay destino o si se suelta en el mismo lugar, no hacer nada
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    const sourceDay = source.droppableId;
    const destDay = destination.droppableId;

    // Encontrar la tarea que se está moviendo
    const taskToMove = dias[sourceDay].tareas.find(task => task.id === draggableId);
    
    if (!taskToMove) {
      console.error("Tarea no encontrada:", draggableId);
      return;
    }

    setDias(prev => {
      const newState = { ...prev };

      // Remover la tarea del día origen
      newState[sourceDay] = {
        ...prev[sourceDay],
        tareas: prev[sourceDay].tareas.filter(task => task.id !== draggableId)
      };

      // Agregar la tarea al día destino
      const destTasks = [...prev[destDay].tareas];
      destTasks.splice(destination.index, 0, taskToMove);
      
      newState[destDay] = {
        ...prev[destDay],
        tareas: destTasks
      };

      return newState;
    });

    // Mostrar notificación de movimiento exitoso
    setLastMoved({
      task: taskToMove.text,
      from: dias[sourceDay].nombre,
      to: dias[destDay].nombre
    });

    // Limpiar la notificación después de 3 segundos
    setTimeout(() => setLastMoved(null), 3000);
  };

  const handleAddTask = (diaId, taskData) => {
    const newTask = { id: generateId(), ...taskData };
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

  const totalTasks = Object.values(dias).reduce((total, dia) => total + dia.tareas.length, 0);
  const highPriorityTasks = Object.values(dias).reduce((total, dia) => 
    total + dia.tareas.filter(t => t.priority === 'high').length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      
      {/* Notificación de movimiento */}
      {lastMoved && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg 
                       animate-fade-in-down max-w-md">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-medium text-sm">Tarea movida exitosamente</p>
              <p className="text-xs opacity-90">
                "{lastMoved.task.substring(0, 30)}..." de {lastMoved.from} a {lastMoved.to}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Header profesional */}
      <header className="mb-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent mb-2">
                Planificador Semanal
              </h1>
              <p className="text-gray-600">
                {formatDate(weekDates[0], 'long')} - {formatDate(weekDates[6], 'long')}
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Estadísticas */}
              <div className="hidden lg:grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{totalTasks}</div>
                  <div className="text-xs text-gray-500">Tareas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{highPriorityTasks}</div>
                  <div className="text-xs text-gray-500">Urgentes</div>
                </div>
              </div>
              
              {/* Navegación de semana y botón de cerrar sesión */}
              <div className="flex items-center gap-2 bg-white/70 rounded-2xl p-2 shadow-lg">
                <button 
                  onClick={goToPreviousWeek}
                  className="p-2 hover:bg-white rounded-xl transition-all duration-200 text-gray-600 hover:text-blue-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={goToCurrentWeek}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
                >
                  Hoy
                </button>
                
                <button 
                  onClick={goToNextWeek}
                  className="p-2 hover:bg-white rounded-xl transition-all duration-200 text-gray-600 hover:text-blue-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Botón de cerrar sesión */}
                <button
                  onClick={handleLogout}
                  className="p-2 ml-4 text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Grid optimizado para días de la semana */}
      <div data-drag-context ref={(el) => { if (el) el.onDragEnd = onDragEnd; }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="w-full max-w-none">
            {/* Vista principal: 7 columnas en pantallas grandes */}
            <div className="hidden xl:grid xl:grid-cols-7 gap-3 min-h-[700px]">
              {diasOrden.map((diaId, index) => (
                <DayColumn
                  key={diaId}
                  diaId={diaId}
                  dia={dias[diaId]}
                  fecha={weekDates[index]}
                  isToday={weekDates[index].toDateString() === today}
                  isWeekend={diaId === "sabado" || diaId === "domingo"}
                  onDeleteTask={handleDeleteTask}
                  onAddTaskToDay={handleAddTask}
                />
              ))}
            </div>
            
            {/* Vista tablet: 5 días laborales + fin de semana separado */}
            <div className="hidden md:block xl:hidden">
              <div className="grid grid-cols-5 gap-3 mb-4">
                {diasOrden.slice(0, 5).map((diaId, index) => (
                  <DayColumn
                    key={diaId}
                    diaId={diaId}
                    dia={dias[diaId]}
                    fecha={weekDates[index]}
                    isToday={weekDates[index].toDateString() === today}
                    isWeekend={false}
                    onDeleteTask={handleDeleteTask}
                    onAddTaskToDay={handleAddTask}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {diasOrden.slice(5).map((diaId, index) => (
                  <DayColumn
                    key={diaId}
                    diaId={diaId}
                    dia={dias[diaId]}
                    fecha={weekDates[index + 5]}
                    isToday={weekDates[index + 5].toDateString() === today}
                    isWeekend={true}
                    onDeleteTask={handleDeleteTask}
                    onAddTaskToDay={handleAddTask}
                  />
                ))}
              </div>
            </div>
            
            {/* Vista móvil: 1 columna */}
            <div className="grid grid-cols-1 md:hidden gap-4">
              {diasOrden.map((diaId, index) => (
                <DayColumn
                  key={diaId}
                  diaId={diaId}
                  dia={dias[diaId]}
                  fecha={weekDates[index]}
                  isToday={weekDates[index].toDateString() === today}
                  isWeekend={diaId === "sabado" || diaId === "domingo"}
                  onDeleteTask={handleDeleteTask}
                  onAddTaskToDay={handleAddTask}
                />
              ))}
            </div>
          </div>
        </DragDropContext>
      </div>

      {/* Footer compacto */}
      <footer className="mt-8">
        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center">
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">💡 Tip:</span> Arrastra las tareas entre días para reorganizar tu semana
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Guardado automático</span>
              <span>•</span>
              <span>{new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
      </footer>
      
      {/* CSS para animaciones personalizadas */}
      <style jsx>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default PlannerApp;