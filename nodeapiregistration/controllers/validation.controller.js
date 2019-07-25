//Third party package
const joi = require('joi');

//Validation Function using ***JOI***
function joivalidateUser(userinfo) {

    const schema = {
        name: joi.string().min(5).max(50).required(),
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required(),
        age: joi.number().min(1).max(150),
        address: joi.string().min(5).max(255),
        contact: joi.number()

    };
    return joi.validate(userinfo, schema);
}

module.exports = {
    joivalidateUser: joivalidateUser
}

// regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)