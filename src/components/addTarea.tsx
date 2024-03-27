import React, { useState } from "react";
import { ModalReact } from "./modal.tsx";
import { data } from "../assets/index.ts";



export const AddTarea = ({setShow, men }) => {


    
  
    const [tarea, setTarea]=useState({
            titulo:'',
            date:'',
            status:'pendiente',
            content:''
        })

    const handleChange = (evt)=>{
        
        const {name, value } =evt.target;

       

       setTarea({
            ...tarea,
            [name]:value
        })   
    
        }

    const handleSubmit = () => {
        

        console.log(tarea)
        console.log(men.mensaje)
        // const [datos, setDatos]= useState(data)








    }


   

    return(

        <ModalReact setShow={setShow} titleModal={"Agregar Tarea"} handleSubmit={handleSubmit}>



        
       
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
                                      onChange={handleChange}
                                      />
                                  </div>
                                  {/* <!-- Campo Fecha --> */}
                                  <div className="form-group mt-3">
                                      <label htmlFor="date">Fecha:</label>
                                      <input type="date" 
                                      className="form-control" 
                                      id="date"
                                      name="date"
                                      value={tarea.date}
                                      onChange={handleChange}
                                      />
                                  </div>
                                  {/* <!-- Campo Estado --> */}
                                  <div className="form-group mt-3">
                                      <label htmlFor="status">Estado:</label>
                                      <select className="form-control" id="status"
                                        name="status"
                                        value={tarea.status}
                                        onChange={handleChange}
                                      >
                                        <option value="pendiente">Pendiente</option>
                                        <option value="en_progreso">En Progreso</option>
                                        <option value="cancelada">Realizada</option>
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
                                      onChange={handleChange}
                                      >

                                      </textarea>
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



