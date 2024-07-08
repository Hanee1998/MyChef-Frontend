import React from 'react';
import '../css/MessageList.css';
import { useAuth } from '../context/AuthContext';

function MessageList({ messages }) {
  const { currentUser } = useAuth();
  const userInitial = currentUser?.displayName?.charAt(0).toUpperCase() || 'U'; 

  return (
    <div className="flex-1 space-y-6 overflow-y-auto rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 shadow-sm relative:bg-slate-900 relative:text-slate-300 sm:text-base sm:leading-7">
      {messages.map((message, index) => (
        <div key={index} className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}>
          <img
            className={`mr-2 h-8 w-8 rounded-full ${message.sender === 'user' ? 'ml-2' : ''}`}
            src={message.sender === 'user' ? `https://dummyimage.com/128x128/354ea1/ffffff&text=${userInitial}` : 'https://dummyimage.com/128x128/363536/ffffff&text=AI'}
            alt="avatar"
          />
          <div
            className={`flex min-h-[85px] rounded-b-xl ${message.sender === 'user' ? 'rounded-tl-xl' : 'rounded-tr-xl'} bg-slate-50 p-4 relative:bg-slate-800 sm:min-h-0 sm:max-w-md md:max-w-2xl`}
          >
            <p>{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
