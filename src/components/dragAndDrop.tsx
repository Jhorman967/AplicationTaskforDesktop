import React, { useState } from "react";
import { Data, Status } from "../views/mainboard";
import {ContainerCards} from "./containercards.tsx";
import { data } from '../assets/index.ts'
import { NavBar } from "./navBar.tsx";

import { ipcRenderer } from 'electron';




const typesTarea: Status[] = ['Pendientes', 'En Proceso', 'Finalizado']




export const DragAndDrop = () =>{
    const [isDragging, setIsDragging] = useState(false)
    const [listItems, setListItems] = useState<Data[]>(data)

    const user = {
        id: 1,
        email: "Prueba@gmail.com",
        nombre: "jhorman",
    }

// const registerUser = async (userData) => {
//   try {
//     const result = await ipcRenderer.invoke('registerUser', userData);
//     if (result) {
//       console.log('Usuario registrado correctamente');
//     } else {
//       console.error('Error al registrar usuario');
//     }
//   } catch (error) {
//     console.error('Error al comunicarse con el backend:', error);
//   }
// };

// registerUser(user)





    const handleDragging = (dragging: boolean) => setIsDragging(dragging)
// Evaluo el estado de la card
    const handleUpdateList = (id: number, status: Status) => {

        let card = listItems.find(item => item.id === id)
 
        if (card && card.status !== status) {
 
            card.status = status
 
            setListItems( prev => ([
                 card!,
                 ...prev.filter(item => item.id !== id)
             ]))
            
            }}

        

return(
    <div>
        <NavBar/>
    <div className="container container-fluid full-height mt-3  ">
        
        <div className="row  full-height">
            {
                typesTarea.map( container => (
                    <ContainerCards
                        status={container}
                        key={container}
                        items={listItems}
                        
                        isDragging={isDragging}
                        handleDragging={handleDragging}
                        handleUpdateList={handleUpdateList}
                    />  
                ))
            }
        </div>
    </div> 
    </div>     
)

}
