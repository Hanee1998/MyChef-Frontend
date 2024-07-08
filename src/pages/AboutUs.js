import React from 'react';
import '../css/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <section className="welcome-section">
        <div className="welcome-image">
          <img src="./mychef_logo.png" alt="Welcome" />
        </div>
        <div className="welcome-content">
          <h1>Welcome to MyChef</h1>
          <p>
            MyChef is your ultimate culinary companion, leveraging AI to help you create delicious meals with the ingredients you have on hand. Simply input your available ingredients, and our AI will generate step-by-step instructions to guide you in preparing a fantastic dish.
          </p>
        </div>
      </section>

      <section className="mission-values-section">
        <div className="mission">
          <h2>Our Mission</h2>
          <h3>Revolutionizing Home Cooking</h3>
          <p>
            At MyChef, our mission is to make home cooking easy, enjoyable, and accessible for everyone. We aim to inspire creativity in the kitchen by providing personalized recipes tailored to the ingredients you already have.
          </p>
        </div>
        <div className="values">
          <h2>Our Values</h2>
          <h3>Core Principles</h3>
          <p>
            Innovation, Simplicity, Sustainability, and Customer Delight are the values that drive MyChef. We are dedicated to offering an intuitive platform, innovative AI solutions, sustainable cooking practices, and exceptional user experience.
          </p>
        </div>
      </section>

      <section className="legacy-section">
        <h2>Crafting Culinary Magic</h2> 
        <p>
          MyChef was created with the vision of transforming how people cook at home. Our innovative AI technology ensures that you can always find a delicious recipe, no matter what ingredients you have. Join us on this culinary journey and discover the joy of cooking with MyChef.
        </p>
        {/* <div className="team">
          <div className="team-member">
            <img src="" alt="Alice Brown" />
            <p>Alice Brown</p>
          </div>
          <div className="team-member">
            <img src="" alt="Bob Green" />
            <p>Bob Green</p>
          </div>
          <div className="team-member">
            <img src="" alt="Catherine White" />
            <p>Catherine White</p>
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default AboutUs;
