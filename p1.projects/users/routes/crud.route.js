const express = require('express');
const router = express.Router();
const app = express();

//local packages
const crudController = require('../controller/crud.controller');
router.post('/getdata', (req, res, next) => {
    crudController.getallUsers(req, res, next);
});

router.post('/deletedata', (req, res, next) => {
    crudController.deleteUsers(req, res, next);
});

router.post('/updatedata', (req, res, next) => {
    crudController.updateUsers(req, res, next);
});

module.exports = router;