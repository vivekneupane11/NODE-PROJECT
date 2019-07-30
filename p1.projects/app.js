//Third party Packages

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodyparser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;



//Local Packages
const userRoute = require('./users/routes/registration.route');
const resetPasswordroutes = require('./users/routes/resetpassword.route');
const departmentRoutes = require('./department/department.route');
const usercrudRoute = require('./users/routes/crud.route');



//connect database
const url = process.env.DATABASE_CONNECTION + process.env.DATABASE_NAME;
mongoClient.connect(url, { useNewUrlParser: true }, async(err, db) => {
    try {
        if (err) throw err;
        console.log("Database connected sucessfully");
        app.locals.database = await db.db(process.env.DATABASE_NAME);

    } catch (err) {
        console.log("Database cant be connected");
    }


});

//Middleware to register database obj in req.db
app.use((req, res, next) => {
    req.db = app.locals.database;
    next();
});


//body-parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json()); //(FOR POST/PUT) //gets the data and encode it to json object//connecting to database
require('./helper/db.connect');
app.use(cors());



//  All local Routes
app.use(userRoute);
app.use('/resetpassword', resetPasswordroutes);
app.use(departmentRoutes);
app.use(usercrudRoute);
app.use('/', (req, res, next) => {
    res.send("Sorry!!No link like this.");
});

module.exports = app;