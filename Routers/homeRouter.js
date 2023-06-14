//external imports
const express = require('express');
//internal imports
const questionPostController = require('../Controllers/questionPostController');
const answerPostController = require('../Controllers/answerPostController');

//configuration 
const router = express.Router();

// queries
router.get('/', (req,res)=>{
    res.status(200).json({msg: "Home is getting you...."});
})

// post a question 
router.post('/ask',questionPostController);
// post an answer
router.post('/post/answer',answerPostController);

//error handler
router.use((req,res)=>{
    res.status(500).json({error: 'Something is wrong'});
})

module.exports = router;