import React, { useState } from 'react';
import axios from 'axios';
import MessageList from './MessageList';

const ChatPrompt = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

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

      const aiMessage = {
        sender: 'ai',
        text: response.data.choices[0].message.content ,
      };
      setMessages([...messages, userMessage, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }

    setInput('');
  };

  return (
    <div className="flex h-[97vh] w-full flex-col">
      <div className="flex-1 space-y-6 overflow-y-auto rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 shadow-sm relative:bg-slate-900 relative:text-slate-300 sm:text-base sm:leading-7">
        <MessageList messages={messages} />
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="chat-input" className="sr-only">Enter prompt</label>
        <div className="flex gap-x-2 custon-margin">
          <input
            id="chat-input"
            type="text"
            className="w-full rounded-lg border border-slate-300 bg-slate-200 p-3 text-sm text-slate-800 shadow-md focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 relative:border-slate-200/10 relative:bg-slate-800 relative:text-slate-200 relative:placeholder-slate-400 relative:focus:border-blue-600 sm:text-base"
            placeholder="Enter prompt"
            value={input}
            onChange={handleInputChange}
            required
          />
          <button
            type="submit"
            className="rounded-lg border border-transparent bg-blue-600 px-3 py-1 text-slate-200 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M10 14l11 -11"></path>
              <path
                d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"
              ></path>
            </svg>
            <span className="sr-only">Enter prompt</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPrompt;
