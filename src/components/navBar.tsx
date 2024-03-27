import React from "react";
import { useState } from "react";

import { AddTarea } from "./addTarea.tsx";
import { data } from "../assets/index.ts";
import {ModalReact} from "./modal.tsx";


export const NavBar= ()=> {


  const [show, setShow] = useState(false);
  const openModal = () => {
    setShow(true)
  }




  return(
  
    <div>
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Tareas</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setShow(!show)}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`navbar-collapse collapse ${show ? 'show' : ''}`} id="navbarColor01" style={{ display: show ? 'block' : 'none' }}>
          <ul className="navbar-nav me-auto">
            {/* <li className="nav-item">
              <a className="nav-link active" href="#">Home
                <span className="visually-hidden">(current)</span>
              </a>
            </li> */}
            <li className="nav-item">
              <button className="nav-link" onClick={openModal} data-bs-toggle="modal" data-bs-target="#exampleModal">Nueva Tarea </button>

            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a> */}
              {/* <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Separated link</a>
              </div>
            </li> */}
          </ul>
          <form className="d-flex">
            <input className="form-control me-sm-2" type="search" placeholder="Search" />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
    {show && (
      <ModalReact  setShow={setShow} titleModal handleSubmit>
        <AddTarea setShow={setShow}  men />
      </ModalReact>
      
    )

    }        

  </div>
  
  

  )




}
