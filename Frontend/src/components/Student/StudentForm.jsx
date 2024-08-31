import React, { useState } from "react";
import "../../css/Student.css";

const StudentForm = ({ formData, type, handleChange, handleSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }
  return (
    <div className="Container">
      <div calssName="StudentLogin">
        <form className="student-form" onSubmit={handleSubmit}>
          <h2>Student {type}</h2>
          <div className="form-input">
            <label>Student ID:</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-input">
            <label>Password:   
              
              <button type="button" 
                className="toggle-btn"
                onClick={togglePassword}>
                {showPassword ? "Hide" : "Show"}
                
            </button>

            </label>

            <input
              type={showPassword ? "password" : "text"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password should be greater than 8 letter"
              required
            />

           
          </div>
          <button className="submit-btn"> {type}</button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
