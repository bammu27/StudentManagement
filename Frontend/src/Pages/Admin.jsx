import React, { useState } from "react";
import "../css/Admin.css"; // Create this CSS file for styling
import { useNavigate } from "react-router-dom";


const Admin= () => {
  const [formData, setFormData] = useState({

    AdminId: "",
    Password: "",
  });

  const [alert, setAlert] = useState('');

  const[showPassword, setShowPassword] = useState(false);

  function togglePassword() {

    setShowPassword(!showPassword);

  }

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:5050/Admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message);
        });
      }
      return response.json();
    })
    .then((data) => {
      const adminId = data.AdminId; // Extract AdminId from response
      if (adminId) {
        setAlert("Login Successful");
        navigate(`/adminportal/${adminId}`); // Navigate to admin portal with AdminId
      } else {
        throw new Error("AdminId not found in response");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      
      setTimeout(() => {
        setAlert(error.message);
        
      }, 1000);

      setTimeout(() => {
        setAlert('');
      }, 5000);
    });
  };
  

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="admin-form">
        <h2 className="form-title">Admin Login</h2>

        <label htmlFor="AdminId">Admin ID</label>
        <input
          type="text"
          id="AdminId"
          name="AdminId"
          value={formData.AdminId}
          onChange={handleChange}
          placeholder="Lilly27"
          required
        />

      
        <label htmlFor="Password">
          Password
          <button type="button" 
                className="toggle-btn"
                onClick={togglePassword}>
                {showPassword ? "Hide" : "Show"}
          </button>
          </label>
        <input
          type={showPassword ? "password" : "text"}
          id="Password"
          name="Password"
          value={formData.Password}
          onChange={handleChange}
          placeholder="Enter a strong password"
          required
        />

        <button type="submit" className="submit-btn">
          Login
        </button>
        {alert && <div className="alert">{alert}</div>}
      </form>
      
    </div>
  );
};

export default Admin;
