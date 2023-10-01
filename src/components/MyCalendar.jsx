/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import EventCard from './EventCard'; // Importa el componente de la tarjeta de evento

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    try {
      const [recipesResponse, clientsResponse] = await Promise.all([
        axios.get('http://localhost:3000/api/recipe'),
        axios.get('http://localhost:3000/api/clientes')
      ]);

      const recetas = recipesResponse.data;
      const clientes = clientsResponse.data;

      const calendarEvents = recetas.map((receta) => {
        const matchingCliente = clientes.find((cliente) => {
          return cliente.dni === receta.dni && cliente.afiliado === receta.afiliado;
        });

        return {
          id: receta.id,
          title: receta.title,
          start: new Date(receta.fecha_de_vencimiento),
          dni: receta.dni,
          afiliado: receta.afiliado,
          nombre: matchingCliente ? matchingCliente.nombre : '',
          apellido: matchingCliente ? matchingCliente.apellido : '',
        };
      });

      setEvents(calendarEvents);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Solo necesitas un useEffect, no es necesario anidarlos

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="start"
        components={{
          event: (eventProps) => <EventCard {...eventProps} fetchData={fetchData} />, // Pasa la función como prop
        }}
      />
    </div>
  );
};

/* eslint-enable */
export default MyCalendar;
