import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imageCompression from 'browser-image-compression';

const AddRecipes = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    spices: '',
    steps: '',
    cuisine: '',
    style: '',
    protein: '',
    image: '' // New field for image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true
      };

      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipe({
          ...recipe,
          image: reader.result
        });
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currentUser);

    const formData = {
      ...recipe,
      ingredients: recipe.ingredients.split(',').map(item => item.trim()),
      spices: recipe.spices.split(',').map(item => item.trim()),
      steps: recipe.steps.split(',').map(item => item.trim()),
      userEmail: currentUser.email
    };

    try {
      const response = await fetch('${process.env.BACKEND_URL}/recipes/addRecipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Recipe submitted successfully!');
        setRecipe({
          title: '',
          description: '',
          ingredients: '',
          spices: '',
          steps: '',
          cuisine: '',
          style: '',
          protein: '',
          image: '' // Reset image field
        });
      } else if (response.status === 403) {
        const result = await response.json();
        toast.error(result.message);
        navigate(result.redirect);
      } else {
        toast.error('Failed to submit recipe');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while submitting the recipe');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Submit a Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={recipe.description}
            onChange={handleChange}
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
            value={recipe.ingredients}
            onChange={handleChange}
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
            value={recipe.spices}
            onChange={handleChange}
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
            value={recipe.steps}
            onChange={handleChange}
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
            value={recipe.cuisine}
            onChange={handleChange}
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
            value={recipe.style}
            onChange={handleChange}
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
            value={recipe.protein}
            onChange={handleChange}
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
        <button type="submit" className="add-recipe-button w-full  text-white py-2 rounded-md transition duration-300">Submit Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipes;
