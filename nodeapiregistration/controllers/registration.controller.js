//Third Party Packages
const bcrypt = require('bcrypt');


//Local Packages
const validation = require('./validation.controller');

//fun() to validate & register users
async function registerUser(req, res, next) {

    const myData = {
        name: "Vivek Neupane",
        email: "vivekneupane1@gmail.com",
        age: 20,
        address: "Kathmandu,Nepal",
        password: "123345566",
        contact: 12233445667,
    };

    //Validate user before register
    const { error } = validation.joivalidateUser(myData);
    if (error) return res.status(400).send(error.details[0].message);
    console.log(myData.email);

    //Check email Uniqueness
    const user = await req.db.collection('users').findOne({ email: myData.email });
    if (user) return res.status(400).send("Email already exist");


    //bcrypt password before registration
    const salt = await bcrypt.genSalt(10);
    myData.password = await bcrypt.hash(myData.password, salt);



    //Register Validated Users
    try {
        await req.db.collection('users').insertOne(myData, (err, result) => {
            if (err) throw err;
            console.log("User has jus been registered " + result.insertedCount);
            res.send("User has been registered");
        });
    } catch (err) {
        res.send(err);
    }

}




module.exports = {
    registerUser: registerUser
}