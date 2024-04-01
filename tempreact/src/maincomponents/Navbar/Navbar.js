import "./Navbar.css"

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';




const Navbars = () => {
  return (
    
<nav className="custom-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Your Logo
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </Link>
          <Link to="/about" className="navbar-link">
            <FontAwesomeIcon icon={faInfoCircle} />
            <span>Admin panel</span>
          </Link>
          <Link to="/register" className="navbar-link">
            <FontAwesomeIcon icon={faUser} />
            <span>Sign Up</span>
          </Link>
          <Link to='/login' className="navbar-link">
          <span>Login</span>
          </Link>
          <Link to="/showmovie" className="navbar-link">
          
          <span>Movies</span>
          </Link>
          <Link to="/veiwprofile" className="navbar-link">
          
          <span> <FontAwesomeIcon icon={faUser} /></span>
          </Link>
        </div>
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search"
            aria-label="Search"
            className="search-input"
          />
          <button type="submit" className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    </nav>
      

  )
}

export default Navbars
