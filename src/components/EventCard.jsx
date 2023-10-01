import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './card.css';
import './modal.css';
import Add30Days from '../controller/Add30Days.jsx'; // Importa el nuevo componente

const EventCard = ({ event, fetchData }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="event-card">
      <p>Nombre: {event.nombre}</p>
      <p>Apellido: {event.apellido}</p>
      <Button variant="primary" onClick={openModal}>
        Leer más
      </Button>

      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header >
          <Modal.Title>Información Detallada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Nombre:</h5>
          <p>{event.nombre}</p>
          <h5>Apellido:</h5>
          <p>{event.apellido}</p>
          <h5>DNI:</h5>
          <p>{event.dni}</p>
          <h5>Afiliado:</h5>
          <p>{event.afiliado}</p>
          <h5>Título:</h5>
          <p>{event.title}</p>
          <h5>Vencimiento:</h5>
          <p>{event.start.toLocaleDateString()}</p>

          {/* Botón para abrir el componente Add30Days */}
          <Add30Days event={event} closeModal={closeModal} fetchData={fetchData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventCard;
