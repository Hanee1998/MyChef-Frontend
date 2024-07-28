import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePassword = () => {
  const { changePassword } = useAuth();
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevPassword) => ({ ...prevPassword, [name]: value }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Validation checks
    if (password.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long');
      return;
    }

    if (password.newPassword !== password.confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      await changePassword(password.currentPassword, password.newPassword);
      toast.success('Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <div className="form-group">
          <label>Current Password</label>
          <input type="password" name="currentPassword" value={password.currentPassword} onChange={handlePasswordChange} />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input type="password" name="newPassword" value={password.newPassword} onChange={handlePasswordChange} />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input type="password" name="confirmNewPassword" value={password.confirmNewPassword} onChange={handlePasswordChange} />
        </div>
        <button className='change-password-button' type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ProfilePassword;
