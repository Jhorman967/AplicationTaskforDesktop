import React from "react";
import {Data} from '../views/mainboard'

interface Props {
    data:Data
    handleDragging: (dragging: boolean) => void

}

//
export const Card = ({data, handleDragging }:Props) => {

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', `${data.id}`)
    handleDragging(true)
}
  const handleDragEnd = () => handleDragging(false)

  return (

    //data.status if === x ?   ${isDragging ? 'col-md-4 columna justify-content-around full-height':''}`}  bg-success
//{`col-md-4 justify-content-around full-height ${isDragging ? 'col-md-4 columna justify-content-around full-height':''}`}
<div className= {`card text-white  mb-3 maxw-20 card-container ${data.status === 'En Proceso' ? 'bg-success' : data.status === 'Finalizado' ? 'bg-dark' : 'bg-primary'}`}
      draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} >
  <div className="card-header">{data.titulo}</div>
  <div className="card-body">
    <h4 className="card-title">{data.titulo}</h4>
    <p className="card-text">{data.content}</p>
    <p className="fecha">{data.date.toString()}</p>
  </div>
</div>
  )

}

