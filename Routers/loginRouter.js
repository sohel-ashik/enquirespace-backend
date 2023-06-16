//external imports
const express = require('express');

//internal imports
const loginController = require('../Controllers/loginController');


const router = express.Router();

router.post('/',loginController);

module.exports = router;