//Third Party Packages
const bcrypt = require('bcrypt');


//Local Packages
const validation = require('../../helper/validation.controller');
//func() to login validated user

async function loginUser(req, res, next) {
    try {
        //Validate user before login
        const { error } = validation.joivalidatelogin(req.body);
        if (error) return res.status(400).json({
            status: 400,
            message: {
                error: error.details[0].message,
                success: false

            }
        });

        //Check if email exist
        const loginuser = await req.db.collection('users').findOne({ email: req.body.email });
        if (!loginuser) return res.status(400).json({
            status: 400,
            message: {
                error: "Invalid Email",
                success: false

            }
        });
        //check if password match
        isPasswordValid = await bcrypt.compare(req.body.password, loginuser.password);
        if (!isPasswordValid) return res.status(400).json({
            status: 400,
            message: {
                error: "Invalid Password",
                success: false

            }
        });
        res.status(200).json({
            status: 200,
            message: {
                error: null,
                data: loginuser,
                success: true

            }
        });

    } catch (err) {
        res.status(400).json({
            status: 400,
            message: {
                error: err,
                success: false

            }
        });
    }
}






module.exports = {

    loginUser: loginUser
}