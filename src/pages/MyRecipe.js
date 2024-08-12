import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard';

const MyRecipes = () => {
  const { currentUser } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      if (currentUser) {
        try {
          const response = await fetch(`https://mychef-backend-dlbj.onrender.com/recipes/user/${currentUser.email}/recipes`);
          if (response.ok) {
            const data = await response.json();
            setRecipes(data);
          } else {
            console.error('Failed to fetch recipes');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    const fetchUserDetails = async () => {
      if (currentUser) {
        try {
          const response = await fetch(`https://mychef-backend-dlbj.onrender.com/users/${currentUser.email}`);
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.error('Failed to fetch user details');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    if (currentUser) {
      fetchRecipes();
      fetchUserDetails();
    }
  }, [currentUser]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://mychef-backend-dlbj.onrender.com/recipes/recipes/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setRecipes(recipes.filter(recipe => recipe._id !== id));
      } else {
        console.error('Failed to delete recipe');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSave = async () => {
    // Refresh recipes after saving
    const response = await fetch(`https://mychef-backend-dlbj.onrender.com/recipes/user/${currentUser.email}/recipes`);
    if (response.ok) {
      const data = await response.json();
      setRecipes(data);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h1 className="text-3xl font-bold mb-4">My Recipes</h1>
        {user && (
          <p className="text-gray-700 mb-4">Your total earnings: ${user.earnings}</p>
        )}
      </div>
      {recipes.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">No Recipes Available</h1>
          <button
            onClick={() => navigate('/addRecipes')}
            className="add-recipe-button text-white px-4 py-2 rounded-md"
          >
            Add Recipe
          </button>
        </div>
      ) : (
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onDelete={handleDelete}
            onSave={handleSave}
          />
        ))
      )}
    </div>
  );
};

export default MyRecipes;
