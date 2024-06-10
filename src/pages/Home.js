import React from 'react';
import '../css/Home.css';

function Home() {
  return (
    <main className={`home-content`}>

    <div className="home-container">
      <img src="./home.png" alt="Delicious food" className="header-image" />
      <div className='home-text'>

      <h1>Welcome to MyChef</h1>
      <p>
        We are MyChef and we provide personalized recipe generation using AI.
        Whether you're looking for a quick meal or an elaborate dish, our AI-powered
        platform can help you find the perfect recipe tailored to your taste and
        dietary preferences.
      </p>
      </div>

    </div>
    </main>
  );
}

export default Home;
