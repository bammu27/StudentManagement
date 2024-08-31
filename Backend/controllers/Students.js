const User = require('../Schema/user.js');
const Student = require('../Schema/students.js')
const bcrypt = require('bcryptjs')


exports.SignUp = async(req,res)=>{
    try{
        
        
        const studentId = req.body.studentId;
        
        const student = await  Student.findOne({ studentId })

        if(student){
            const user = new User({studentId:req.body.studentId,email:student.Email,password:req.body.password})
            await user.save()
            res.status(201).json({'message':"User created successfully"})
        }
        else{
            res.status(403).json({'message':"your not authrized to sign up"})
        }
    }
    catch(error){

            res.status(500).json({'message':error.message})
    }

}


exports.login = async (req, res) => {
    studentId = req.body.studentId;
    try {
      const student = await User.findOne({ studentId });
      if (student) {
        const isMatch = await bcrypt.compare(req.body.password, student.password);
        if (isMatch) {
          res.status(201).json({ message: "Login successful" });
        } else {
          res.status(401).json({ message: "Login failed: Incorrect password" });
        }
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } catch (error) {
      console.error("Error during student login:", error);
      res.status(500).json({ message: error.message });
    }
  }


module.exports.getStudentById = async (req, res) => {
    try {
        const studentId = req.params.studentId; // Get the studentId from the request parameters
        const student = await Student.findOne({ studentId }); // Find the student by studentId

        if (student) {
            res.status(200).json(student); // Send the student data if found
        } else {
            res.status(404).json({ message: "student not found " }); // Send a 404 error if the student is not found
        }
    } catch (error) {
        res.status(500).send({ message: error.message }); // Send a 500 error if something goes wrong
    }
}
