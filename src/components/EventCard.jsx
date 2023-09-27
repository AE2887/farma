import React, { useState } from 'react';
import './card.css'

const EventCard = ({ event }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`event-card ${expanded ? 'expanded' : ''}`}>
      
      <p>nombre:{event.nombre}</p>
      <p>Apellido: {event.apellido}</p>
      {expanded && (
        <div className="expanded-info">
          <p>DNI: {event.dni}</p>
          <p>Afiliado: {event.afiliado}</p>
          <p>Título: {event.title}</p>
          <p>Vencimiento: {event.start.toLocaleDateString()}</p>
        </div>
      )}
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Mostrar menos' : 'Leer más'}
      </button>
    </div>
  );
};

export default EventCard;
