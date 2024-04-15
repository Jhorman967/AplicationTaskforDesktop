import React, { useState, useEffect, useRef } from "react";
import tareaService from "../services/tareaService"; // Importar el servicio para obtener tareas



export const Notificaciones = () => {
    const [notificaciones, setNotificaciones] = useState<Array<{ title: string; observation: string }>>([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const { getAllTask, createTask, updateTask, deleteTask } = tareaService();
   
    // useEffect para obtener las tareas y filtrar las notificaciones
    useEffect(() => {
        const obtenerTareas = async () => {
            const tareas = await getAllTask(); // Obtener todas las tareas
            const now = new Date(); // Obtener la fecha y hora actuales
           
            const notificacionesFiltradas = tareas.filter(tarea => {
                const tareastring = tarea.date
                const tareaDate = new Date(tareastring); // Convertir la fecha y hora de la tarea
                // Comparar con la fecha y hora actual
        
                return tareaDate.getFullYear() === now.getFullYear() &&
                       tareaDate.getMonth() === now.getMonth() &&
                       tareaDate.getDate() === now.getDate() &&
                       tareaDate.getHours() === now.getHours() &&
                       tareaDate.getMinutes() === now.getMinutes();
                       
            });
            const nuevasNotificaciones = notificacionesFiltradas.map(tarea => ({
              title: tarea.titulo,
              observation: tarea.content // Cambia `observation` a `content` si ese es el nombre correcto
          }));

            // Si hay notificaciones filtradas, actualizar el estado
             // Si hay nuevas notificaciones, actualiza el estado
             if (nuevasNotificaciones.length > 0) {
              setNotificaciones(nuevasNotificaciones);
              setShowNotifications(true);
    
            }
            notificacionesFiltradas.forEach((notificacion) => {
                    
                        new Notification(notificacion.titulo, {
                            body: notificacion.content,
                            // icon: "ruta/al/icono.png" // Agrega un icono si tienes uno
                        });
                    
            
        })
    
    
  };

        // Llamar a la función para obtener las tareas
        obtenerTareas();

        // Configurar el intervalo para actualizar cada minuto
        const intervalo = setInterval(() => {
            obtenerTareas();
        }, 30000); // 60000 ms = 1 minuto

        // Limpiar el intervalo cuando el componente se desmonte
        return () => {
            clearInterval(intervalo);
        };
    }, []);

    // useEffect para desactivar las notificaciones después de un tiempo específico
    useEffect(() => {
        if (showNotifications) {
            const timeoutId = setTimeout(() => {
                setShowNotifications(false);
            }, 20000); // Desactiva después de 5 segundos

            // Limpiar el timeout cuando el estado cambie
            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [showNotifications]);

    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
            {showNotifications && notificaciones.map((notificacion, index) => (
                <div key={index} className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
            
                        {/* Personaliza según tus necesidades */}
                        <strong className="me-auto">{notificacion.title}</strong>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => setShowNotifications(false)}
                        />
                    </div>
                    <div className="toast-body">
                        {notificacion.observation}
                    </div>
                </div>
            ))}
        </div>
    );
};

