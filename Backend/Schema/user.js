const mongoose = require("mongoose") 
const  bcrypt = require('bcryptjs')   

const userSchema = new mongoose.Schema({

    studentId:{
        type:String,
        required:true,
        unique:true


    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        validate: function(value){
            if(value.length < 8){
                throw new Error("Password should be of atleast 8 characters")
            }
        }
    },  
    }
)

userSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        return next(err);
    }
})

const Users = new mongoose.model('Users',userSchema)  

module.exports = Users

