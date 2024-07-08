import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import { AuthProvider } from './context/AuthContext';
import Profile from './pages/Profile';
import ProfilePersonalInfo from './pages/ProfilePersonalInfo';
import ProfilePassword from './pages/ProfilePassword';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import ChatPrompt from './pages/ChatPrompt ';
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile/*" element={<Profile />}>
              <Route path="personal-info" element={<ProfilePersonalInfo />} />
              <Route path="password" element={<ProfilePassword />} />
            </Route>            <Route path="/" element={<Home />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/chatPrompt" element={<ChatPrompt  />} />


          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;


