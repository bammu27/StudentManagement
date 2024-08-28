const mongoose = require("mongoose")
const dotenv = require('dotenv')
dotenv.config()
const nodemailer = require('nodemailer');
const transporter = require('../email.js')



const studentSchema = new mongoose.Schema({

    studentId:{
        type:String,
        required:true,
        unique:true
    },

    name:{
        type:String,
        required:true
    },
    DateOfBirth:{
        type:Date,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        required:true,

        validate: function(value){

            if(value.toString().length != 10){
                throw new Error("Phone number should be of 10 digits")
            }
        }

    },
    Email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        validate: function(value){
            if(!value.includes('@')){
                throw new Error("Email should contain @")

            }
        }
    },
    FatherName:{
        type:String,
        required:true
    },

    MotherName:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },


    }

)


studentSchema.pre('save',function(next){

    if( !this.DateOfBirth instanceof Date && !isNaN(this.DateOfBirth)){

        this.DateOfBirth   = new Date(this.DateOfBirth+"T00:00:00.000Z")
        

    }
    next()
})

studentSchema.post('save',function(next){

    let mailOptions = {
        from: process.env.MY_EMAIL, // Sender's email address
        to: this.Email, // Recipient's email address (can be multiple, comma-separated)
        subject: 'Your syudent id', // Email subject
        text: `Hello, welcome to out school: \n your srudent id ${this.studentId}`, // Plain text message
        // You can also use `html: '<b>Hello, world!</b>'` to send an HTML email
    };
    
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    
   
    
})




const Student = new mongoose.model('Students',studentSchema)    
module.exports = Student