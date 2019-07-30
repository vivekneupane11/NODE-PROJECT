//Third party packages
const express = require('express');
const server = express();

//local package
const mainapp = require('./app');


server.use(mainapp);


//listening to server
server.listen(process.env.PORT, () => {
    console.log("Sever has been started at port " + process.env.PORT);
});