//external imports
const express = require('express');

//internal imports
const profileController = require('../Controllers/accountsControllers/profileController');
const questionController = require('../Controllers/accountsControllers/questionController');
const answerGetController = require('../Controllers/accountsControllers/answerController')
const editProfile = require('../Controllers/accountsControllers/editProfileController');
const tokenPayController = require('../Controllers/accountsControllers/tokenPayController');

//configurations
const router = express.Router();

router.get('/profile',profileController);
router.get('/questions',questionController);
router.get('/answers', answerGetController);
router.post('/edit',editProfile);
router.post('/tokenpay',tokenPayController)


module.exports = router;
