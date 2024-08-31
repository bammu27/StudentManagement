const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    DateOfBirth: {
        type: Date,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    class:{
        type:String,
        required:true
    },
    Phone: {
        type: Number,
        required: true,
        validate: function (value) {
            if (value.toString().length !== 10) {
                throw new Error("Phone number should be of 10 digits");
            }
        }
    },
    Email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate: function (value) {
            if (!value.includes('@')) {
                throw new Error("Email should contain @");
            }
        }
    },
    AdminId: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        validate: function (value) {
            if (value.length < 8) {
                throw new Error("Password should be of at least 8 characters");
            }
        }
    }
});

// Pre-save middleware to handle DateOfBirth and password hashing
AdminSchema.pre('save', async function (next) {
    // Convert DateOfBirth to Date object if it's a string
    if (typeof this.DateOfBirth === 'string') {
        this.DateOfBirth = new Date(this.DateOfBirth + "T00:00:00.000Z");
    }

    // Ensure the date is valid
    if (!(this.DateOfBirth instanceof Date) || isNaN(this.DateOfBirth)) {
        return next(new Error('Invalid DateOfBirth'));
    }

    // Hash the password if it's new or modified
    if (this.isModified('Password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.Password = await bcrypt.hash(this.Password, salt);
            next();
        } catch (err) {
            return next(err);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('Admin', AdminSchema);
