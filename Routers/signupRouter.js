//external imports
const express = require('express');

//internal imports
const signupController = require('../Controllers/signupController');
const codeConfirmController = require('../Controllers/codeConfirmController');


//configuration 
const router = express.Router();

router.post('/adduser',signupController);

router.post('/confirmcode',codeConfirmController);

module.exports = router;