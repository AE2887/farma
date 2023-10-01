import React, { useState } from 'react';
import axios from 'axios';

const Add30Days = ({ event, closeModal, fetchData }) => {
  const sumar30Dias = async () => {
    if (!event.id) {
      console.error('ID de la receta no definido en el evento.');
      return;
    }

    try {
      // Realiza la solicitud PATCH al servidor para sumar 30 días
      await axios.patch(`http://localhost:3000/api/recetas/sumar30dias/${event.id}`);

      // Cierra el modal después de actualizar la fecha
      closeModal();

      // Refresca el calendario haciendo una nueva solicitud para obtener los eventos actualizados
      fetchData(); // Debes definir la función fetchData para obtener los eventos nuevamente
    } catch (error) {
      console.error('Error al sumar 30 días:', error);
    }
  };

  return (
    <div>
      <h3>¿Deseas sumar 30 días a esta receta?</h3>
      <button onClick={sumar30Dias}>Sí</button>
      <button onClick={closeModal}>No</button>
    </div>
  );
};

export default Add30Days;
