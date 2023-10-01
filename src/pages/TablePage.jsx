import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

function TablePage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Cambiamos useHistory a useNavigate

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/clientes")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    // Redirigir a la página de edición con el ID del cliente
    navigate(`/edit-client/${id}`); // Cambiamos history.push a navigate
  };

  const handleAdd30Days = async (id) => {
    try {
      // Realiza la solicitud para agregar 30 días a la receta con el ID
      await axios.patch(`http://localhost:3000/api/recetas/sumar30dias/${id}`);
      fetchData(); // Refresca los datos en la tabla después de agregar 30 días
    } catch (error) {
      console.error(`Error al agregar 30 días a la receta ${id}:`, error);
    }
  };


  const handleDelete = (id) => {
    // Realizar la solicitud de eliminación del cliente y actualizar la tabla
    axios
      .delete(`http://localhost:3000/api/clientes/${id}`)
      .then(() => {
        // Actualizar la lista de clientes después de eliminar
        const updatedData = data.filter((cliente) => cliente.id !== id);
        setData(updatedData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5">
      <div>Tabla de Cliente</div>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Afiliado</th>
              <th>DNI</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.nombre}</td>
                <td>{d.apellido}</td>
                <td>{d.afiliado}</td>
                <td>{d.dni}</td>
                <td>{d.direccion}</td>
                <td>{d.telefono}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(d.id)}
                  >
                    <i className="fas fa-edit"></i> Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(d.id)}
                  >
                    <i className="fas fa-trash"></i> Borrar
                  </button>
                  <button
  className="btn btn-success"
  onClick={() => handleAdd30Days(d.id)}
>+ 30 dias</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TablePage;
