const User = require("../model/userModel");
const bcrypt = require("bcrypt");


module.exports.register = async (req, res, next) =>{
    try {
        const {username, email, password } = req.body;

        const usernameCheck = await User.findOne({username})
        if(usernameCheck){
            return res.json({
                msg:"Username already use, choose another one",
                stauts: false
            })
        }

        const emailCheck = await User.findOne({email});
        if(emailCheck){
            return res.json({
                msg:"Email already use, choose another one",
                stauts: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email, 
            username, 
            password: hashedPassword,
        })
        delete user.password;
        return res.json({
            status: true,
            user
        })

    } catch (error) {
        next(error)
    }

};

module.exports.login = async (req, res, next) =>{
    try {
        const {username, password } = req.body;

        const userCheck = await User.findOne({username})
        if(!userCheck){
            return res.json({
                msg:"Username or password incorrect",
                stauts: false
            })
        }

        const isPasswordValid = await bcrypt.compare(password, userCheck.password)
        if(!isPasswordValid){
            return res.json({
                msg:"Username or password incorrect",
                stauts: false
            })
        }
        delete userCheck.password;
        return res.json({
            status: true,
            userCheck
        })

    } catch (error) {
        next(error)
    }

};