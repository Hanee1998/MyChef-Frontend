import React, { useEffect, useState } from 'react';
import RecipeCardForDetails from './RecipeCardForDetails';
import { useAuth } from '../context/AuthContext';

const UserRecipes = () => {
  const { currentUser } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`https://mychef-backend-dlbj.onrender.com/recipes/recipes`);
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          console.error('Failed to fetch recipes');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <h1 className="text-3xl font-bold mb-6">All Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.length === 0 ? (
          <div className="col-span-3 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold">No Recipes Available</h2>
          </div>
        ) : (
          recipes.map((recipe) => (
            <RecipeCardForDetails key={recipe._id} recipe={recipe} />
          ))
        )}
      </div>
    </div>
  );
};

export default UserRecipes;
