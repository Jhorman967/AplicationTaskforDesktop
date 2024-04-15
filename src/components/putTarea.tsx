import React, { useEffect, useState } from "react";
import { ModalReact } from "./modal.tsx";
import { data } from "../assets/index.ts";
import tareaService from "../services/tareaService.jsx";
import { response } from "express";
import { Data} from "../views/mainboard";




export const PutTarea = ({setShowModal,  idTarea}) => {

    
    const { getAllTask, createTask, updateTask, deleteTask } = tareaService();
    const [listItems, setListItems] = useState<Data[]>([])

    const [tarea, setTarea]=useState({
            titulo:"",
            date:'',
            statusN:'',
            content:''
        })


    //VAMOS A OBTENER TODAS LAS TAREAS Y FILTRAR LA TAREA QUE NOS INTERESA PARA GUARDAR SUS DATOS 
    useEffect(() => {
        const fetchTarea = async () => {
          try {
            const tasks = await getAllTask();
            const tareaEncontrada = tasks.find((item) => item.id === idTarea);
            if (tareaEncontrada) {
              setTarea({
                titulo: tareaEncontrada.titulo,
                date: tareaEncontrada.date,
                statusN: tareaEncontrada.statusN,
                content: tareaEncontrada.content,
              });
            }
          } catch (err) {
            console.log("Error al cargar la tarea:", err);
          }
        };
    
        fetchTarea();
      }, [idTarea]);
        
      const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = evt.target;
        setTarea({
          ...tarea,
          [name]: value
        });
      };
    

        




      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tareaActualizada = await updateTask(idTarea, tarea);
            console.log("Tarea actualizada correctamente:", tareaActualizada);
            setShowModal(false);
        } catch (error) {
            console.log("Error al actualizar la tarea:", error);
        }
    };

   

    return(

        <ModalReact setShowModal={setShowModal} titleModal={"Actualizar Tarea"} handleSubmit={handleSubmit}>



        
       
                <div className="container container-fluid" >
                              <div className="justify-content-center">
                              <div className="col-md-12">
                                 
                                  <form onSubmit={handleSubmit}>
                                  {/* <!-- Campo Título --> */}
                                  <div className="form-group mt-3">
                                      <label htmlFor="titulo" style={{ color: "black" }}>Título:</label>
                                      <input 
                                      type="text" 
                                      className="form-control" 
                                      id="titulo" 
                                      placeholder="Ingrese el título de la tarea"
                                      name="titulo"
                                      value={tarea.titulo}
                                      required
                                      onChange={handleChange}
                                      
                                      />
                                  </div>
                                  {/* <!-- Campo Fecha --> */}
                                  <div className="form-group mt-3">
                                      <label htmlFor="date">Fecha y hora de recordatorio:</label>
                                      <input type="datetime-local" 
                                      
                                      className="form-control" 
                                      id="date"
                                      name="date"
                                      required
                                      value={tarea.date}
                                      onChange={handleChange}
                                      
                                      />
                                  </div>
                                  {/* <!-- Campo Estado --> */}
                                  <div className="form-group mt-3">
                                      <label htmlFor="status">Estado:</label>
                                      <select className="form-control" id="status"
                                    
                                        name="statusN"
                                        value={tarea.statusN}
                                        required
                                        onChange={handleChange}
                                      >
                                        
                                        <option value="Pendientes">Pendientes</option>
                                        <option value="En Proceso">En Progreso</option>
                                        <option value="Finalizado">Realizada</option>
                                      </select>
                                  </div> 
                                  {/* <!-- Campo Observación --> */}
                                  <div className="form-group mt-3">
                                      <label htmlFor="content">Observación:</label>
                                      <textarea className="form-control" id="content" 
                                      rows={3} 
                                      placeholder="Ingrese una observación"
                                      name="content"
                                      value={tarea.content}
                                      required
                                      onChange={handleChange}
                                      >

                                      </textarea>
                                  </div>
                                  <hr />
                                  <div className="text-end">
                            <button type="submit" className="btn btn-primary">
                                Actualizar Tarea
                            </button>
                        </div>

                               
                                  {/* <!-- Botón para enviar el formulario --> */} 
                                   {/* <button type="submit" className="btn btn-primary btn-block">Agregar Tarea</button> */}
                                  </form>
                              
                              </div>
                              </div>
                          </div>          
        </ModalReact>


    )

} 



