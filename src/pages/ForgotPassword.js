import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/ForgotPassword.css';

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setMessage('Check your inbox for further instructions');
      setTimeout(() => {
        navigate('/Login');
      }, 5000);
    } catch (error) {
      setError('Failed to reset password');
      console.log(error);
    }
  };

  return (
    <main className={`content forgot-password-content`}>
      <div className="forgot-password-page">
        <div className="forgot-password-container">
          <h1>Reset Password</h1>
          <p>Enter your email to reset your password.</p>
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
