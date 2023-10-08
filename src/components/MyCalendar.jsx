import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import EventCard from './EventCard';
import '../components/event.css'

// Importa los localizadores que necesites (moment, globalize, date-fns, dayjs)
import { momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configura el localizador de Moment en español
moment.locale('es');

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    try {
      const [recipesResponse, clientsResponse] = await Promise.all([
        axios.get('http://localhost:3000/api/recipe'),
        axios.get('http://localhost:3000/api/clientes'),
      ]);

      const recetas = recipesResponse.data;
      const clientes = clientsResponse.data;

      const calendarEvents = recetas.map((receta) => {
        const matchingCliente = clientes.find((cliente) => {
          return cliente.dni === receta.dni && cliente.afiliado === receta.afiliado;
        });

        // Establece la fecha de inicio como la fecha de vencimiento del mismo día
        const startDate = new Date(receta.fecha_de_vencimiento);
        startDate.setHours(0, 0, 0, 0);

        // Establece la fecha de finalización como el final del día de la fecha de vencimiento
        const endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);

        return {
          id: receta.id,
          title: receta.title,
          start: startDate,
          end: endDate,
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
  }, []);

  const eventWrapper = ({ event, children }) => (
    <div className="event-wrapper">{children}</div>
  );

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={['month', 'week', 'day']} // Agregamos las vistas deseadas
        defaultView="month"
        components={{
          event: (eventProps) => (
            <div className="event-card-container">
              <EventCard {...eventProps} fetchData={fetchData} />
            </div>
          ),
          eventWrapper,
        }}
        // Configuramos textos en español
        messages={{
          today: 'Hoy',
          next: 'Siguiente',
          previous: 'Anterior',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          agenda: 'Agenda',
          date: 'Fecha',
          time: 'Hora',
        }}
      />
    </div>
  );
};

export default MyCalendar;
