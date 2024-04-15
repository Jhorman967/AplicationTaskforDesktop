import React from "react";
import { useState } from "react";

export const ModalReact = ({children,setShowModal,titleModal,handleSubmit}) =>{
    
    const men = {
        mensaje: 'Hola desde el componente Papa',
        otraInformacion: 'Información adicional desde el Papa',
      };

    const saveData = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit()
    }

    const toggleClose = () =>{
        setShowModal(false)
    }

    return (
        <div className='modal' tabIndex={-1} role="dialog" style={{ display: 'block' }} >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{titleModal}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={toggleClose}>
                             <span aria-hidden="true">
                             </span>
                        </button>
                    </div>
                    <div className="modal-body">

                        {/* {React.cloneElement(children, {  })} */}
                        {children}

                    </div>
                    {/* <div className="modal-footer">
                        <button type="submit" className="btn btn-primary"  >Save changes</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={toggleClose}>Close</button>
                    </div> */}
                </div>
            </div>
        </div>

    )

}