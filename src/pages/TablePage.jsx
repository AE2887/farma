import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';


function TablePage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // Obtén la lista de clientes
      const clientsResponse = await axios.get("http://localhost:3000/api/clientes");
      const clientsData = clientsResponse.data;

      // Para cada cliente, obtén sus recetas utilizando el nuevo controlador
      const clientsWithRecipes = await Promise.all(
        clientsData.map(async (client) => {
          const recipesResponse = await axios.get("http://localhost:3000/api/recipes-by-client", {
            params: {
              dni: client.dni,
              afiliado: client.afiliado,
            },
          });
          const recipesData = recipesResponse.data;
          
          // Combina los datos del cliente y sus recetas
          return {
            ...client,
            recetas: recipesData.recetas,
          };
        })
      );

      setData(clientsWithRecipes);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Llama a fetchData en useEffect para cargar los datos iniciales
  }, []);
  
  const handleEdit = (id) => {
    navigate(`/edit-client/${id}`);
  };

  const handleAdd30Days = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/recetas/sumar30dias/${id}`);
      fetchData();
    } catch (error) {
      console.error(`Error al agregar 30 días a la receta ${id}:`, error);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/clientes/${id}`)
      .then(() => {
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
              <th>Vencimiento</th> {/* Nueva columna para la fecha de vencimiento */}
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
      <td>
        {/* Verificar si recetas está definido antes de usar map */}
        {d.recetas ? (
          d.recetas.map((receta, j) => (
            <div key={j}>
              {/* Formatear la fecha antes de mostrarla */}
              {format(new Date(receta.fecha_de_vencimiento), 'dd/MM/yyyy')}
            </div>
          ))
        ) : (
          <div>Sin recetas</div>
        )}
      </td>
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
        >
          + 30 días
        </button>
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
