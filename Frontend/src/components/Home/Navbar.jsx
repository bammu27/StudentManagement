// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/home.css'


const Navbar = () => {
  return (
    <nav>
        <div className='Logo'>EduHub</div>
      <ul>
        
        <li><Link to="/studentR">Student Registration</Link></li>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/student/:sid">Student Portal</Link></li>
        <li><Link to="/admin/:aid">Admin Portal</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
