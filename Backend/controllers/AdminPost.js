
const Admin = require('../Schema/admin.js')
const Student = require('../Schema/students.js');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');




exports.addStudent = async (req, res) => {
    try {
        // Check admin authorization
        const admin = await Admin.findOne({ AdminId: req.params.AdminId });

       
        
        if (!admin || admin.class !== req.body.class) {
            // If there was an uploaded file, delete it
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.error('Error deleting file:', err);
                });
            }
            return res.status(403).send("You are not authorized to add a student");
        }

        
        // Proceed with student creation if authorized
        const studentData = req.body;
        
        // If an image was uploaded, add its path to studentData
        if (req.file) {

             let relativePath = path.relative(__dirname, req.file.path);
    
    
            relativePath = relativePath.replace(/\\/g, '/');
    
            
            studentData.imagePath = relativePath;
        }

        const student = new Student(studentData);
        await student.save();

        res.status(201).json({ message: "Student is added successfully", student });
    } catch (error) {
        // If there was an error, delete the uploaded file if it exists
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }
        console.error("Error adding student:", error);
        res.status(500).json({ message: error.message });
    }
}




exports.login = async (req, res) => {
    try {
        const admin = await Admin.findOne({ AdminId: req.body.AdminId });
        if (admin) {
            const isMatch = await bcrypt.compare(req.body.Password, admin.Password);
            if (isMatch) {
                
                res.status(200).json(admin)
            } else {
                res.status(401).json({ message: "Login failed: Incorrect password" });
            }
        } else {
            res.status(404).json({ message: "Admin not found" });
        }
    } catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).json({ message: error.message });
    }
};



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