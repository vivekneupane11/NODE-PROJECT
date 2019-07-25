const express = require('express');
const router = express.Router();
const app = express();


//local packages
const registrationController = require('../controllers/registration.controller');

router.get('/register', (req, res, next) => {
    registrationController.registerUser(req, res, next);
});


module.exports = router;