import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyBDi7QWJPsweo4O0hBf6rOP2tVMIKZBzyY",
    authDomain: "mychef-23058.firebaseapp.com",
    projectId: "mychef-23058",
    storageBucket: "mychef-23058.appspot.com",
    messagingSenderId: "716493936061",
    appId: "1:716493936061:web:50a706e651842024e32ed4"
  };


  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);