
const Admin = require('../models/admin.js')
const Student = require('../models/students.js');



exports.addStudent = async (req, res) => {
    try {
        const admin = await Admin.findOne({ AdminId: req.params.AdminId });
        if (admin && admin.class===req.body.class) {
            const student = new Student(req.body);
            await student.save();
            res.status(200).send("Student is added successfully");
        } else {
            res.status(403).send("You are not authorized to add a student");
        }
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).send({ message: error.message });
    }

}

exports.login = async (req, res) => {
    try {
        const admin = await Admin.findOne({ AdminId: req.body.AdminId });
        if (admin) {
            const isMatch = await bcrypt.compare(req.body.password, admin.password);
            if (isMatch) {
                res.status(200).send("Login successful");
            } else {
                res.status(401).send("Login failed: Incorrect password");
            }
        } else {
            res.status(404).send("Admin not found");
        }
    } catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).send({ message: error.message });
    }
}


exports.newAdmin = async (req, res) => {
    try {
        const admin = new Admin(req.body);
        await admin.save();
        res.status(201).send("Admin is added successfully");
    } catch (error) {
        console.error("Error adding admin:", error);
        res.status(500).send({ message: error.message });
    }
}