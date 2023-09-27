import React from 'react';
import MyCalendar from '../components/MyCalendar'; // Importa el componente del calendario

const events = [
  {
    title: 'Receta 1',
    start: new Date(2023, 8, 5), // Fecha de inicio
    end: new Date(2023, 8, 7),   // Fecha de finalización
  },
  // Más eventos aquí...
];

function App() {
  return (
    <div className="App">
      <MyCalendar events={events} />
    </div>
  );
}

export default App;
