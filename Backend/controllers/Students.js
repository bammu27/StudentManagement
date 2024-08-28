const User = require('../models/user.js');
const Student = require('../models/students.js')
const bcrypt = require('bcryptjs')


exports.SignUp = async(req,res)=>{
    try{

        const student = await  Student.findOne({ studentId: req.body.studentId })
        if(student){
            const user = new User({studentId:req.body.studentId,email:student.Email,password:req.body.password})
            await user.save()
            res.status(201).send(" user is created ")
        }
        else{
            res.status(403).send("user is not autherized")
        }
    }
    catch(error){

            res.status(500).send({'message':error.message})
    }

}


exports.login = async (req, res) => {
    try {
        const student = await User.findOne({ studentId: req.body.studentId });
        if (student) {
            const isMatch = await bcrypt.compare(req.body.password, student.password);
            if (isMatch) {
                res.status(200).send("Login successful");
            } else {
                res.status(401).send("Login failed: Incorrect password");
            }
        } else {
            res.status(404).send("Student not found");
        }
    } catch (error) {
        console.error("Error during student login:", error);
        res.status(500).send({ message: error.message });
    }
}


module.exports.getStudentById = async (req, res) => {
    try {
        const studentId = req.params.studentId; // Get the studentId from the request parameters
        const student = await Student.findOne({ studentId }); // Find the student by studentId

        if (student) {
            res.status(200).send(student); // Send the student data if found
        } else {
            res.status(404).send("Student not found"); // Send a 404 error if the student is not found
        }
    } catch (error) {
        res.status(500).send({ message: error.message }); // Send a 500 error if something goes wrong
    }
}
