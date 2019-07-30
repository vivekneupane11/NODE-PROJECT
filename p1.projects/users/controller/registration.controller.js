//Third Party Packages
const bcrypt = require('bcrypt');


//Local Packages
const validation = require('../../helper/validation.controller');

//fun() to validate & register users
async function registerUser(req, res, next) {

    try {
        //Validate user before register
        const { error } = validation.joivalidateUser(req.body);
        if (error) return res.status(400).json({
            status: 400,
            message: {
                error: error.details[0].message,
                success: false
            }
        });



        //Check email Uniqueness
        const user = await req.db.collection('users').findOne({ email: req.body.email });
        if (user) return res.status(400).json({
            status: 400,
            message: {
                error: "Email already taken!!",
                success: false
            }
        });


        //bcrypt password before registration
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);



        //Register Validated Users

        await req.db.collection('users').insertOne(req.body, (err, result) => {
            if (err) return res.status(400).json({
                status: 400,
                message: {
                    error: err,
                    success: false

                }
            });
            console.log("User has jus been registered " + result.insertedCount);
            res.status(200).json({
                status: 200,
                message: {
                    error: null,
                    data: result.ops,
                    success: true

                }
            });
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
    registerUser: registerUser
}