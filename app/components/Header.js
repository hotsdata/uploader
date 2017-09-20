import React from 'react';
import { Link } from 'react-router';

const Header = () => {
  return (
    <nav className="nav">
      <div className="nav-left nav-menu">
        <Link className="nav-item" to="/">Home</Link>
        <Link className="nav-item" to="/settings">Settings</Link>
      </div>
    </nav>

  );
}

export default Header ;
