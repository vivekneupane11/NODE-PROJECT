const express = require('express');
const router = express.Router();
const app = express();


//Local Packages
const resetpasswordController = require('../controller/resetpassword.controller');





//POST route to reset Password
router.post('/sendlinktoemail', (req, res, next) => {
    resetpasswordController.sendresetlinktoemail(req, res, next);
});

router.post('/verifytoken', (req, res) => {
    resetpasswordController.verifytoken(req, res);
});

router.post('/updatepassword', (req, res) => {
    resetpasswordController.updatePassword(req, res);
});


module.exports = router;