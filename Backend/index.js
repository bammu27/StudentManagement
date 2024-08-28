const express = require('express');
require('./db.js'); 
const bcrypt = require('bcryptjs');

const router = express.Router()
// controller
const adminController = require('./controllers/AdminPost.js')
const adminGet = require('./controllers/AdminGet.js')
const studentController = require('./controllers/Students.js')


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Add New Student (Admin Authorization Required)
router.post('/newstudent/:AdminId', adminController.addStudent);

// Admin Login
router.post('/login', adminController.login);

// all students in class
router.get('/allstudents/:AdminId',adminGet.getAllStudents)

//Update a student (Admin Authorization Required)
router.put('/student/:AdminId/:studentId', adminGet.updateStudent);

// Delete a student (Admin Authorization Required)
router.delete('/student/:AdminId/:studentId', adminGet.deleteStudent);


app.use('/Admin',router);



//new Admin
app.post('/newAdmin', adminController.newAdmin);

app.get('/student/:studentId', studentController.getStudentById);


// Student Login
app.post('/Student/login', studentController.login);

app.post('/Student/Signup',studentController.SignUp)





// Start Server
app.listen(5050, () => {
    console.log("Server is running on http://localhost:5000");
});
