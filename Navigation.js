import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Navigation = ({ user }) => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/">Digital Real Estate</Link>
      </div>
      
      <div className="nav-links">
        <Link to="/products">Products</Link>
        {user ? (
          <>
            <Link to="/cart">Cart</Link>
            <button 
              className="btn btn-link"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
