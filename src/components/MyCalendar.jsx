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

  useEffect(() => {
    // Realiza una solicitud a la API para obtener los datos de las recetas
    axios.get('http://localhost:3000/api/recipe')
      .then((response) => {
        const recetas = response.data;

        // Filtrar las recetas que coincidan con el número de DNI y afiliado de la tabla de clientes
        const filteredRecetas = recetas.filter((receta) => {
          const matchingCliente = findMatchingCliente(receta.dni, receta.afiliado);
          return !!matchingCliente; // Retorna true si se encuentra un cliente que coincide
        });

        // Crear un arreglo de eventos a partir de las recetas filtradas
        const calendarEvents = filteredRecetas.map((receta) => {
          const matchingCliente = findMatchingCliente(receta.dni, receta.afiliado);
          return {
            title: receta.title,
            start: new Date(receta.fecha_de_vencimiento),
            dni: receta.dni,
            afiliado: receta.afiliado,
            nombre: receta.nombre, // Verifica que matchingCliente tenga la propiedad nombre
            apellido: receta.apellido, // Verifica que matchingCliente tenga la propiedad apellido
          };
        });

        // Actualizar los eventos del calendario
        setEvents(calendarEvents);
      })
      .catch((error) => {
        console.error('Error al obtener datos de recetas:', error);
      });
  }, []);

  // Función para buscar un cliente que coincida con el número de DNI y afiliado
  const findMatchingCliente = (dni, afiliado) => {
    return axios.get(`http://localhost:3000/api/clientes?dni=${dni}&afiliado=${afiliado}`)
      .then((clienteResponse) => {
        return clienteResponse.data[0]; // Suponemos que hay un solo cliente con este DNI y afiliado
      })
      .catch(() => {
        console.error(`Error al obtener datos del cliente con DNI ${dni} y afiliado ${afiliado}`);
        return null;
      });
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="start"
        components={{
          event: EventCard, // Utiliza el componente EventCard como plantilla para los eventos
        }}
      />
    </div>
  );
};

/* eslint-enable */
export default MyCalendar;
