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

  const signup = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: email.split('@')[0] });
    setCurrentUser(result.user);
    sessionStorage.setItem('user', JSON.stringify(result.user));
    await saveUserToDB(result.user, 'POST'); // Save user to database
  };

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    setCurrentUser(result.user);
    sessionStorage.setItem('user', JSON.stringify(result.user));
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

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    setCurrentUser(result.user);
    sessionStorage.setItem('user', JSON.stringify(result.user));
    await saveUserToDB(result.user, 'PUT'); // Save user to database
  };

  const changePassword = async (currentPassword, newPassword) => {
    if (currentUser) {
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      try {
        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, newPassword);
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.removeItem('user');
      }
    });
    return unsubscribe;
  }, []);

  const saveUserToDB = async (user, method) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${user.email}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: user.displayName || user.email.split('@')[0],
          firstName: '',
          lastName: '',
          address: '',
          phone: ''
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error saving user to database', error);
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
