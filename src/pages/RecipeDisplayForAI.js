import React from 'react';

const RecipeDisplayForAI = ({ recipe, selectedTitleCard, protein, style, cuisine }) => {
  const handleNavigateGenerateAnotherRecipe = () => {
    window.location.reload();
  };

  if (!recipe) {
    return null;
  }

  const { description, ingredients, spices, steps } = recipe;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{selectedTitleCard}</h1>
       
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
      <button
className="generate-button"
 onClick={handleNavigateGenerateAnotherRecipe}
          >
           Generate Another Recipe
          </button>
     
    </div>
  );
};

export default RecipeDisplayForAI;
