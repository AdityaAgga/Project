const mongoose = require("mongoose")

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
        validate: {
          validator: function (value) {
            return value.length > 3; 
          },
          message: "Name must be longer than 3 characters",
        },
      },
},{timestamps:true});

const User = mongoose.model("user", userSchema);
module.exports = User;