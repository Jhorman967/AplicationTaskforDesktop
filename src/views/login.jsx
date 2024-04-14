import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import userService from "../services/userService";
import {UseUser} from "../hooks/userContext.js"


const logo = require("../images/logo-universdad.png");

export const Login = (props)=>{





  const [user, setUser] = useState([]);
  const [usuario, setUsuario] = useState({
    email:'',
    password:'',
  });

  const { username, setUsername, userid, setUserId } = UseUser();

  // const [username, setUsername] = useUser();

  const navigate = useNavigate;

  const handleChange = (evt) => {
    const {name,value} = evt.target;
    setUsuario({
      ...usuario,
      [name]:value
  })
  }


  useEffect(()=>{
    userService.
    getAllUsuario()
    .then(response => {setUser(response)
      
    }).catch(err =>{
        console.log('Im sorry but the data couldnt read', err)
    })
},[])

//check the user for matches

const handleSubmit = (event) =>{
  event.preventDefault()
  const authenticatedUSer = user.find(
    (u)=>
    u.email === usuario.email &&
    u.password === usuario.password
  );

  if(authenticatedUSer){
    console.log(authenticatedUSer.id)
    window.location.href = "#/tareas";
    setUserId(authenticatedUSer.id)
    setUsername(authenticatedUSer.name)
    localStorage.setItem("userId", authenticatedUSer.id);
    // setUsername(authenticatedUSer.id)
  }else {
    alert('usuario no existe')
  }
 
}

return (
      <div className="container d-flex justify-content-center align-items-center vh-100">

      <div className="card border-primary p-4 w-50">
        <div className="text-center mb-4">
          {/* Espacio para el logo */}
          <img src={logo}  alt="Logo" className=" img-fluid mb-3" />
          
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuarios</label>
            <input type="text" 
              className="form-control" 
              id="username" 
              placeholder="Ingrese su usuario" 
              name='email'
              value={usuario.email}
              onChange={handleChange}
              required
              />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="password ">Clave</label>
            <input type="password" 
              className="form-control" 
                id="password" 
                placeholder="Ingrese su clave" 
                name='password'
                value={usuario.password}
                onChange={handleChange}
              required
             

                />
          </div>
          <div className="d-flex justify-content-around align-items-center mt-4"> 
          <button type="submit" className="btn btn-primary btn-block  mt-4">Ingresar</button>
          <button href="#" className="btn btn-outline-info btn-block  mt-4" on>Registro</button>
          </div>
          <div className="text-center mt-3">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
        </form>
      </div>
      </div>
)
   
}

   export default Login