const Admin = require('../Schema/admin.js')
const Student = require('../Schema/students.js');
const User = require('../Schema/user.js');
const fs = require('fs');
const path = require('path');

module.exports.getAllStudents = async (req, res) => {
    const AdminId = req.params.AdminId;

    try {
        const admin = await Admin.findOne({AdminId});

        if (admin) {
            const students = await Student.find({ class: admin.class });
            res.status(200).send(students);
        } else {
            res.status(403).send("Admin does not exist");
        }
    } catch (error) {
        console.error("Error:", error.message);  // Log only the message
        res.status(500).send({ message: "An error occurred" });
    }
}


module.exports.updateStudent = async (req, res) => {
    const { AdminId, studentId } = req.params;

    try {
        
        const admin = await Admin.findOne({ AdminId });
        if (!admin) {
            return res.status(403).send("You are not authorized to update this student");
        }

        const student = await Student.findOneAndUpdate(
            { studentId: studentId, class: admin.class },
            req.body,
            { new: true, runValidators: true }
        );

        if (student) {
            res.status(200).send(student);
        } else {
            res.status(404).send("Student not found");
        }
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).send({ message: error.message });
    }
};


// Delete Student
module.exports.deleteStudentAndUser = async (req, res) => {
    const { AdminId, studentId } = req.params;

    try {
        // Find the admin
        const admin = await Admin.findOne({ AdminId });

        if (!admin) {
            return res.status(403).send("You are not authorized to delete this student");
        }

        // Find and delete the student
        const student = await Student.findOneAndDelete({ studentId: studentId, class: admin.class });

        if (!student) {
            return res.status(404).send("Student not found");


        }

        const user = await User.findOneAndDelete({ studentId: studentId });


        
        // Escape the backslashes to create a valid JavaScript string
        
           
        if (student.imagePath) {
            // Adjust the path accordingly
            const filePath = path.join(__dirname, student.imagePath);
            console.log(filePath)
            fs.unlink(filePath, (err) => {
                if (err) {
                    return res.status(403).send('Error deleting image: ' + err.message);
                } else {
                    console.log('Image deleted successfully');
                }
            });
        }


        if (user) {
           return  res.status(200).send({ message: "Student and associated user deleted successfully" });
        } else {
            return  res.status(200).send({ message: "Student deleted, but no associated user found" });
        }

        
     
        

        // Delete the user associated with the student
       

    } catch (error) {
        console.error('Error deleting student and user:', error);
        res.status(500).send({ message: error.message });
    }
};