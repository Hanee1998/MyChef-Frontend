import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecipeDisplay from './RecipeDisplay';

const RecipeCard = ({ recipe, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState({ ...recipe });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe({ ...editedRecipe, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedRecipe({ ...editedRecipe, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/recipes/recipes/${recipe._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedRecipe)
      });

      if (response.ok) {
        setIsEditing(false);
        onSave();
        toast.success('Recipe updated successfully!');
      } else {
        toast.error('Failed to update recipe');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while updating the recipe');
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <ToastContainer />
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedRecipe.title}
              onChange={handleEditChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={editedRecipe.description}
              onChange={handleEditChange}
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="ingredients" className="block text-lg font-medium text-gray-700">Ingredients</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={editedRecipe.ingredients.join(', ')}
              onChange={handleEditChange}
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Separate ingredients with commas"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="spices" className="block text-lg font-medium text-gray-700">Spices</label>
            <textarea
              id="spices"
              name="spices"
              value={editedRecipe.spices.join(', ')}
              onChange={handleEditChange}
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Separate spices with commas"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="steps" className="block text-lg font-medium text-gray-700">Steps</label>
            <textarea
              id="steps"
              name="steps"
              value={editedRecipe.steps.join(', ')}
              onChange={handleEditChange}
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Separate steps with commas"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="cuisine" className="block text-lg font-medium text-gray-700">Cuisine</label>
            <input
              type="text"
              id="cuisine"
              name="cuisine"
              value={editedRecipe.cuisine}
              onChange={handleEditChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="style" className="block text-lg font-medium text-gray-700">Style</label>
            <input
              type="text"
              id="style"
              name="style"
              value={editedRecipe.style}
              onChange={handleEditChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="protein" className="block text-lg font-medium text-gray-700">Protein</label>
            <input
              type="text"
              id="protein"
              name="protein"
              value={editedRecipe.protein}
              onChange={handleEditChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-lg font-medium text-gray-700">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <button type="submit" className="w-full edit-button text-white py-2 rounded-md transition duration-300">Update Recipe</button>
        </form>
        <button onClick={() => setIsEditing(false)} className="w-full mt-2 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-300">Cancel</button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <ToastContainer />
      <RecipeDisplay
        recipe={recipe}
        selectedTitleCard={recipe.title}
        protein={recipe.protein}
        style={recipe.style}
        cuisine={recipe.cuisine}
      />
      <div className="flex justify-end space-x-4 mt-4">
        <button
          onClick={() => setIsEditing(true)}
          className="edit-button text-white px-4 py-2 rounded-lg"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(recipe._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
