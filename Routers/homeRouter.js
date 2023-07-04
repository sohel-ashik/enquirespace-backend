//external imports
const express = require('express');
//internal imports
const questionPostController = require('../Controllers/questionPostController');
const answerPostController = require('../Controllers/answerPostController');
const randomPosts = require('../Controllers/randomPosts')
const individualQuestion = require('../Controllers/individualQuestionGet')
const viewAdder = require('../Controllers/viewAdder');
const upDownAdder = require('../Controllers/upDownAdder');
const getVotesController = require('../Controllers/getVotesController');

//configuration 
const router = express.Router();

// queries
router.get('/',randomPosts);
router.get('/individual/question',individualQuestion);
router.get('/votes',getVotesController);

// post a question 
router.post('/ask',questionPostController);
// post an answer
router.post('/post/answer',answerPostController);
router.post('/viewadder',viewAdder);
router.post ('/updownadder',upDownAdder);

//error handler
router.use((req,res)=>{
    res.status(500).json({error: 'Something is wrong'});
})

module.exports = router;