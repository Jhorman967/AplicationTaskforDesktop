import React from "react";
import axios from "axios";




const baseURL = "http://localhost:8080/usuarios"


const getAllUsuario = () =>{
    const  request = axios.get(baseURL)
    return request.then(response => response.data)
}

const createUsuario = async newObject => {
    const request = axios.post(baseURL, newObject);
    const response = await request;
    return response.data;
}

const updateUsuario = (id, newObject )=>{
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data);
}

const deleteUsuario = (id, newObject)=>{
    const request = axios.delete(`${baseURL}/${id}`)
    console.log(request); // theses is a optional data, only used for debugging
    console.log(request.data);
    return request.then(response => response)
}

export default {getAllUsuario, createUsuario, updateUsuario, deleteUsuario}

