import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'font-awesome/css/font-awesome.min.css';
import { format } from 'date-fns';
import '../components/recipe-card.css';

const AddRecipePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dni: '',
    afiliado: '',
    fecha_de_vencimiento: new Date(),
    title: '',
  });

  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false); // Nuevo estado para el toast de éxito

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      fecha_de_vencimiento: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const afiliadoValue = parseInt(formData.afiliado);
    const dniValue = parseInt(formData.dni);

    if (isNaN(afiliadoValue) || isNaN(dniValue)) {
      setShowErrorToast(true);
      return;
    }

    const formattedDate = format(formData.fecha_de_vencimiento, 'yyyy-MM-dd');

    axios
      .post('http://localhost:3000/api/recetas', {
        ...formData,
        fecha_de_vencimiento: formattedDate,
      })
      .then(() => {
        // Cuando la solicitud se complete con éxito, muestra el toast de éxito y redirige
        setShowSuccessToast(true);
        setTimeout(() => {
          setShowSuccessToast(false);
          navigate('/table'); // Redirige después de mostrar el toast
        }, 3000); // Cierra el toast de éxito después de 3 segundos
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Receta</h2>
      <form onSubmit={handleSubmit}>
        <Toast
          onClose={() => setShowErrorToast(false)}
          show={showErrorToast}
          delay={3000}
          autohide
          
          style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
          }}
        >
          <Toast.Header>
            <strong className="mr-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>Los campos 'afiliado' y 'dni' deben ser números enteros.</Toast.Body>
        </Toast>

        <Toast
          onClose={() => setShowSuccessToast(false)}
          show={showSuccessToast} // Muestra el toast de éxito cuando sea true
          delay={3000}
          autohide
          className="toast-success"
          style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
          }}
        >
          <Toast.Header>
            <strong className="mr-auto">Éxito</strong>
          </Toast.Header>
          <Toast.Body>Receta guardada exitosamente.</Toast.Body>
        </Toast>

        <div className="mb-3">
          <label htmlFor="dni" className="form-label">DNI</label>
          <input
            type="text"
            className="form-control"
            id="dni"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="afiliado" className="form-label">Afiliado</label>
          <input
            type="text"
            className="form-control"
            id="afiliado"
            name="afiliado"
            value={formData.afiliado}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="fecha_de_vencimiento" className="form-label me-2">Fecha de Vencimiento</label>
          <DatePicker
            id="datepicker"
            selected={formData.fecha_de_vencimiento}
            onChange={handleDateChange}
            dateFormat="dd-MM-yyyy"
            className="form-control flex-grow-1"
          />
          <i
            className="m-1 fa fa-calendar cursor-pointer"
            onClick={() => document.getElementById('datepicker').click()}
          ></i>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar Receta</button>
      </form>
    </div>
  );
};

export default AddRecipePage;
