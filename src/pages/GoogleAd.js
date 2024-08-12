import React, { useEffect, useRef } from 'react';

const GoogleAd = ({ client, slot, format, responsive }) => {
  const adRef = useRef(null);

  useEffect(() => {
    const loadAds = () => {
      if (adRef.current && !adRef.current.classList.contains('adsbygoogle-initialized')) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          adRef.current.classList.add('adsbygoogle-initialized');
        } catch (e) {
          console.error('Adsbygoogle error:', e);
        }
      }
    };

    // Ensure the adsbygoogle script is loaded
    if (window.adsbygoogle && window.adsbygoogle.loaded) {
      loadAds();
    } else {
      const interval = setInterval(() => {
        if (window.adsbygoogle && window.adsbygoogle.loaded) {
          loadAds();
          clearInterval(interval);
        }
      }, 100);
    }

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = '';
        adRef.current.classList.remove('adsbygoogle-initialized');
      }
    };
  }, []);

  return (
    <ins
      className="adsbygoogle"
      ref={adRef}
      style={{ display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    ></ins>
  );
};

export default GoogleAd;
