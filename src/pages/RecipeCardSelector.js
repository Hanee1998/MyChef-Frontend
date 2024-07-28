import React, { useState } from 'react';

const RecipeCardSelector = ({ protein, style, cuisine, recipes, onCreateCustomRecipe }) => {
    const [selectedCard, setSelectedCard] = useState(null);

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Choose a Title</h1>
            <p className="text-gray-600 mb-8">
                Pick your favorite {cuisine} style {style} {protein} recipe from the AI-generated options below.
                We'll use our AI to generate a list of ingredients and directions based on your selection.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {recipes.map((recipe, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedCard(index)}
                        className={`cursor-pointer border rounded-lg p-4 transition-all duration-200 ${selectedCard === index ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'
                            }`}
                        style={{ transition: 'border-color 0.3s ease' }}
                    >
                        <h3 className="font-bold text-lg">{recipe.title}</h3>
                        <p className="text-gray-600">{recipe.description}</p>
                    </div>
                ))}
            </div>

            <button
                onClick={() => onCreateCustomRecipe(recipes[selectedCard].title)}
                className="generate-recipes-button text-white py-2 px-4 rounded w-full"
                disabled={selectedCard === null}
            >
                Create Custom Recipe
            </button>
        </div>
    );
};

export default RecipeCardSelector;
