import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import StudentR from './Pages/StudentR.jsx';
import Admin from './Pages/Admin.jsx';
import Home from './Pages/Home.jsx';
import StudentL from './Pages/StudentL.jsx';
import AdminPortal from './Pages/AdminPortal.jsx';
import StudentPortal from './Pages/StudentPortal.jsx';
import UpdateStudent from './Pages/UpdateStudent.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studentR/:id" element={<StudentR />} />
          <Route path="/adminlogin" element={<Admin />} />
          <Route path="/adminportal/:id" element={<AdminPortal />} />
          <Route path="/studentlogin" element={<StudentL />} />
          <Route path="/student/:studentId" element={<StudentPortal />} />
          <Route path="/updateStudent/:AdminId/:studentId" element={<UpdateStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

