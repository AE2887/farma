import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap';

const RecipeEditModal = ({ recipe, onClose, onRecipeUpdated }) => {
  const [formData, setFormData] = useState({
    fecha_de_vencimiento: recipe.fecha_de_vencimiento,
    title: recipe.title,
  });

  // Mantén la fecha original en un estado separado
  const [originalFecha, setOriginalFecha] = useState(recipe.fecha_de_vencimiento);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para formatear la fecha en el formato "dd-mm-yyyy"
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSubmit = () => {
    // Formatear la fecha en el formato "yyyy-MM-dd"
    const formattedDate = new Date(formData.fecha_de_vencimiento);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0'); // Añadir 1 al mes ya que los meses van de 0 a 11
    const day = String(formattedDate.getDate()).padStart(2, '0');
    const formattedDateString = `${year}-${month}-${day}`;

    // Actualizar la fecha original solo cuando se envía el formulario
    setOriginalFecha(formattedDateString);

    // Hacer una solicitud PATCH para actualizar la receta
    axios
      .patch(`http://localhost:3000/api/recetas/${recipe.id}`, {
        fecha_de_vencimiento: formattedDateString,
        title: formData.title,
      })
      .then(() => {
        // Actualizar la lista de recetas después de la edición
        // Llama a la función onRecipeUpdated para actualizar la lista de recetas
        onRecipeUpdated();
        onClose();
      })
      .catch((error) => {
        console.error('Error al editar la receta', error);
      });
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Receta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Fecha de Vencimiento Actual:</Form.Label>
            <Form.Control
              type="text"
              value={formatDate(originalFecha)} // Mostrar la fecha original
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Editar Fecha de Vencimiento:</Form.Label>
            <Form.Control
              type="date"
              name="fecha_de_vencimiento"
              value={formData.fecha_de_vencimiento}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Título:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Button className="mr-5" type="submit">
            Guardar Cambios
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RecipeEditModal;
