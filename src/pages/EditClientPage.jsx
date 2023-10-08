import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import { Row, Col, Form, Button } from 'react-bootstrap';
import ClientRecipesList from '../controller/ClientRecipesList';

const EditClientPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    afiliado: '',
    dni: '',
    direccion: '',
    telefono: '',
  });

  const [showErrorToast, setShowErrorToast] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/clientes/${id}`)
      .then((res) => setFormData(res.data))
      .catch();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Convierte los valores a números enteros
    const afiliadoValue = parseInt(formData.afiliado, 10); // Añade la base 10 como segundo argumento
    const dniValue = parseInt(formData.dni, 10); // Añade la base 10 como segundo argumento
    const telValue = parseInt(formData.telefono, 10); // Añade la base 10 como segundo argumento
  
    // Crea un nuevo objeto formDataWithNumbers con los valores convertidos a números
    const formDataWithNumbers = {
      ...formData,
      afiliado: afiliadoValue,
      dni: dniValue,
      telefono: telValue,
    };
  
    // Verifica si se han realizado cambios en algún campo
    const hasChanges = Object.keys(formDataWithNumbers).some(key => formData[key] !== formDataWithNumbers[key]);
  
    if (hasChanges) {
      // Si hay cambios, realiza una solicitud PATCH
      axios.patch(`http://localhost:3000/api/clientes/${id}`, formDataWithNumbers)
        .then(() => {
          navigate('/table');
        })
        .catch(() => {
          setShowErrorToast(true);
        });
    } else {
      // Si no hay cambios, realiza una solicitud POST
      axios.post(`http://localhost:3000/api/clientes`, formDataWithNumbers)
        .then(() => {
          navigate('/table');
        })
        .catch(() => {
          setShowErrorToast(true);
        });
    }
  };
  
  
  return (
    <div className="container mt-5">
      <h2>Editar Cliente</h2>
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
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
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
  <Form.Label>afiliado</Form.Label>
  <Form.Control
    type="number" // Cambia el tipo de input a number
    name="afiliado"
    value={formData.afiliado}
    onChange={handleChange}
  />
</Form.Group>
<Form.Group className="mb-3">
  <Form.Label>dni</Form.Label>
  <Form.Control
    type="number" // Cambia el tipo de input a number
    name="dni"
    value={formData.dni}
    onChange={handleChange}
  />
</Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>direccion</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" className="btn btn-primary">Guardar Cambios</Button>
          </Form>
        </Col>
        <Col md={6}>
          <ClientRecipesList clientId={id} />
        </Col>
      </Row>
    </div>
  );
};

export default EditClientPage;
