const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [ 3, 'Firstname must be at least 3 characters long' ],
        },
        lastname: {
            type: String,
            minlength: [ 3, 'Lastname must be at least 3 characters long' ],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [ /^\S+@\S+\.\S+$/, 'Please enter a valid email' ]
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },

    status: {
        type: String,
        enum: [ 'active', 'inactive' ],
        default: 'inactive',
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [ 3, 'Color must be at least 3 characters long' ],
        },
        plate: {
            type: String,
            required: true,
            minlength: [ 3, 'Plate must be at least 3 characters long' ],
        },
        capacity: {
            type: Number,
            required: true,
            min: [ 1, 'Capacity must be at least 1' ],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: [ 'car', 'motorcycle', 'auto' ],
        }
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], 

        }
    }
})
captainSchema.index({ "location.coordinates": "2dsphere" });
// Hash password before saving
captainSchema.statics.hashPassword = async function (password) {
    return await bcryptjs.hash(password, 10);
}

// Instance method to generate JWT token
captainSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Compare hashed password
captainSchema.methods.comparePassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

const captainModel = mongoose.model('Captain', captainSchema);
module.exports = captainModel;
