import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeEditModal from './RecipeEditModal'; // Crea este componente

const ClientRecipesList = ({ dni, afiliado }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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
        <RecipeEditModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
};

export default ClientRecipesList;
