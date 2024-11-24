import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

// Components
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import Products from './components/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

// Styles
import './styles/main.css';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2ui1Xoc4usq3lmoVP3QP60_vi3TExu0w",
  authDomain: "real-estate-4fb6e.firebaseapp.com",
  projectId: "real-estate-4fb6e",
  storageBucket: "real-estate-4fb6e.firebasestorage.app",
  messagingSenderId: "765373420023",
  appId: "1:765373420023:web:25d568563aea6b9d03def2",
  measurementId: "G-RYCMRGS7NN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Navigation user={user} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" /> : <Login />} 
          />
          <Route 
            path="/products" 
            element={<Products />} 
          />
          <Route 
            path="/cart" 
            element={<Cart />} 
          />
          <Route 
            path="/checkout" 
            element={user ? <Checkout /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
