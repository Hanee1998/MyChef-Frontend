import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../css/Profile.css';

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="sidebar">
        <ul>
          <li><NavLink to="/profile/personal-info" className={({ isActive }) => isActive ? "active" : ""}>Personal Info</NavLink></li>
          <li><NavLink to="/profile/password" className={({ isActive }) => isActive ? "active" : ""}>Change Password</NavLink></li>
        </ul>
      </div>
      <div className="profile-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
