import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const RecipeCardForDetails = ({ recipe }) => {
  const { currentUser } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(recipe.likeCount);

  useEffect(() => {
    if (currentUser) {
      setLiked(recipe.likedBy.includes(currentUser.email));
    }
  }, [currentUser, recipe.likedBy]);

  const handleLike = async () => {
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

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-80 object-scale-down"
        />
      )}
      <div className="flex justify-between items-center mb-2">

        <h2 className="text-2xl font-bold">{recipe.title}</h2>
        <div className="flex items-center space-x-2">
          <button
            className="text-red-500 text-2xl transition-transform duration-300 ease-in-out transform hover:scale-125"
            onClick={handleLike}
            disabled={!currentUser}
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
          </button>
          <span>{likeCount}</span>
        </div>
      </div>
      <div className="text-gray-600 mb-2">Posted by: {recipe.userEmail}</div>
      <div className="flex space-x-2 mb-4">
        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded">{recipe.cuisine}</span>
        <span className="px-2 py-1 bg-green-200 text-green-800 rounded">{recipe.style}</span>
        <span className="px-2 py-1 bg-red-200 text-red-800 rounded">{recipe.protein}</span>
      </div>
      <p className="text-gray-600 mb-4">{recipe.description}</p>
      <Link to={`/recipes/${recipe._id}`} className="text-blue-500 hover:underline">
        View All
      </Link>
    </div>
  );
};

export default RecipeCardForDetails;
