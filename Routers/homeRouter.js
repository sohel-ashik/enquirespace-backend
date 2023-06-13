//external imports
const express = require('express');
//internal imports
const questionPostController = require('../Controllers/questionPostController');

//configuration 
const router = express.Router();

// queries
router.get('/', (req,res)=>{
    res.status(200).json({msg: "Home is getting you...."});
})

router.post('/ask',questionPostController);

//error handler
router.use((req,res)=>{
    res.status(500).json({error: 'Something is wrong'});
})

module.exports = router;