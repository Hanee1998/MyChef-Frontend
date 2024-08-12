import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RecipeDisplay = ({ recipe, selectedTitleCard, protein, style, cuisine }) => {
  const { currentUser } = useAuth();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false); // New state for save functionality
  const [likeCount, setLikeCount] = useState(recipe.likeCount);
  const navigate = useNavigate();

  useEffect(() => {
    if (recipe && currentUser) {
      setLiked(recipe.likedBy.includes(currentUser.email));
      setSaved(recipe.savedBy && recipe.savedBy.includes(currentUser.email)); // Check if recipe is already saved
    }
  }, [recipe, currentUser]);

  const handleToggleLike = async () => {
    if (!currentUser) return;

    const url = `${process.env.BACKEND_URL}/recipes/recipes/${recipe._id}/${liked ? 'unlike' : 'like'}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userEmail: currentUser.email })
      });

      if (response.ok) {
        const updatedRecipe = await response.json();
        setLiked(!liked);
        setLikeCount(updatedRecipe.likeCount);
      } else {
        const result = await response.json();
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleToggleSave = async () => {
    if (!currentUser) return;

    const url = `${process.env.BACKEND_URL}/users/${currentUser.email}/saveRecipe`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recipeId: recipe._id })
      });

      if (response.ok) {
        setSaved(!saved);
      } else {
        const result = await response.json();
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!recipe) {
    return null;
  }

  const { description, ingredients, spices, steps } = recipe;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-80 object-scale-down"
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{selectedTitleCard}</h1>
        <div className="flex items-center space-x-4">
          <button
            className="text-red-500 text-2xl transition-transform duration-300 ease-in-out transform hover:scale-125"
            onClick={handleToggleLike}
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
          </button>
          <span>{likeCount}</span>
          <button
            className="text-blue-500 text-2xl transition-transform duration-300 ease-in-out transform hover:scale-125"
            onClick={handleToggleSave}
          >
            {saved ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
      </div>
      <div className="flex space-x-2 mb-4">
        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded">{cuisine}</span>
        <span className="px-2 py-1 bg-green-200 text-green-800 rounded">{style}</span>
        <span className="px-2 py-1 bg-red-200 text-red-800 rounded">{protein}</span>
      </div>
      <h2 className="text-xl font-bold mb-2">Description</h2>
      <p className="text-gray-600 mb-4">{description}</p>

      <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
      <ul className="list-disc list-inside mb-4">
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mb-2">Spices</h3>
      <ul className="list-disc list-inside mb-4">
        {spices.map((spice, index) => (
          <li key={index}>{spice}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mb-2">Steps</h3>
      <ol className="list-decimal list-inside mb-4">
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDisplay;
