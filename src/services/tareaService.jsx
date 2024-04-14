import React from "react";
import axios from "axios";
import {UseUser} from "../hooks/userContext.js";



const tareaService = () =>{

    const { userid } = UseUser();
    // const UserId = localStorage.getItem('userId')
    
    const baseURL = `http://localhost:8080/usuarios/${userid}/notas`

        
    const getAllTask = async () => {
        const response = await axios.get(baseURL);
        return response.data;
    };

    const createTask = async newObject => {
        const request = axios.post(baseURL, newObject);
        const response = await request;
        return response.data
    }

    const updateTask = (id, newObject) => {
        const request = axios.put(`${baseURL}/${id}`, newObject)
        return request.then(response => response.data)
    }

    const deleteTask = (id) => {
        const request = axios.delete(`${baseURL}/${id}`)
        console.log(request)
        console.log(request.data)
        return request.then(response => response.data)
    }
    return {
        getAllTask,
        createTask,
        updateTask,
        deleteTask,
      };
}

export default tareaService;