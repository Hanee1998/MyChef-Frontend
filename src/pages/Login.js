import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('All fields are required');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Invalid email address');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      await login(email, password);
      toast.success('Logged in successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign in with Google');
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <div className="login-container">
        <h1>Recipe Generator Login</h1>
        <p>Enter your email and password to access the Recipe Generator.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className='login-button' type="submit">Login</button>
        </form>
        <button onClick={handleGoogleSignIn} className="google-button">
          <img src="./icons8-google-48.png" alt="Google logo" width="20" height="20" />
          Login with Google
        </button>
        <div className="signup-container">
          <a href="/forgot-password">Forgot your password?</a>
          <a href="/Signup">Create new account?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
