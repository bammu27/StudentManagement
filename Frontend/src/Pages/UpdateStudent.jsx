import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/StudentR.css';

const UpdateStudent = () => {
  const [formData, setFormData] = useState({
    studentId: '',
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
  const { AdminId, studentId } = useParams();  // `id` refers to adminId or some identifier
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:5050/student/${studentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student details');
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching student:', error);
        alert(`Failed to fetch student details: ${error.message}`);
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `http://localhost:5050/Admin/student/${AdminId}/${studentId}`;

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      alert('Student updated successfully');
      navigate(`/adminportal/${AdminId}`); // Redirect to AdminPortal after successful update
    } catch (error) {
      console.error('Error updating student:', error);
      alert(`Failed to update student: ${error.message}`);
    }
  };

  return (
    <div className="registration-form">
      <h2>Update Student</h2>
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <label>Student ID:</label>
          <input type="text" name="studentId" value={formData.studentId}  required />
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
          <input type="text" name="class" value={formData.class}  required />
        </div>

        <div>
          <label>Address:</label>
          <textarea name="Address" value={formData.Address} onChange={handleChange} required></textarea>
        </div>

        <div>
          <label>Upload Image:</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateStudent;
