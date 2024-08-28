const Admin = require('../models/admin.js')
const Student = require('../models/students.js');

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
        const admin = await Admin.findOne({AdminId});

        if (admin) {
            const student = await Student.findOneAndUpdate(
                { studentId: studentId, class: admin.class }, // Ensure the student belongs to the same class
                req.body, // The updated data
                { new: true, runValidators: true } // Options: return the updated document and run validators
            );

            if (student) {
                res.status(200).send(student);
            } else {
                res.status(404).send("Student not found");
            }
        } else {
            res.status(403).send("You are not authorized to update this student");
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Delete Student
module.exports.deleteStudent = async (req, res) => {
    const { AdminId, studentId } = req.params;

    try {
        const admin = await Admin.findOne({AdminId});

        if (admin) {
            const student = await Student.findOneAndDelete({ studentId: studentId, class: admin.class });

            if (student) {
                res.status(200).send({ message: "Student deleted successfully" });
            } else {
                res.status(404).send("Student not found");
            }
        } else {
            res.status(403).send("You are not authorized to delete this student");
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};