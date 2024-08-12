import React, { useState } from 'react';
import axios from 'axios';
import MessageList from './MessageList';

function ChatPrompt() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (input.trim()) {
            const userMessage = { sender: 'user', text: input };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            
            try {
                const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                    model: 'gpt-3.5-turbo', // or the model you prefer
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant.' },
                        { role: 'user', content: input }
                    ],
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
                    }
                });
                
                const botMessage = { sender: 'bot', text: response.data.choices[0].message.content };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } catch (error) {
                console.error('Error calling OpenAI API:', error);
            }

            setInput('');
        }
    };

    return (
        <div id="chat-container">
            <div id="chat-title">
                <span>Generate Recipe</span>
            </div>
            <MessageList messages={messages} />
            <div id="chat-form">
                <input 
                    type="text" 
                    placeholder="Type a message" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    onKeyPress={(e) => { if (e.key === 'Enter') handleSend() }} 
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default ChatPrompt;
