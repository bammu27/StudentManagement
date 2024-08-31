import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../css/StudentPortal.css'; // Import CSS file

const StudentPortal = () => {
  const { studentId } = useParams(); // Get studentId from URL parameters
  const [student, setStudent] = useState(null); // State to hold student data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state


  useEffect(() => {
    // Fetch student details
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:5050/student/${studentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student details');
        }
        const data = await response.json();
        setStudent(data); // Set student data

        setLoading(false); // Set loading to false
      } catch (error) {
        setError(error.message); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchStudent();
  }, [studentId]);

  if (loading) {
    return <div className="loading">Loading...</div>; // Show loading state
  }

  if (error) {
    return <div className="error">{error}</div>; // Show error state
  }

  return (
    <>
    
    <div className="student-detail-container">
      <div className='back'>

      <Link to='/' className='back-btn'>Back</Link> 
      </div>
   
     
      <h2>Student Details</h2>
      {student && (
        <div className="student-card">
          {
            student.imagePath ?
           (<img
            src={`http://localhost:5050/uploads/${student.imagePath}`}
            alt={`${student.name}'s avatar`}
            className="student-image"/>
          ):
            (
              <img
            src={`http://localhost:5050/uploads/avatar.png`}
            alt={`${student.name}'s avatar`}
            className="student-image" />
            )

      }
          <div className="student-info">
            <div className='stundent-content'>
            <p><strong>Student ID:</strong> {student.studentId}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Father's Name:</strong> {student.FatherName}</p>
            <p><strong>Mother's Name:</strong> {student.MotherName}</p>
            <p><strong>Date of Birth:</strong> {new Date(student.DateOfBirth).toLocaleDateString()}</p>
            <p><strong>Email:</strong> {student.Email}</p>
            <p><strong>Phone:</strong> {student.Phone}</p>
            <p><strong>Address:</strong> {student.Address}</p>
            <p><strong>Class:</strong> {student.class}</p>
          </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default StudentPortal;
