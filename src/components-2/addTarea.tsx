import React, { useState } from "react";
import { ModalReact } from "./modal.tsx";
import { data } from "../assets/index.ts";
import tareaService from "../services/tareaService.jsx";
import { response } from "express";


export const AddTarea = ({setShowModal, men }) => {

    
    const { getAllTask, createTask, updateTask, deleteTask } = tareaService();
  
    const [tarea, setTarea]=useState({
            titulo:'',
            date:'',
            statusN:'Pendientes',
            content:''
        })

    const handleChange = (evt)=>{
        
        const {name, value } =evt.target;
       setTarea({
            ...tarea,
            [name]:value
        })   
        }

    const handleSubmit = async (e: React.FormEvent) => {
     
        e.preventDefault();
        console.log(tarea)
        console.log(men.mensaje)
        // const [datos, setDatos]= useState(data)

        try {
            const creartarea = await createTask(tarea);
            console.log("tarea creada correctamente", creartarea)
            setShowModal(false)
        }catch (error){
            console.log("error al crear la tarea", error)
        }
    }



   

    return(

        <ModalReact setShowModal={setShowModal} titleModal={"Agregar Tarea"} handleSubmit={handleSubmit}>



        
       
                <div className="container container-fluid" >
                              <div className="justify-content-center">
                              <div className="col-md-12">
                                 
                                  <form onSubmit={handleSubmit}>
                                  {/* <!-- Campo Título --> */}
                                  <div className="form-group mt-3">
                                      <label htmlFor="titulo">Título:</label>
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
                                      <label htmlFor="date">Fecha:</label>
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
                                Agregar Tarea
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



