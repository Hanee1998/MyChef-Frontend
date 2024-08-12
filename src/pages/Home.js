import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/Home.css';

function Home() {
  const navigate = useNavigate();
  const adRef = useRef(null);

  const handleAiPageNavigation = async () => {
    try {
      navigate('/recipesGenerator');
    } catch (error) {
      toast.error('Failed to Navigate');
      console.log(error);
    }
  };

  useEffect(() => {
    const loadAds = () => {
      if (adRef.current) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error('Adsbygoogle error:', e);
        }
      }
    };

    // Check if adsbygoogle is defined and loaded
    const interval = setInterval(() => {
      if (window.adsbygoogle && window.adsbygoogle.loaded) {
        loadAds();
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="home-content">
      <section className="hero-section">
        <div className="hero-text">
          <h1>Discover AI-Generated Recipes</h1>
          <p>
            Welcome to MyChef! Let our AI create personalized recipes just for you. Whether you’re a novice cook or a seasoned chef, our AI will help you discover new dishes tailored to your taste and dietary preferences.
          </p>
          <div className="hero-buttons">
            <button onClick={handleAiPageNavigation} className="btn-primary">Get Started</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="./home-image1.png" alt="Chef cooking" />
        </div>
      </section>

      <section className="features-section">
        <h2>Amazing Features to Enhance Your Cooking</h2>
        <div className="features-grid">
          <div className="feature-item">
            <img src="menue1.png" alt="Personalized Menus" />
            <h3>Personalized Menus</h3>
            <p>Get recipes tailored to your taste and dietary preferences.</p>
          </div>
          <div className="feature-item">
            <img src="menue2.png" alt="Step-by-Step Instructions" />
            <h3>Step-by-Step Instructions</h3>
            <p>Easy-to-follow instructions to make cooking a breeze.</p>
          </div>
          <div className="feature-item">
            <img src="menue3.png" alt="Expert Tips" />
            <h3>Expert Tips</h3>
            <p>Learn from the best with tips and tricks from top chefs.</p>
          </div>
          <div className="feature-item">
            <img src="menue4.png" alt="Quick and Easy Recipes" />
            <h3>Quick and Easy Recipes</h3>
            <p>Find delicious recipes that you can prepare in no time.</p>
          </div>
        </div>
      </section>

      <section className="cooking-section">
        <div className="cooking-text">
          <h2>Cook with Confidence</h2>
          <p>
            Our AI-generated recipes come with detailed instructions and expert tips to help you cook with confidence. Discover new dishes and improve your cooking skills with MyChef.
          </p>
        </div>
        <div className="cooking-image">
          <img src="cooking-ai.png" alt="Chef" />
        </div>
      </section>

      <section className="gallery-section">
        <h2>Gallery of Our Delicious Recipes</h2>
        <div className="gallery-grid">
          <img src="image1.jpeg" alt="Food 1" />
          <img src="image2.jpeg" alt="Food 2" />
          <img src="image3.jpeg" alt="Food 3" />
          <img src="image4.jpeg" alt="Food 4" />
        </div>
      </section>

      <section className="ads-section">
        <ins
          className="adsbygoogle"
          ref={adRef}
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-3020048477207370"
          data-ad-slot="2427965863"
          data-adtest="on"
          ></ins>
      </section>
    </main>
  );
}

export default Home;
