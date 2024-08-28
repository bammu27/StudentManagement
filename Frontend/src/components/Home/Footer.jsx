import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>EduHub</h2>
        </div>

        <div className="footer-address">
          <h4>Contact Us</h4>
          <p>123 Learning Street</p>
          <p>Education City, EC 12345</p>
          <p>Email: info@yourschool.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <ul className="social-icons">
            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 EduHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;



