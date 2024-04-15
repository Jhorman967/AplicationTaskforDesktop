// import React from "react";
// import { useEffect, useState } from "react";
// import tareaService from "../services/tareaService.jsx";

// export const Notifi = () => {

//     const [notificacion, setNotificacion] = useState<Array<{title: string; observacion: string }>>([]);
//     const [showNotifications, setShowNotifications] = useState(false);
//     const { getAllTask, createTask, updateTask, deleteTask } = tareaService();
//     //vamos a obtener las tareas y retornarlas

//     useEffect(() => {
//         const obtenerTareas = async () => {
//             const tareas = await getAllTask();

//             //guardar el minuto actual
//             const now = new Date();

//             //ahora vamos a recorrer los datos y comparar con el minuto actual

//             const notificaciones =  tareas.filter(tarea =>{
//                 const dateString = tarea.date
//                 const tareaDate = new Date(dateString)

//                 if (tareaDate.getFullYear() === now.getFullYear() &&
//                         tareaDate.getMonth() === now.getMonth() &&
//                         tareaDate.getDate() === now.getDate() &&
//                         tareaDate.getHours() === now.getHours() &&
//                         tareaDate.getMinutes() === now.getMinutes()) {

//                     const datosNoti = {title: tarea.titulo, observacion: tarea.content}

//                     setNotificacion([datosNoti])
                  
//                 }
//                 //mostrar notificaciones
//                 if (notificaciones.length > 0){
//                     setShowNotifications(true)
//                 }

//             } )
          
//         }

//         //obtenemos las tareas
//         obtenerTareas()
//         //repetimos el proceso
//         const intervalo = setInterval(() => {
//             obtenerTareas();
//         },30000) // 30sg

//         return () => {
//             clearInterval(intervalo)
//         };

//     },[])

//     //aqui desactivamos la notificacion al darle click algun boton




//     return (

//         <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
//             {showNotifications && notificacion.map((notificacion, index) => (
//                 <div key={index} className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
//                     <div className="toast-header">
//                         {/* Personaliza según tus necesidades */}
//                         <strong className="me-auto">{notificacion.title}</strong>
//                         <button
//                             type="button"
//                             className="btn-close"
//                             aria-label="Close"
//                             onClick={() => setShowNotifications(false)}
//                         />
//                     </div>
//                     <div className="toast-body">
//                         {notificacion.observacion}
//                     </div>
//                 </div>
//             ))}
//         </div>

//     )



// }