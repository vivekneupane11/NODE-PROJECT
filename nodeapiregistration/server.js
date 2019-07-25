//Third party Packages
const mongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
require('dotenv').config();





//Local Packages
const userRoute = require('./routes/registration.route');





//Connect M-DB to ListenPort
const url = process.env.DATABASE_CONNECTION + process.env.DATABASE_NAME;
mongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    console.log("Database connected sucessfully");
    app.locals.database = db.db(process.env.DATABASE_NAME);
    //listening to server
    app.listen(process.env.PORT || 3000, () => {
        console.log("Sever has been started at port " + process.env.PORT);
    });
});





//Middleware to register database obj in req.db
app.use((req, res, next) => {
    req.db = app.locals.database;
    next();
});
app.use(userRoute);