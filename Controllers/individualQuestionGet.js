const jwt = require('jsonwebtoken');
const PeopleModel = require('../Schemas/PeopleSchema');
const QuestionModel = require('../Schemas/QuestionSchema')
const AnswerModel = require('../Schemas/AnswerSchema');


async function individualQuestion(req,res){
    try{
        const decodedToken = jwt.verify(req.headers.token,process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const questionId = req.headers.questionid;

        const question = await QuestionModel.findById(questionId).populate({
            path: 'answerList',
            populate: {
                path: 'helperId'
            }
        });

        if(question){
            res.status(200).json(question)
        }else{
            res.status(400).json({error: 'Something is wrong'})
        }

    }catch(err){
        res.status(500).json({error: 'something is wrong'});

    }
}


module.exports = individualQuestion;