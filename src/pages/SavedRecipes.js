import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import RecipeDisplay from './RecipeDisplay';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const SavedRecipes = () => {
  const { currentUser } = useAuth();
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (currentUser) {
        try {
          const response = await fetch(`https://mychef-backend-dlbj.onrender.com/users/${currentUser.email}/savedRecipes`);
          if (response.ok) {
            const data = await response.json();
            setSavedRecipes(data);
          } else {
            console.error('Failed to fetch saved recipes');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchSavedRecipes();
  }, [currentUser]);

  if (!savedRecipes.length) {
    return <div className="text-center">No saved recipes found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h1 className="text-3xl font-bold mb-6">Saved Recipes</h1>
      {savedRecipes.map((recipe) => (
        <div key={recipe._id} className="mb-4">
      
         <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
         {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-80 object-scale-down"
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{recipe.title}</h1>
        <div className="flex items-center space-x-4">
        
        </div>
      </div>
      <div className="flex space-x-2 mb-4">
        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded">{recipe.cuisine}</span>
        <span className="px-2 py-1 bg-green-200 text-green-800 rounded">{recipe.style}</span>
        <span className="px-2 py-1 bg-red-200 text-red-800 rounded">{recipe.protein}</span>
      </div>
      <h2 className="text-xl font-bold mb-2">Description</h2>
      <p className="text-gray-600 mb-4">{recipe.description}</p>

      <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mb-2">Spices</h3>
      <ul className="list-disc list-inside mb-4">
        {recipe.spices.map((spice, index) => (
          <li key={index}>{spice}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mb-2">Steps</h3>
      <ol className="list-decimal list-inside mb-4">
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
        </div>
      ))}
    </div>
  );
};

export default SavedRecipes;
