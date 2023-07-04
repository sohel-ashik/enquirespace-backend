const jwt = require('jsonwebtoken');
const QuestionModel = require('../Schemas/QuestionSchema');

async function viewAdder(req,res){
    try{
        const decodedToken = jwt.verify(req.headers.token,process.env.JWT_SECRET);
        const questionId = req.headers.questionid;
        
        const question = await QuestionModel.updateOne({_id: questionId}, {$inc: {views: 1}});
        if(question){
            res.status(200).json(question)
        }else{
            res.status(400).json({error: 'Something is wrong'})
        }

    }catch(err){
        res.status(500).json({error: 'something is wrong'});

    }
}


module.exports = viewAdder;