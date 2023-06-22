const AnswerModel = require('../Schemas/AnswerSchema');
const QuestionModel = require('../Schemas/QuestionSchema');
const PeopleModel = require('../Schemas/PeopleSchema');
const jwt = require('jsonwebtoken');

async function answersGetController(req,res){
    // console.log(req.body);

    const answerData = {
        answer: req.body.answer,
        imageList: req.body.imgSrcArr,
        questionId: req.body.questionId
    }

    const newAnswer = new AnswerModel(answerData);

    try{
        const decodedToken = jwt.verify(req.headers.token, process.env.JWT_SECRET);

        const savedAnswer = await newAnswer.save();

        const question = await QuestionModel.findById(req.body.questionId);
        const people = await PeopleModel.findById(decodedToken.userId);

        if(question && people){
            question.answerList.push(savedAnswer._id);
            question.totalAnswers = question.totalAnswers + 1;

            people.answersArr.push(savedAnswer._id);

            await question.save();
            await people.save();

            res.status(200).json({msg: 'Answer is saved'});
        }else{
            await AnswerModel.findByIdAndDelete(savedAnswer._id);
            res.status(500).json({error: 'Server side error'});
        }
        
        
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Server side error'})
    }

    
}


module.exports = answersGetController;