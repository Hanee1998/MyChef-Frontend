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
    // Assume there's an endpoint to fetch user details including isAdmin
    const response = await fetch(`${process.env.BACKEND_URL}/users/${user.email}`);
    const data = await response.json();
    return data;
  };

  const signup = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: email.split('@')[0] });
    const userDetails = await fetchUserDetails(result.user);
    setCurrentUser({ ...result.user, ...userDetails });
    sessionStorage.setItem('user', JSON.stringify({ ...result.user, ...userDetails }));
    await saveUserToDB(result.user, 'POST'); // Save user to database
  };

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const userDetails = await fetchUserDetails(result.user);
    setCurrentUser({ ...result.user, ...userDetails });
    sessionStorage.setItem('user', JSON.stringify({ ...result.user, ...userDetails }));
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
    const userDetails = await fetchUserDetails(result.user);
    setCurrentUser({ ...result.user, ...userDetails });
    sessionStorage.setItem('user', JSON.stringify({ ...result.user, ...userDetails }));
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDetails = await fetchUserDetails(user);
        setCurrentUser({ ...user, ...userDetails });
        sessionStorage.setItem('user', JSON.stringify({ ...user, ...userDetails }));
      } else {
        setCurrentUser(null);
        sessionStorage.removeItem('user');
      }
    });
    return unsubscribe;
  }, []);

  const saveUserToDB = async (user, method) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/users/${user.email}`, {
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
