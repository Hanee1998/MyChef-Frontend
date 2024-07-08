import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../css/Layout.css';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/Login' || location.pathname === '/Signup' || location.pathname === '/forgot-password' ;
  return (
    <div className="layout">
      <Navbar />
      <main className={`content ${isLoginPage ? 'login-content' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
