import React from "react";
import { Link } from 'react-router-dom';

const logo = require("../images/logo-universdad.png");

const Login = (props)=>(

//     <form onSubmit={props.addname} >
//        <h2>Add new Person</h2>
//        <div>
//          name: <input value={props.newname} onChange={props.readname}/>
//        </div>
//        <div>
//          Phone: <input type='phone' value={props.phnumber} onChange={props.readphone}/>
//        </div>
//        <div>
//          <button type="submit">add</button>
//        </div>
     
//    </form>
<div className="container d-flex justify-content-center align-items-center vh-100">

<div className="card border-primary p-4 w-50">
  <div className="text-center mb-4">
    {/* Espacio para el logo */}
    <img src={logo}  alt="Logo" className=" img-fluid mb-3" />
    
  </div>
  <form>
    <div className="form-group">
      <label htmlFor="username">Usuarios</label>
      <input type="text" className="form-control" id="username" placeholder="Ingrese su usuario" />
    </div>
    <div className="form-group mt-4">
      <label htmlFor="password ">Clave</label>
      <input type="password" className="form-control" id="password" placeholder="Ingrese su clave" />
    </div>
    <div className="d-flex justify-content-around align-items-center mt-4">
    <Link to='/tareas'>   
    <button type="submit" className="btn btn-primary btn-block  mt-4">Ingresar</button>
    </Link> 
    <button href="#" className="btn btn-outline-info btn-block  mt-4">Registro</button>
    </div>
    <div className="text-center mt-3">
      <a href="#">¿Olvidaste tu contraseña?</a>
    </div>
  </form>
</div>
</div>
   
   )

   export default Login