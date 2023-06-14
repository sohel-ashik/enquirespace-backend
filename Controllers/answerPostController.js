const AnswerModel = require('../Schemas/AnswerSchema');

async function answerPostController(req,res){
    // console.log(req.body);

    const answerData = {
        answer: req.body.answer,
        imageList: req.body.imgSrcArr
    }

    const newAnswer = new AnswerModel(answerData);

    try{
        await newAnswer.save();
        console.log("Answer is saved");
        res.status(200).json({msg: 'Answer is saved'})
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Server side error'})
    }

    
}


module.exports = answerPostController;