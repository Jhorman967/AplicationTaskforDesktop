import React from "react";
import { useState  } from "react";
import { AddTarea } from "./addTarea.tsx";
import { ModalReact } from "./modal.tsx";




export const  Boton = () => {
 const [show, setShow] = useState(false);






    return(
        <div className="container container-fluid full-height mt-3 ">
             <button type="submit" className="btn btn-primary btn-block  mt-4">modal</button>      
        </div>
    )

}
