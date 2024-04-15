import React, {useState}from "react";
import { Data } from "../views/mainboard";
import tareaService from "../services/tareaService";
import {ModalConf} from './modalConfirmacion.tsx'

interface Props {
  data: Data;
  handleDragging: (dragging: boolean) => void;
}

//


export const Card = ({ data, handleDragging }: Props) => {
  const { getAllTask, createTask, updateTask, deleteTask } = tareaService();
  
  const [showModal, setShowModal] = useState(false)
  const [taskIdToDelete, setTaskIdToDelete] = useState<number | null>(null);

  // const botonEliminar = (id) => {
  //   return deleteTask(id)
  //     .then((response) => {
  //       console.log("Tarea eliminada:", response);
  //       // Puedes hacer cualquier otra acción necesaria después de eliminar la tarea
  //     })
  //     .catch((error) => {
  //       console.log("error al eliminar", error);
  //     });
  // };

    

  


  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text", `${data.id}`);
    handleDragging(true);
  };
  const handleDragEnd = () => handleDragging(false);

  const showDeleteConfirmation = (id: number) => {
    setTaskIdToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (taskIdToDelete !== null) {
      try {
        const response = await deleteTask(taskIdToDelete);
        console.log("Tarea eliminada:", response);
        // Realiza acciones adicionales si es necesario (actualizar la lista de tareas, etc.)
      } catch (error) {
        console.log("Error al eliminar la tarea:", error);
      }
    }
    setShowModal(false);
  };

  return (

    <div
      className={`card text-white  mb-3 maxw-20 card-container ${
        data.statusN === "En Proceso"
          ? "bg-success"
          : data.statusN === "Finalizado"
          ? "bg-dark"
          : "bg-primary"
      }`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="card-header  d-flex justify-content-between align-items-center">
        <h5>{data.titulo}</h5>

        <div className="d-flex justify-content-end">
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            // onClick={() => botonEliminar(data.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
            </svg>
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => showDeleteConfirmation(data.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
            </svg>
          </button>
        </div>
      </div>
      <div className="card-body">
        {/* <h4 className="card-title">{data.titulo}</h4> */}
        <p className="card-text">{data.content}</p>
        <p className="fecha">{data.date.toString()}</p>
      </div>
       {/* Modal de confirmación */}
       {showModal && (
        <ModalConf setShowModal={setShowModal} MenButton={"Eliminar"} titleModal={"Eliminar Tarea"}  handleSubmit={confirmDelete}>
            <div>
              <h5  style={{ color: 'black',  }}> Estas seguro de eliminar la tarea</h5>
            </div>
        </ModalConf>
      )}
    </div>
  );
};
