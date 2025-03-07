import React from 'react'
import { useNavigate } from 'react-router-dom';
import { usePostStore } from '../store/zustandStore';


export const Detalle = () => {

    const navigate = useNavigate();
    const { elementoSeleccionado } = usePostStore();
  
    if (!elementoSeleccionado) {
      return <p>No se ha seleccionado ningún elemento.</p>;
    }
  return (
    <div>
      <h1>Detalle del Elemento</h1>
      <p>ID: {elementoSeleccionado.id}</p>
      <p>Nombre: {elementoSeleccionado.nombre}</p>
      <button onClick={() => navigate('/')}>Volver al Listado</button>
    </div>
  )
}
