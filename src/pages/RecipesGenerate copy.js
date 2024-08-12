import React, { useState } from 'react';

// Sample content string
const contentString = `
{\n  \"description\": \"Masala  Curry is a flavorful and nutritious vegetarian dish inspired by Indian cuisine. This aromatic curry is made with tender chickpeas simmered in a rich and spicy tomato-based sauce. It is a perfect choice for a protein-packed meal that is both satisfying and delicious.\",\n  \"ingredients\": [\n    \"2 cans of chickpeas, drained and rinsed\",\n    \"1 onion, finely chopped\",\n    \"3 cloves of garlic, minced\",\n    \"1-inch piece of ginger, grated\",\n    \"2 tomatoes, chopped\",\n    \"1 green chili, chopped (optional)\",\n    \"1 teaspoon cumin seeds\",\n    \"1 teaspoon coriander powder\",\n    \"1/2 teaspoon turmeric powder\",\n    \"1/2 teaspoon red chili powder\",\n    \"1/2 teaspoon garam masala\",\n    \"Salt to taste\",\n    \"2 tablespoons oil\",\n    \"Fresh cilantro leaves for garnish\"\n  ],\n  \"spices\": [\n    \"1 teaspoon cumin seeds\",\n    \"1 teaspoon coriander powder\",\n    \"1/2 teaspoon turmeric powder\",\n    \"1/2 teaspoon red chili powder\",\n    \"1/2 teaspoon garam masala\"\n  ],\n  \"steps\": [\n    \"Heat oil in a pan and add cumin seeds. Allow them to splutter.\",\n    \"Add chopped onions and sauté until golden brown.\",\n    \"Stir in minced garlic, grated ginger, and green chili. Cook for a minute until fragrant.\",\n    \"Add chopped tomatoes and cook until they are soft and mushy.\",\n    \"Add coriander powder, turmeric powder, red chili powder, and salt. Cook the masala until the oil starts to separate.\",\n    \"Add drained chickpeas and mix well to coat them with the masala.\",\n    \"Add water as needed to achieve your desired consistency for the curry. Bring it to a simmer and let it cook for 10-15 minutes.\",\n    \"Sprinkle garam masala and garnish with fresh cilantro leaves before serving.\",\n    \"Enjoy the Masala Chickpea Curry with steamed rice or warm rotis for a comforting and nutritious meal.\"\n  ]\n}
`;


const RecepieGenerator = () => {
    const [stage, setStage] = useState(1);
    const [recipe, setRecipe] = useState(null);
  
    const handleGenerate = (protein, style, cuisine) => {
      console.log('Selected Protein:', protein);
      console.log('Selected Style:', style);
      console.log('Selected Cuisine:', cuisine);
      setStage(2);
    };
  
    const handleCreateCustomRecipe = () => {
      const recipeObject = JSON.parse(contentString);
      setRecipe(recipeObject);
      setStage(3);
    };
  
    return (
      <div className="RecipeGenerator">
        {stage === 1 && <RecipeSelector onGenerate={handleGenerate} />}
        {stage === 2 && <RecipeCardSelector onCreateCustomRecipe={handleCreateCustomRecipe} />}
        {stage === 3 && recipe && (
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Custom Recipe</h1>
            <h2 className="text-xl font-bold mb-2">{recipe.description}</h2>
            <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside mb-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mb-2">Spices:</h3>
            <ul className="list-disc list-inside mb-4">
              {recipe.spices.map((spice, index) => (
                <li key={index}>{spice}</li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mb-2">Steps:</h3>
            <ol className="list-decimal list-inside mb-4">
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  };

const RecipeSelector = ({ onGenerate }) => {
    const [selectedProtein, setSelectedProtein] = useState('4');
    const [selectedStyle, setSelectedStyle] = useState('4');
    const [selectedCuisine, setSelectedCuisine] = useState('Colombian');

    const proteins = [
        { id: '1', name: 'Beef' },
        { id: '2', name: 'Chicken' },
        { id: '3', name: 'Fish' },
        { id: '4', name: 'Pork' },
        { id: '5', name: 'Turkey' },
        { id: '6', name: 'Vegetarian' },
    ];

    const styles = [
        { id: '1', name: 'Healthy' },
        { id: '2', name: 'Hearty' },
        { id: '3', name: 'Low Carb' },
        { id: '4', name: 'Whole Foods' },
    ];

    const cuisines = ['Colombian', 'Italian', 'Chinese', 'Indian', 'Mexican'];

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Make your selections</h1>
            <p className="text-gray-600 mb-4">Choose a protein, nutritional style, and cuisine to get started.</p>

            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Protein</h2>
                <div className="grid grid-cols-3 gap-2">
                    {proteins.map((protein) => (
                        <label
                            key={protein.id}
                            onClick={() => setSelectedProtein(protein.id)}
                            className={`relative flex w-full cursor-pointer items-center justify-center rounded-md border px-2 py-4 shadow-sm transition-all duration-200 hover:bg-gray-50 ${selectedProtein === protein.id ? 'border-primary-500 bg-green-50' : 'border-gray-300 bg-white'
                                }`}
                            style={{ transition: 'border-color 0.3s ease' }}
                        >
                            <input
                                type="radio"
                                name="protein_id"
                                value={protein.id}
                                className="sr-only"
                                checked={selectedProtein === protein.id}
                                onChange={() => setSelectedProtein(protein.id)}
                            />
                            <div className="flex flex-col items-center justify-center gap-2">
                                <div className="font-heading text-sm leading-none text-neutral-800">
                                    {protein.name}
                                </div>
                            </div>
                            <div className={`absolute right-2 top-2 ${selectedProtein === protein.id ? '' : 'hidden'}`}>
                                <div className="h-2 w-2 rounded-full bg-primary-500"></div>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Nutritional Style</h2>
                <div className="grid grid-cols-3 gap-2">
                    {styles.map((style) => (
                        <label
                            key={style.id}
                            onClick={() => setSelectedStyle(style.id)}
                            className={`relative flex w-full cursor-pointer items-center justify-center rounded-md border px-2 py-4 shadow-sm transition-all duration-200 hover:bg-gray-50 ${selectedStyle === style.id ? 'border-primary-500 bg-green-50' : 'border-gray-300 bg-white'
                                }`}
                            style={{ transition: 'border-color 0.3s ease' }}
                        >
                            <input
                                type="radio"
                                name="style_id"
                                value={style.id}
                                className="sr-only"
                                checked={selectedStyle === style.id}
                                onChange={() => setSelectedStyle(style.id)}
                            />
                            <div className="flex flex-col items-center justify-center gap-2">
                                <div className="font-heading text-sm leading-none text-neutral-800">
                                    {style.name}
                                </div>
                            </div>
                            <div className={`absolute right-2 top-2 ${selectedStyle === style.id ? '' : 'hidden'}`}>
                                <div className="h-2 w-2 rounded-full bg-primary-500"></div>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Cuisine</h2>
                <div className="relative">
                    <select
                        className="RecepieGeneratorearance-none bg-gray-200 py-2 px-4 rounded w-full"
                        value={selectedCuisine}
                        onChange={(e) => setSelectedCuisine(e.target.value)}
                    >
                        {cuisines.map((cuisine) => (
                            <option key={cuisine} value={cuisine}>
                                {cuisine}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M7 10l5 5 5-5H7z" />
                        </svg>
                    </div>
                </div>
            </div>

            <button
                onClick={() => onGenerate(selectedProtein, selectedStyle, selectedCuisine)}
                className="bg-green-500 text-white py-2 px-4 rounded w-full"
            >
                Generate Recipes!
            </button>
        </div>
    );
};

const RecipeCardSelector = ({ onCreateCustomRecipe }) => {
    const [selectedCard, setSelectedCard] = useState(null);

    const recipes = [
        {
            id: 1,
            title: 'Masala Chickpea Curry',
            description: 'A flavorful and wholesome vegetarian curry made with protein-rich chickpeas, infused with aromatic Indian spices.',
        },
        {
            id: 2,
            title: 'Tofu Tikka Masala',
            description: 'A vegetarian twist on the classic Indian dish, featuring marinated tofu chunks cooked in a creamy and spiced tomato-based sauce.',
        },
        {
            id: 3,
            title: 'Lentil Spinach Dal',
            description: 'A nutritious and comforting lentil stew cooked with fresh spinach, seasoned with traditional Indian spices, perfect for a healthy meal.',
        },
        {
            id: 4,
            title: 'Paneer Tikka Skewers',
            description: 'Grilled skewers of marinated paneer (Indian cottage cheese) and vegetables, packed with protein and bursting with Indian flavors.',
        },
        {
            id: 5,
            title: 'Quinoa Vegetable Biryani',
            description: 'A nutritious and protein-packed rendition of the traditional Indian biryani, featuring quinoa, mixed vegetables, and aromatic spices.',
        },
    ];

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Choose a Title</h1>
            <p className="text-gray-600 mb-8">
                Pick your favorite Indian style Healthy Vegetarian recipe from the AI-generated options below.
                We'll use our AI to generate a list of ingredients and directions based on your selection.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {recipes.map((recipe) => (
                    <div
                        key={recipe.id}
                        onClick={() => setSelectedCard(recipe.id)}
                        className={`cursor-pointer border rounded-lg p-4 transition-all duration-200 ${selectedCard === recipe.id ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'
                            }`}
                        style={{ transition: 'border-color 0.3s ease' }}
                    >
                        <h3 className="font-bold text-lg">{recipe.title}</h3>
                        <p className="text-gray-600">{recipe.description}</p>
                    </div>
                ))}
            </div>

            <button onClick={onCreateCustomRecipe} className="bg-green-500 text-white py-2 px-4 rounded w-full">
                Create Custom Recipe
            </button>
        </div>
    );
};

export default RecepieGenerator;
