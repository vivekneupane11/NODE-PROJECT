//Third party package
const joi = require('joi');

//Validation Function using ***JOI***
function joivalidateUser(userinfo) {

    const schema = {
        name: joi.string().min(5).max(50).required(),
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required(),
        age: joi.number().min(1).max(150).required(),
        address: joi.string().min(5).max(255).required(),
        contact: joi.number().required()

    };
    return joi.validate(userinfo, schema);
}

function joiloginUser(logininfo) {
    const schema = {
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required()


    };
    return joi.validate(logininfo, schema);
}

function joivalidatedepartment(departmentInfo) {
    const schema = {

        name: joi.string().min(2).required()
    }
    return joi.validate(departmentInfo, schema);
}
module.exports = {
    joivalidatedepartment: joivalidatedepartment,
    joivalidateUser: joivalidateUser,
    joivalidatelogin: joiloginUser
}

// regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)


// {
//     "name":"Nepal",
// "email": "nepal@gmail.com",
// "password": "123345566",
//     "age":22,
//     "address":"Nepal",
//     "contact":9887665443
// }