import React, { useState } from 'react';
import axios from 'axios';

const RecipeEditModal = ({ recipe, onClose }) => {
  const [formData, setFormData] = useState({
    fecha_de_vencimiento: recipe.fecha_de_vencimiento,
    title: recipe.title,
    // Otros campos de edición de recetas
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Hacer una solicitud PATCH para actualizar la receta
    axios
      .patch(`http://localhost:3000/api/recetas/${recipe.id}`, formData)
      .then(() => {
        // Actualizar la lista de recetas después de la edición
        // Puedes hacer esto pasando una función desde el componente padre (ClientRecipesList)
        onClose();
      })
      .catch((error) => {
        console.error('Error al editar la receta', error);
      });
  };

  return (
    <div>
      <h3>Editar Receta</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fecha_de_vencimiento">Fecha de Vencimiento:</label>
          <input
            type="date"
            name="fecha_de_vencimiento"
            value={formData.fecha_de_vencimiento}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        {/* Otros campos de edición de recetas */}
        <button type="submit">Guardar Cambios</button>
        <button onClick={onClose}>Cerrar</button>
      </form>
    </div>
  );
};

export default RecipeEditModal;
