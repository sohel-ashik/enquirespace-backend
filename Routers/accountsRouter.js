//external imports
const express = require('express');

//internal imports
const profileController = require('../Controllers/accountsControllers/profileController');
const questionController = require('../Controllers/accountsControllers/questionController');

//configurations
const router = express.Router();

router.get('/profile',profileController);
router.get('/questions',questionController);


module.exports = router;
