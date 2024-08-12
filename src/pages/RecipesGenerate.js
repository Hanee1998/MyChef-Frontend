import React, { useState } from 'react';
import axios from 'axios';
import RecipeSelector from './RecipeSelector';
import RecipeCardSelector from './RecipeCardSelector';
import RecipeDisplayForAI from './RecipeDisplayForAI';

const RecipeGenerator = () => {
    const [stage, setStage] = useState(1);
    const [recipe, setRecipe] = useState(null);
    const [generatedRecipes, setGeneratedRecipes] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [protein, setProtein] = useState('');
    const [style, setStyle] = useState('');
    const [cuisine, setCuisine] = useState('');

    const handleGenerate = async (selectedProtein, selectedStyle, selectedCuisine) => {
        setProtein(selectedProtein);
        setStyle(selectedStyle);
        setCuisine(selectedCuisine);

        const input = `Generate in between 1 to 5 recipe title for a ${selectedCuisine} ${selectedStyle} ${selectedProtein} dish.`;
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: `Give me response and title should start with Title: and description starts with Description: .You are a great chef. I want you to give me 3 to 5 best recipes. Provide only the title and one line description based on the protein, nutritional style, and cuisine. My protein selection is ${selectedProtein}, nutritional style is ${selectedStyle}, and cuisine is ${selectedCuisine}.` },
                    { role: 'user', content: input }
                ],
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
                }
            });

            const choice = response.data.choices && response.data.choices[0];
            const content = choice && choice.message && choice.message.content && choice.message.content.trim();

            if (!content) {
                throw new Error("No content received from the API");
            }

            const lines = content.split('\n').filter(line => line.trim());
            const recipes = [];

            let currentRecipe = {};
            lines.forEach(line => {
                if (line.startsWith('Title:')) {
                    if (currentRecipe.title || currentRecipe.description) {
                        recipes.push(currentRecipe);
                    }
                    currentRecipe = { title: line.replace('Title:', '').trim(), description: '' };
                } else if (line.startsWith('Description:')) {
                    currentRecipe.description = line.replace('Description:', '').trim();
                    recipes.push(currentRecipe);
                    currentRecipe = {};
                }
            });

            if (currentRecipe.title || currentRecipe.description) {
                recipes.push(currentRecipe);
            }

            setGeneratedRecipes(recipes);
            setStage(2);
        } catch (error) {
            console.error('Error generating title:', error);
        }
    };

    const handleCreateCustomRecipe = async (title) => {
        setSelectedTitle(title);
        const input = `Generate a recipe for ${title}.`;
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `You are a great chef. Provide the best recipe for ${title} as a JSON object with the following structure: {
                            "description": "string",
                            "ingredients": ["string"],
                            "spices": ["string"],
                            "steps": ["string"]
                        }. The recipe should include a detailed description, a list of ingredients, a list of spices, and step-by-step instructions. The protein selection is ${protein}, nutritional style is ${style}, and cuisine is ${cuisine}.`
                    },
                    { role: 'user', content: input },
                ],
                temperature: 0,

            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
                }
            });

            const choice = response.data.choices && response.data.choices[0];
            const content = choice && choice.message && choice.message.content ;
    
            if (!content) {
                throw new Error("No content received from the API");
            }
    
    
            let recipeObject;
            try {
                recipeObject = JSON.parse(content);
            } catch (e) {
                console.error("Failed to parse JSON:", e);
                throw new Error("Failed to parse JSON response from the API");
            }
    
            setRecipe(recipeObject);
            setStage(3);
        } catch (error) {
            console.error('Error generating recipe:', error);
        }
    };

    return (
        <div className="RecipeGenerator">
            {stage === 1 && <RecipeSelector onGenerate={handleGenerate} />}
            {stage === 2 && <RecipeCardSelector protein={protein} style={style} cuisine={cuisine} recipes={generatedRecipes} onCreateCustomRecipe={handleCreateCustomRecipe} />}
            {stage === 3 && recipe && <RecipeDisplayForAI recipe={recipe} protein={protein} style={style} cuisine={cuisine} selectedTitleCard={selectedTitle}/>}
        </div>
    );
};

export default RecipeGenerator;
