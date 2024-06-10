import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <Router>
      <Layout>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
           <Home />
          } />
        </Routes>
        </AuthProvider>

      </Layout>
    </Router>
  );
};

export default App;
