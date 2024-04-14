import React from "react";
import { ModalReact } from "../components/modal";



export const NewTarea = ()=>(

  <ModalReact>

    <div className="container" >
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Agregar Tarea</h2>
            <form>
              {/* <!-- Campo Título --> */}
              <div className="form-group">
                <label for="titulo">Título:</label>
                <input type="text" className="form-control" id="titulo" placeholder="Ingrese el título de la tarea"/>
              </div>
              {/* <!-- Campo Fecha --> */}
              <div className="form-group">
                <label for="fecha">Fecha:</label>
                <input type="date" className="form-control" id="fecha"/>
              </div>
              {/* <!-- Campo Estado --> */}
              <div className="form-group">
                <label for="estado">Estado:</label>
                <select className="form-control" id="estado">
                  <option value="Pendientes">Pendiente</option>
                  <option value="En Proceso">En Progreso</option>
                  <option value="Finalizado">Realizada</option>
                </select>
              </div>
              {/* <!-- Campo Observación --> */}
              <div className="form-group">
                <label for="observacion">Observación:</label>
                <textarea className="form-control" id="observacion" rows="3" placeholder="Ingrese una observación"></textarea>
              </div>
              {/* <!-- Botón para enviar el formulario --> */}
              <button type="submit" className="btn btn-primary btn-block">Agregar Tarea</button>
            </form>
          </div>
        </div>
      </div>
      </ModalReact>
)


export default NewTarea






/* <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agregar Tarea</title>
    <link rel="stylesheet" href="https://bootswatch.com/5/materia/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css">
    <style>
    /* Estilos adicionales */
//     .form-group {
//       margin-bottom: 20px; /* Ajusta el espacio entre los campos */
//     }
//   </style>
// </head>

// </body>
// </html> */}