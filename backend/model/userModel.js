const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        trim: true,
        validate: {
            validator: function (email) {
                return String(email)
                    .toLowerCase()
                    .match(
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                    )
            },
            message: (props) => `${props.value} is not a valid email address`
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: function (password) {
                return password.length >= 6;
            },
            message: `Password must be at least 6 characters long`,
        },
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        validate: {
            validator: function (value) {
                return value.length > 3; 
            },
            message: "Name must be longer than 3 characters",
        },
    },
    userType: {
        type: String,
        enum: ['retailer', 'wholesaler'],
        required: [true, "User type is required"],
        default: 'retailer'
    },
    businessName: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    businessType: {
        type: String,
        required: function() {
            return this.userType === 'wholesaler';
        }
    },
    profileImage: {
        type: String,
        default: ''
    }
}, {timestamps: true});

// Hash the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("user", userSchema);
module.exports = User;