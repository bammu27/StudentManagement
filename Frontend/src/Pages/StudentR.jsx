import React, { useState } from 'react';
import '../css/StudentR.css'
import { Link, useParams } from 'react-router-dom';

const StudentR = () => {
  const [formData, setFormData] = useState({
    studentId:'',
    name: '',
    FatherName: '',
    MotherName: '',
    DateOfBirth: '',
    Email: '',
    Phone: '',
    Address: '',
    class: '',
    image: null,
    
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `http://localhost:5050/Admin/newstudent/${id}`; // Use template literal correctly

    const formDataToSend = new FormData(); // Use FormData to send file
    Object.keys(formData).forEach(key => {
      if (key === 'image') {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formDataToSend, // Send FormData instead of JSON
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      alert('Student added successfully');
      setFormData({

        studentId:'',
        name: '',
        FatherName: '',
        MotherName: '',
        DateOfBirth: '',
        Email: '',
        Phone: '',
        Address: '',
        class: '',
        image: null,
      });
      
    } catch (error) {
      console.error('Error adding student:', error);
      alert(`Failed to add student: ${error.message}`);
    }
  };

   


    // Handle form submission
   
  return (
    <div className="registration-form">
      <Link to={`/adminportal/${id}`} className="admin-link" >{id}</Link>
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <label>Student ID:</label>
          <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} required />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <label>Father's Name:</label>
          <input type="text" name="FatherName" value={formData.FatherName} onChange={handleChange} required />
        </div>

        <div>
          <label>Mother's Name:</label>
          <input type="text" name="MotherName" value={formData.MotherName} onChange={handleChange} required />
        </div>

        <div>
          <label>Date of Birth:</label>
          <input type="date" name="DateOfBirth" value={formData.DateOfBirth} onChange={handleChange} required />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="Email" value={formData.Email} onChange={handleChange} required />
        </div>

        <div>
          <label>Phone Number:</label>
          <input type="tel" name="Phone" value={formData.Phone} onChange={handleChange} required />
        </div>

        <div>
          <label>Class:</label>
          <input type="text" name="class" value={formData.class} onChange={handleChange} required />
        </div>

        <div>
          <label>Address:</label>
          <textarea name="Address" value={formData.Address} onChange={handleChange} required></textarea>
        </div>

        <div>
          <label>Upload Image:</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        </div>

        

        <button type="submit">Submit</button>
      </form>
    </div>
  );

};

export default StudentR;
