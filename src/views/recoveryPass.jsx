import React from "react";
import { useState, useEffect } from "react";
import userService from "../services/userService.jsx";
import {UseUser} from "../hooks/userContext.js"


const logo = require("../images/logo-universdad.png");

export const RecoveryPass = (props)=>{





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

  // const [username, setUsername] = useUser();



  const handleChange = (evt) => {
    const {name,value} = evt.target;
    setUsuario({
      ...usuario,
      [name]:value
  })
  }
  const [error, setError] = useState('');


//check the user for matches

const handleSubmit = async (event) => {
  event.preventDefault();

  // Verifica si las contraseñas coinciden
  if (usuario.password !== usuario.confirmPassword) {
    setShowAlert(true);
    setAlert('Las contraseñas no coinciden')
    console.log('Las contraseñas no coinciden');
    return;
  }

  // Obtiene todos los usuarios y filtra por correo electrónico
  try {
    const allUsers = await userService.getAllUsuario();
    const foundUser = allUsers.find(u => u.email === usuario.email);

    if (!foundUser) {
      setShowAlert(true);
        setAlert('No se encontró el usuario con ese correo electrónico')
      console.log('No se encontró el usuario con ese correo electrónico');
      return;
    }

    // Verifica la respuesta de seguridad
    if (foundUser.securityAnswer !== usuario.securityAnswer) {
      console.log('Respuesta de seguridad incorrecta');
      setShowAlert(true);
      setAlert('Respuesta de seguridad incorrecta')
      return;
    }

    // Si el correo y la respuesta de seguridad coinciden, actualiza la contraseña
    foundUser.password = usuario.password;
    const updatedUser = await userService.updateUsuario(foundUser.id, foundUser);
    console.log('Contraseña actualizada correctamente:', updatedUser);
    

    // Redireccionar al usuario a la página de inicio
    window.location.href = "/";
  } catch (error) {
    console.log('Error al recuperar contraseña:', error);
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
      <h2 className="text-primary">Recuperar Contraseña</h2>
    </div>
    {showAlert && (
                        <div className="alert alert-dismissible alert-danger">
                 
                  <strong>{alert}</strong> 
                        </div>
        )}
    <form onSubmit={handleSubmit}>
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
        <label htmlFor="password">Nueva Contraseña</label>
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
        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
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
        <label htmlFor="securityAnswer">Respuesta de seguridad: ¿Cómo se llama tu película favorita?</label>
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
        <button type="submit" className="btn btn-primary">Restablecer</button>
        <a  href="#" className="btn btn-outline-info btn-block  ">Cancelar</a>
      </div>
    </form>
  </div>
</div>
)
   
}

   export default RecoveryPass;