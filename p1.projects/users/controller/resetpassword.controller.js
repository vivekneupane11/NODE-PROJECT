//Third party package
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

async function sendresetlinktoemail(req, res, next) {


    try {
        //check if user exist in our database
        const user = await req.db.collection('users').findOne({ email: req.body.email });
        if (!user) return res.status(400).json({
            status: 400,
            message: {
                error: "The email you have inserted is invalid one!!",
                success: false
            }
        });


        //generate random token
        var token = crypto.randomBytes(24).toString('hex');
        //Sending mail to valid users
        let transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_TRANSPORT,
                pass: process.env.PASS_TRANSPORT
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_TRANSPORT,
            to: user.email,
            subject: 'RESETING PASSORD IN EMPLOYEE MANAGEMENT SYSTEM',
            html: `<h2> !!HELLO ${user.name} </h2>
                <h4> Go through link below to reset password</h4>
                <a href=http://localhost:3000/reset/${token}/${user.email}>CLICK ME </a>
                <p> You have received this email because you or someone elsee has tried to reset
                their password using this mail in Employee Management System</p>
        `
        };


        await transporter.sendMail(mailOptions, (error, info) => {
            if (err) return res.status(500).json({
                status: 500,
                message: {
                    error: "Failed to send Mail" + err,
                    success: false
                }
            });
        });

        //save users verify token and its expiry date in our database

        await req.db.collection('users').updateOne({ email: user.email }, {
            $set: {
                resetpasswordtoken: token,
                resetpasswordexpiry: Date.now() + 3600000 //1hours added

            }
        }, (err, result) => {
            if (err) {
                res.status(401).json({
                    status: 401,
                    message: {
                        error: "Problem while maintaining token",
                        success: false
                    }
                });
            } else {
                console.log("Data has been updated");
            }

        });


    } catch (err) {
        res.json({
            message: {
                error: "Problem in sending email",
                success: false
            }
        });
    }



    res.json({
        status: 200,
        message: {
            details: "Email sent successfully",
            success: true
        }
    });
}

//Verify token to reset password
async function verifytoken(req, res) {


    try {
        const nowTime = await Date.now();
        const validtokenuser = await req.db.collection('users').findOne({ email: req.body.email, resetpasswordexpiry: { $gt: nowTime }, resetpasswordtoken: req.body.token });
        console.log(validtokenuser);
        if (validtokenuser) {
            res.json({
                status: 200,
                message: {
                    detail: "Found it",
                    success: true
                }
            });
        } else {
            res.status(400).json({
                status: 400,
                message: {
                    error: "Sorry no valid token holder found",
                    success: false
                }
            });
        }

    } catch (err) {
        res.status(400).json({
            status: 400,
            message: {
                error: "No valid token",
                success: false
            }
        });
    }
}

//update  Password after reset password

async function updatePassword(req, res) {
    try {
        //bcrypt password before registration
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        var myquery = { email: req.body.email };
        var newvalues = { $set: { password: req.body.password } };
        await req.db.collection("users").updateOne(myquery, newvalues, function(err, result) {
            if (err) throw err;
            res.json({
                status: 200,
                detail: {
                    message: "Password updated sucessfully",
                }
            });

        });

    } catch (err) {
        res.status(500).json({
            status: 500,
            details: {
                error: "Internal server error",
                success: false
            }
        });

    }

}

module.exports = {
    sendresetlinktoemail: sendresetlinktoemail,
    verifytoken: verifytoken,
    updatePassword: updatePassword
};