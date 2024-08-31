import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../css/AdminPortal.css'; // Create this CSS file for styling

const AdminPortal = () => {
  const { id } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students from the backend
    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://localhost:5050/Admin/allstudents/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error.message);
      }
    };

    fetchStudents();
  }, [students]);

  const handleDelete = async (studentId) => {

    const confirmed = window.confirm("Are you sure you want to delete this student? This action cannot be undone.");

    if (!confirmed) {
      // If the user clicks "Cancel", stop the deletion process
      return;

    }
    try {
      const response = await fetch(`http://localhost:5050/Admin/student/${id}/${studentId}`, {
        method: 'DELETE',
      });
     

      if (!response.ok ) {
        throw new Error('Failed to delete student');
      }
      // Remove the student from the state
      setStudents(students.filter(student => student.studentId !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error.message);
    }
  };

  return (
    <div className="admin-portal">
      <h1>Admin Portal</h1>
      <div className="student-list">
        {students.map(student => (
          <div key={student.studentId} className="student-card">
            <h3>{student.name}</h3>
            <p>Class: {student.class}</p>
            <div className="buttons">
              <Link to={`/updateStudent/${id}/${student.studentId}`} className="btn update">Update</Link>
              <Link to={`/student/${student.studentId}`} className="btn view">Show Details</Link>
              <button onClick={() => handleDelete(student.studentId)} className="btn delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="actions">
        <Link to={`/studentR/${id}`} className="btn create">Create Student</Link>
        <Link to="/" className="btn home">Home</Link>
      </div>
    </div>
  );
};

export default AdminPortal;
