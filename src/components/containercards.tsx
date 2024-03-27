import React from "react";
import {Data, Status } from "../views/mainboard";
import {Card} from "./card.tsx";

interface Props {
    items: Data[]
    status: Status
    isDragging: boolean
    handleDragging: (dragging: boolean) => void
    handleUpdateList: (id: number, status: Status) => void

}
export const ContainerCards = ({ items=[], status, isDragging,  handleDragging,handleUpdateList}: Props) =>{
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const id = +e.dataTransfer.getData('text')
        handleUpdateList(id, status)
        handleDragging(false)
    }
return(
    <div className={`col-md-4 justify-content-around full-height ${isDragging ? 'col-md-4 columna justify-content-around full-height':''}`}
    onDragOver={handleDragOver}
    onDrop={handleDrop}
    >
        <div className="column-container full-height" >
                <h2 className="text-center mt-3">{status}</h2>
                {
                    items.map(item => (
                        status === item.status &&
                        <Card
                         data={item}
                         key={item.id}
                         handleDragging={handleDragging}
                        />

                    ))
                }
        </div>
    </div>
)

}
