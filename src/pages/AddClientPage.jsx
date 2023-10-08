import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';

const AddClientPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    afiliado: '',
    dni: '',
    direccion: '', // Puede ser nulo o en blanco
    telefono: '', // Puede ser nulo o en blanco
  });

  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const afiliadoValue = parseInt(formData.afiliado);
    const dniValue = parseInt(formData.dni);

    // Verifica si los campos afiliado y dni son números enteros
    if (isNaN(afiliadoValue) || isNaN(dniValue)) {
      setShowErrorToast(true);
      return;
    }

    // Realiza la solicitud POST para agregar un nuevo cliente
    axios
      .post('http://localhost:3000/api/clientes', formData)
      .then(() => {
        // Redirige a la página de tabla después de agregar el cliente
        navigate('/table');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Cliente</h2>
      <form onSubmit={handleSubmit}>
        {/* Toast de error */}
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

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            name="apellido"
            value={formData.apellido}
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
          <label htmlFor="direccion" className="form-label">Dirección (opcional)</label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono (opcional)</label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar Cliente</button>
      </form>
    </div>
  );
};

export default AddClientPage;
