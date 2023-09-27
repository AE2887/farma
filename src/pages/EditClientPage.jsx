import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Toast from 'react-bootstrap/Toast'

const EditClientPage = () => {
  const navigate = useNavigate(); // Inicializa useNavigate
  const { id } = useParams(); // Obtener el ID del cliente de la URL
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    afiliado: '',
    dni: '',
    direccion: '',
    telefono: '',
  });

   // Agregamos un estado para controlar la visibilidad del Toast de error
   const [showErrorToast, setShowErrorToast] = useState(false);

   useEffect(() => {
    axios.get(`http://localhost:3000/api/clientes/${id}`)
      .then((res) => setFormData(res.data))
      .catch() ;
  }, [id]);

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
    const telValue = parseInt(formData.telefono);

    if (isNaN(afiliadoValue) || isNaN(dniValue) || isNaN(telValue)) {
      // Mostramos el Toast de error
      setShowErrorToast(true);
      return;
    }

    axios.patch(`http://localhost:3000/api/clientes/${id}`, formData)
      .then(() => {
        navigate('/table');
      })
      .catch(() => {
        // Mostramos el Toast de error en lugar de solo registrarlo en la consola
        setShowErrorToast(true);
        // console.error(err); // Registra el error en la consola para fines de depuración
      });
  };


  return (
    <div className="container mt-5">
      <h2>Editar Cliente</h2>
      <form onSubmit={handleSubmit}>
          {/* Toast de error */}
          <Toast
          onClose={() => setShowErrorToast(false)}
          show={showErrorToast}
          delay={3000} // Duración en milisegundos que el Toast se mostrará
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
          <label htmlFor="afiliado" className="form-label">afiliado</label>
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
          <label htmlFor="dni" className="form-label">dni</label>
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
          <label htmlFor="direccion" className="form-label">direccion</label>
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
          <label htmlFor="telefono" className="form-label">Telefono</label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditClientPage;
