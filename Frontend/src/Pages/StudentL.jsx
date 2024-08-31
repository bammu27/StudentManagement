import React from 'react'
import { useState } from 'react';

import StudentForm from '../components/Student/StudentForm';
import { useNavigate } from 'react-router-dom';

const StudentL = () => {

  const [formData, setFormData] = useState({
    studentId:'',
    password: '',
  });

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
   const url = `http://localhost:5050/Student/login`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        // Parse the error response if available
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
  
      const data = await response.json();
      alert('Student login successful');
      navigate(`/student/${formData.studentId}`);
     
    } catch (error) {
      console.error('Error logging in student:', error.message);
      alert(`Failed to login student: ${error.message}`);
    }
  };

  
    





  return (
    
    <>
    <div>
    
    <StudentForm  formData={formData} type={'login'} handleChange={handleChange}  handleSubmit={handleSubmit}/>
    </div>
    </>
    



  )
}

export default StudentL