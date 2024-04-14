import React, { useEffect, useState } from "react";
import { Data, Status } from "../views/mainboard";
import {ContainerCards} from "./containercards.tsx";
import { data } from '../assets/index.ts'
import { NavBar } from "./navBar.tsx";
import tareaService from "../services/tareaService.jsx";
import { Notificaciones } from "./notification.tsx";



const typesTarea: Status[] = ['Pendientes', 'En Proceso', 'Finalizado']


export const DragAndDrop = () =>{

    const { getAllTask, createTask, updateTask, deleteTask } = tareaService();
    const [isDragging, setIsDragging] = useState(false)
    const [listItems, setListItems] = useState<Data[]>([])

    const [filteredItems, setFilteredItems] = useState<Data[]>([])
    const [searchTerm, setSearchTerm] = useState("");




    //actualiza las tareas cada 5 microsegundos
    useEffect(() => {
        const intervalID = setInterval(fetchTasks, 500);
        
        fetchTasks(); 
        return () => clearInterval(intervalID); 
    }, []);

    //realiza la busqueda

   useEffect(() => {
    if (searchTerm) {
      const results = listItems.filter((item) =>
      item.titulo && item.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(results);
    } else {
      setFilteredItems(listItems);
    }
  }, [searchTerm, listItems]);


    //trae las tareas
    const fetchTasks = async  () =>{
        try {
            const tasks = await getAllTask()
            setListItems(tasks)
           
        }catch(err) {
                console.log("error al mostrar las tareas", err)
            }
        }


      
        





    const handleDragging = (dragging: boolean) => setIsDragging(dragging)
// Evaluo el estado de la card
const handleUpdateList = async (id: number, newStatus: Status) => {
    try {
        const updatedItem = await updateTask(id, { ...listItems.find(item => item.id === id), statusN: newStatus });
        const updatedList = listItems.map(item => {
            if (item.id === id) {
                return updatedItem;
            }
            return item;
        });
        setListItems(updatedList);

        // Actualizar filteredItems
        if (searchTerm) {
            const results = updatedList.filter((item) =>
                item.titulo.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredItems(results);
        } else {
            setFilteredItems(updatedList);
        }
    } catch (error) {
        console.log("Error al actualizar la tarea", error);
    }
};

        

return(
    <div>
        <NavBar onSearch={setSearchTerm}/>
    <div className="container container-fluid full-height mt-3  ">
        
        <div className="row  full-height">
            {
                typesTarea.map( container => {
                    const filterTasks = filteredItems.filter(item => item.statusN === container);
                    const sortedItems = filterTasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                    return(
                    <ContainerCards
                        status={container}
                        key={container}
                        items={sortedItems}
                        
                        isDragging={isDragging}
                        handleDragging={handleDragging}
                        handleUpdateList={handleUpdateList}
                    />  
                    )
                })
            }
        </div>
    </div> 
            <Notificaciones/>
    </div>     
)

}
