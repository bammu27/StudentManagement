// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import StudentR from './Pages/StudentR.jsx';
import Admin from './Pages/Admin.jsx';
import Home  from './Pages/Home.jsx';
import Student from './Pages/Student.jsx';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studentR" element={<StudentR />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/student" element={<Student/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
