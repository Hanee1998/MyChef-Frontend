import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../css/Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [userName, setUserName] = useState(null);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setUserName(storedUser.displayName || storedUser.email.split('@')[0]);
    }
  }, [currentUser]);

  const handleLogout = async () => {
    await logout();
    setUserName(null);
  };

  const menu = () => {
    if (dropdownRef.current.style.display === "grid") {
      dropdownRef.current.style.display = "none";
      buttonRef.current.innerHTML = "menu";
    } else {
      dropdownRef.current.style.display = "grid";
      buttonRef.current.innerHTML = "close";
    }
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        dropdownRef.current.style.display = "none";
        buttonRef.current.innerHTML = "menu";
      }
    };

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        if (dropdownRef.current.style.display === "grid") {
          dropdownRef.current.style.display = "none";
          buttonRef.current.innerHTML = "menu";
        }
        setProfileDropdownVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="nav" ref={navRef}>
      <div className="nav-content">
        <h1 className="brand">
          <img src="/mychef_logo.png" alt="Logo" />
        </h1>
        <div className="links nav-items">
          <a href="/">Home</a>
          {currentUser ? (
            <>
                                  <a href="/chatPrompt">Chat Bot</a>

                      <a href="/contactus">Contact Us</a>
                      <a href="/aboutus">About Us</a>


              {userName && (
                <div className="avatar" onClick={toggleProfileDropdown}>
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
              {profileDropdownVisible && (
                <div className="profile-dropdown">
                  <a href="profile/personal-info">Manage Profile</a>
                  <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
              )}
            </>
          ) : (
            <>
              <a href="/Login">Login</a>
              <a href="/Signup">Signup</a>
            </>
          )}
        </div>
        <i className="material-icons menu" onClick={menu} ref={buttonRef}>menu</i>
      </div>
      <div className="dropdown" id="dropdown" ref={dropdownRef}>
        <a href="/">Home</a>
        {currentUser ? (
          <>
            {userName && (
              <div className="avatar" onClick={toggleProfileDropdown}>
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
            {profileDropdownVisible && (
              <div className="profile-dropdown">
                <a href="/profile/personal-info">Manage Profile</a>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </div>
            )}
          </>
        ) : (
          <>
            <a href="/Login">Login</a>
            <a href="/Signup">Signup</a>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
