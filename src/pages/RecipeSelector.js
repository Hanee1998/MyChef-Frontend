import React, { useState } from 'react';

const RecipeSelector = ({ onGenerate }) => {
    const [selectedProtein, setSelectedProtein] = useState('6');
    const [selectedStyle, setSelectedStyle] = useState('1');
    const [selectedCuisine, setSelectedCuisine] = useState('Colombian');

    const proteins = [
        { id: '1', name: 'Beef' },
        { id: '2', name: 'Chicken' },
        { id: '3', name: 'Fish' },
        { id: '4', name: 'Pork' },
        { id: '5', name: 'Turkey' },
        { id: '6', name: 'Vegetarian' },
        { id: '7', name: 'Tofu' },
        { id: '8', name: 'Lamb' },
    ];
    
    const styles = [
        { id: '1', name: 'Healthy' },
        { id: '2', name: 'Hearty' },
        { id: '3', name: 'Low Carb' },
        { id: '4', name: 'Whole Foods' },
        { id: '5', name: 'Keto' },
        { id: '6', name: 'Paleo' },
        { id: '7', name: 'Vegan' },
        { id: '8', name: 'Gluten-Free' }
    ];
    
    const cuisines = [
        'Colombian', 
        'Italian', 
        'Chinese', 
        'Indian', 
        'Mexican', 
        'Thai', 
        'Japanese', 
        'Greek', 
        'French', 
        'Spanish', 
        'Korean', 
        'Vietnamese'
    ];
    

    const handleGenerate = () => {
        const selectedProteinName = proteins.find(protein => protein.id === selectedProtein).name;
        const selectedStyleName = styles.find(style => style.id === selectedStyle).name;
        onGenerate(selectedProteinName, selectedStyleName, selectedCuisine);
    };

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
                        className="appearance-none bg-gray-200 py-2 px-4 rounded w-full"
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
                onClick={handleGenerate}
                className="generate-recipes-button text-white py-2 px-4 rounded w-full"
            >
                Generate Recipes!
            </button>
        </div>
    );
};

export default RecipeSelector;
