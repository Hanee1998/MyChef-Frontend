import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebaseconfig';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const fetchUserDetails = async (user) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user.email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return {}; // Return a default value or handle error appropriately
    }
  };

  const signup = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: email.split('@')[0] });
      const userDetails = await fetchUserDetails(result.user);
      setCurrentUser({ ...result.user, ...userDetails });
      sessionStorage.setItem('user', JSON.stringify({ ...result.user, ...userDetails }));
      await saveUserToDB(result.user, 'POST'); // Save user to database
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userDetails = await fetchUserDetails(result.user);
      setCurrentUser({ ...result.user, ...userDetails });
      sessionStorage.setItem('user', JSON.stringify({ ...result.user, ...userDetails }));
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      sessionStorage.removeItem('user');
      navigate('/Login'); 
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userDetails = await fetchUserDetails(result.user);
      setCurrentUser({ ...result.user, ...userDetails });
      sessionStorage.setItem('user', JSON.stringify({ ...result.user, ...userDetails }));
      await saveUserToDB(result.user, 'PUT'); // Save user to database
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    if (currentUser) {
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      try {
        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, newPassword);
      } catch (error) {
        console.error('Error changing password:', error);
        throw new Error(error.message);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDetails = await fetchUserDetails(user);
          setCurrentUser({ ...user, ...userDetails });
          sessionStorage.setItem('user', JSON.stringify({ ...user, ...userDetails }));
        } catch (error) {
          console.error('Error setting user state:', error);
        }
      } else {
        setCurrentUser(null);
        sessionStorage.removeItem('user');
      }
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const saveUserToDB = async (user, method) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user.email}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: user.displayName || user.email.split('@')[0],
          firstName: '',
          lastName: '',
          address: '',
          phone: '',
          isAdmin: false // default value
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error saving user to database:', error);
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    loginWithGoogle,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
