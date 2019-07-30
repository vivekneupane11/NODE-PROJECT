const express = require('express');
const router = express.Router();
const app = express();


//local packages
const userregistrationController = require('../controller/registration.controller');
const userloginController = require('../controller/login.controller');

//POST  route to register user
router.post('/register', (req, res, next) => {

    userregistrationController.registerUser(req, res, next);
});
//  POST route to login user
router.post('/login', (req, res, next) => {
    userloginController.loginUser(req, res, next);
});


module.exports = router;