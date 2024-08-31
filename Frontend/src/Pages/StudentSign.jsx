import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import StudentForm from '../components/Student/StudentForm';

const StudentSign = ({setSignUpForm}) => {

  const [formData, setFormData] = useState({
    studentId:'',
    password: '',
  });


  const navigate = useNavigate();

  const handleChange = (e) => {

    const { name, value } = e.target;
    
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const url = `http://localhost:5050/Student/SignUp`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // If response is not OK, fetch error message properly
      if (!response.ok) {
        const errorData = await response.json(); // Attempt to parse the error response
        throw new Error(errorData.message || 'Something went wrong'); // Use a fallback error message
      }
  
      
      
      alert('Student signed up successfully');
      navigate(`/studentlogin`);
      
    } catch (error) {
      console.error('Error logging in student:', error);
      alert(`Failed to sign up student: ${error.message}`);
    }
  };
  

  const closePopup = () => {
    setSignUpForm(false);

  }

    


  return (
    
    <>
    <div style={{display:'flex', justifyContent:'flex-end' ,margin:'20px'}}>
    <button className="close-btn" onClick={closePopup} style={{color:'black',padding:'5px',fontWeight:'bold' ,Color:'red',fontSize:'1.2rem'}}>X</button>
    </div>
    <StudentForm  formData={formData} type={'Signup'} handleChange={handleChange}  handleSubmit={handleSubmit} />
    
    </>
    

  )
}

export default StudentSign