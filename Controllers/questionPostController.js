const QuestionModel = require('../Schemas/QuestionSchema');

async function questionPostController(req,res){
    // console.log(req.body)
    const questionData = {
        title: req.body.title,
        details: req.body.details,
        type: req.body.type,
        coins: req.body.coins,
        imageList: req.body.imgSrcArr
    }

    const newQuestion = new QuestionModel(questionData);

    try{
        await newQuestion.save();
        console.log('Question is posted');
        res.status(200).json({msg: 'Question is saved...'})
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Server side fault'})
    }

}

module.exports = questionPostController;