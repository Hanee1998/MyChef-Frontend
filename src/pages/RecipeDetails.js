import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeDisplay from './RecipeDisplay';
import { useNavigate } from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/recipes/recipes/${id}`);
        if (response.ok) {
          const data = await response.json();
          setRecipe(data);
        } else {
          console.error('Failed to fetch recipe');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto mt-6">
      {recipe ? (
        <div>

        <RecipeDisplay
          recipe={recipe}
          selectedTitleCard={recipe.title}
          protein={recipe.protein}
          style={recipe.style}
          cuisine={recipe.cuisine}
        />
         <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
</div>
        
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold">Loading...</h2>
        </div>
        
      )}
    </div>
  );
};

export default RecipeDetails;
