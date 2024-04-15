import React from "react";
import { useState } from "react";

import { AddTarea } from "./addTarea.tsx";
import { data } from "../assets/index.ts";
import {ModalReact} from "./modal.tsx";
import {UseUser} from "../hooks/userContext.js"
import {ModalConf} from './modalConfirmacion.tsx'

export const NavBar= ({onSearch})=> {


  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalConfirm, setShowModalConfir] = useState(false)


  const openModal = () => {
    setShowModal(true)
  }
  
  const showDeleteConfirmation = () => {
    
    setShowModalConfir(true);
  };

  const { username, setUsername, userid, setUserId } = UseUser();
  const confirmLogout = () => {
    setUsername('')
    setUserId('')
    window.location.href = "#";
    setShowModal(false);
  };


const handleSearchChange = (e) => {
  const newSearchTerm = e.target.value;
  setSearchTerm(newSearchTerm)
  onSearch(newSearchTerm);
}



  return(
  
    <div>
      <nav className="navbar navbar-expand-lg bg-primary fixed-top mb-2" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" style={{ fontWeight:'bold'} } >
            {username}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShow(!show)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`navbar-collapse collapse ${show ? 'show' : ''}`} id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <button className="nav-link" onClick={openModal} data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Nueva Tarea
                </button>
              </li>
            </ul>
            <form className="d-flex mx-auto w-50" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-sm-2"
                type="search"
                placeholder="Busca tareas por título..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </form>
            <button className="btn btn-secondary" onClick={showDeleteConfirmation}>
              Salir
            </button>
          </div>
        </div>
      </nav>
      {showModal && (
      <ModalReact  setShowModal={setShowModal} titleModal handleSubmit>
        <AddTarea setShowModal={setShowModal}  men />
      </ModalReact>
      
    )}

{showModalConfirm && (
        <ModalConf setShowModal={setShowModalConfir} MenButton={"Salir"} titleModal={"Cerrar Sesión"}  handleSubmit={confirmLogout}>
            <div>
              <h5  style={{ color: 'black',  }}>Al salir, las alarmas no sonarán.<br/> <br/> 
              ¿Deseas continuar? </h5>
            </div>
        </ModalConf>
      )}

    </div>
  
   

  )




}
