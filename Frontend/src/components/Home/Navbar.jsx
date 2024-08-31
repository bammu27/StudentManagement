import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/home.css'; // Ensure your CSS is properly linked

const Navbar = ({setSignUpForm}) => {
  const [loginDropdownVisible, setLoginDropdownVisible] = useState(false);
  const [portalDropdownVisible, setPortalDropdownVisible] = useState(false);

  

  const toggleLoginDropdown = () => {
    setLoginDropdownVisible(!loginDropdownVisible);
    setPortalDropdownVisible(false);

    // Hide dropdown after a delay of 2 seconds
    setTimeout(() => {
      setLoginDropdownVisible(false);
    }, 2000);

  };

  
  

  return (

    
    <nav className="navbar">
      <div className="logo">EduHub</div>
      <ul className="nav-links">
        <li className="dropdown">
          <button onClick={toggleLoginDropdown} className="dropdown-btn">
            Login
          </button>
          {loginDropdownVisible && (
            <div className="dropdown-content">
              <Link to="/adminlogin">Admin Login</Link>
              <Link to="/studentlogin">Student Login</Link>
            </div>
          )}
        </li>
        <li>
          <button onClick={() => setSignUpForm(true)} className='Signup'>Sign Up</button>
        </li>
      </ul>
    </nav>
  );
     
};

export default Navbar;
