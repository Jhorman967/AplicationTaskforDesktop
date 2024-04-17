import React from "react";
import { useState, useEffect } from "react";
import userService from "../services/userService.jsx";
import {UseUser} from "../hooks/userContext.js"


const logo = require("../images/logo-universdad.png");

export const Registre = (props)=>{





  const [user, setUser] = useState([]);
  const [usuario, setUsuario] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    securityAnswer: '',
  });

  const { username, setUsername, userid, setUserId } = UseUser();




  const [showAlert, setShowAlert] = useState(false)
  const [alert, setAlert] = useState('')


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

const handleSubmit = async (event) => {
  event.preventDefault();

  // Verifica si las contraseñas coinciden
  if (usuario.password !== usuario.confirmPassword) {
    setShowAlert(true);
        setAlert('Las contraseñas no coinciden')
    return;
  }

  // Verifica si el usuario ya está registrado
  const userExists = user.some(u => u.email === usuario.email);
  if (userExists) {
    setShowAlert(true);
    setAlert('El usuario ya está registrado');
    return;
  }

  // Registrar al nuevo usuario
  try {
    const nuevoUsuario = await userService.createUsuario(usuario);
    console.log('Usuario registrado correctamente:', nuevoUsuario);

    // Actualiza el contexto de usuario
    setUserId(nuevoUsuario.id);
    setUsername(nuevoUsuario.name);
  

    // Navega a la página de tareas
    window.location.href = "#/";
  } catch (error) {
    console.log('Error al registrar usuario:', error);
    setShowAlert(true);
    setAlert('Error al registrar usuario:', error)
    
  }
};
useEffect(()=>{
  if(showAlert){
    setTimeout(() => {
      setShowAlert(false);
  }, 1300); // 10000 milisegundos = 10 segundos
  }
  
})

return (
  <div className="container d-flex justify-content-center align-items-center vh-100">
  <div className="card border-primary shadow-lg p-4 w-50">
    <div className="text-center mb-4">
      <img src={logo} alt="Logo" className="img-fluid mb-3" style={{ width: "150px", height: "auto" }} />
      <h2 className="text-primary">Registro</h2>
    </div>
    {showAlert && (
                        <div className="alert alert-dismissible alert-danger">
                 
                  <strong>{alert}</strong> 
                        </div>
        )}
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input type="text"
          className="form-control"
          id="name"
          placeholder="Ingrese su nombre"
          name="name"
          value={usuario.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Correo</label>
        <input type="email"
          className="form-control"
          id="email"
          placeholder="Ingrese su correo"
          name="email"
          value={usuario.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Clave</label>
        <input type="password"
          className="form-control"
          id="password"
          placeholder="Ingrese su clave"
          name="password"
          value={usuario.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirmar Clave</label>
        <input type="password"
          className="form-control"
          id="confirmPassword"
          placeholder="Repita su contraseña"
          name="confirmPassword"
          value={usuario.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="securityAnswer">Pregunta de seguridad: ¿Cómo se llama tu película favorita?</label>
        <input type="text"
          className="form-control"
          id="securityAnswer"
          placeholder="Ejemplo: Titanic"
          name="securityAnswer"
          value={usuario.securityAnswer}
          onChange={handleChange}
          required
        />
      </div>
      <div className="d-flex justify-content-around align-items-center mt-4">
        <button type="submit" className="btn btn-primary">Registrar</button>
        <a  href="#" className="btn btn-outline-info btn-block  ">Cancelar</a>
      </div>
    </form>
  </div>
</div>
)
   
}

   export default Registre;