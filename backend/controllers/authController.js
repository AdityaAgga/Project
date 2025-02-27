const User = require("../model/userModel")
const bcrypt = require("bcrypt");
// User Registration Controller
exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (password.length < 8) {
            return res.status(403).json({
                status: "error",
                message: "Password must be at least 8 characters long"
            })
        } else {
            const hash = await bcrypt.hash(password, 12);
            const user = await User.create({ email, password: hash });
            if (!user) {
                return res.status(503).json({
                    status: "error",
                    message: "Registration Failed",
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Registration Successful"
            })
        }


    }
    catch (err) {
        console.log(err);
        res.status(502).json({
            message: err
        })
    }
}

// User Login Controller
exports.login = async (req, res, next) => {
try{
    const {email, password}=req.body;
    const user= await User.findOne({email})
    if(!user)
        {
            return res.status(403).json({
                status: "error",
                message:"Invalid email"
            })
        }
        const isValidPassword= await bcrypt.compare(password, user.password)
        if(!isValidPassword)
        {
            return res.status(403).json({
                status: "error",
                message:"Invalid Password"
            })
        }
        const token = createToken(user._id);
        return res.status(200).json(
            {
                status: "success",
                message: "logged in successfully",
                token: token
            }
        )
}
catch(err)
{
    return res.status(503).json(
        {
            status: "error",
            message: "Error occured"
        }
    )
}
}
