import React, { useState } from 'react';
import '../css/StudentR.css'

const StudentR = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    image: null,
    adharCardPhoto: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="registration-form">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <label>Father's Name:</label>
          <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
        </div>

        <div>
          <label>Mother's Name:</label>
          <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} required />
        </div>

        <div>
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div>
          <label>Phone Number:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div>
          <label>Address:</label>
          <textarea name="address" value={formData.address} onChange={handleChange} required></textarea>
        </div>

        <div>
          <label>Upload Image:</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        </div>

        <div>
          <label>Upload Aadhar Card Photo:</label>
          <input type="file" name="adharCardPhoto" accept="image/*" onChange={handleChange} required />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentR;
