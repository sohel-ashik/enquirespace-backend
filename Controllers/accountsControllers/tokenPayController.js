const jwt = require('jsonwebtoken');
const QuestionModel = require('../../Schemas/QuestionSchema');
const PeopleModel = require('../../Schemas/PeopleSchema');
const AnswerModel = require('../../Schemas/AnswerSchema');

async function tokenPay(req,res){
    try{
        const decodedToken = jwt.verify(req.headers.token,process.env.JWT_SECRET);
        const questionId = req.headers.questionid;
        const helperId = req.headers.helperid;
        const answerId = req.headers.answerid;
        
        if(questionId && helperId && answerId){
            const question = await QuestionModel.findById(questionId);
            const coins = question.coins;
            await QuestionModel.updateOne({_id: questionId}, {coins : 0, solved: true});

            await PeopleModel.updateOne({_id: helperId}, {$inc :{totalCoins: coins}});
            await AnswerModel.updateOne({_id: answerId}, {winner: true});

            res.status(200).json({msg: 'success'});
        } else{
            res.status(400).json({error: 'User side error'})
        }

    }catch(err){
        res.status(500).json({error: 'something is wrong'});

    }
}


module.exports = tokenPay;