import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeEditModal from './RecipeEditModal'; // Asegúrate de que RecipeEditModal esté importado

const ClientRecipesList = ({ dni, afiliado }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Hacer una solicitud para obtener las recetas del cliente utilizando los parámetros dni y afiliado
    axios
      .get(`http://localhost:3000/api/recipe?dni=${dni}&afiliado=${afiliado}`)
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((error) => {
        console.error('Error al cargar las recetas del cliente', error);
      });
  }, [dni, afiliado]);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsEditing(false); // Al seleccionar una receta, establece isEditing en false para evitar solicitudes innecesarias
  };

  const handleEditClick = () => {
    setIsEditing(true); // Cuando se hace clic en el botón "Editar", establece isEditing en true
  };

  const handleRecipeUpdated = () => {
    // Hacer una solicitud para obtener las recetas actualizadas del cliente utilizando los parámetros dni y afiliado
    axios
      .get(`http://localhost:3000/api/recipe?dni=${dni}&afiliado=${afiliado}`)
      .then((res) => {
        setRecipes(res.data); // Actualiza la lista de recetas con los datos actualizados
      })
      .catch((error) => {
        console.error('Error al cargar las recetas del cliente', error);
      });
  };

  return (
    <div>
      <h3>Recetas del Cliente</h3>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} onClick={() => handleRecipeClick(recipe)}>
            {recipe.title}
          </li>
        ))}
      </ul>
      {selectedRecipe && (
        <div>
          <button onClick={handleEditClick}>Editar</button>
          <RecipeEditModal
            recipe={selectedRecipe}
            onClose={() => {
              setSelectedRecipe(null);
              setIsEditing(false);
            }}
            isEditing={isEditing}
            onRecipeUpdated={handleRecipeUpdated} // Pasa la función a RecipeEditModal
          />
        </div>
      )}
    </div>
  );
};

export default ClientRecipesList;
