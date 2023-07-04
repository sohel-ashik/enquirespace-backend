const jwt = require('jsonwebtoken');
const QuestionModel = require('../Schemas/QuestionSchema');
const AnswerModel = require('../Schemas/AnswerSchema');

async function getVotes(req,res){
    try{
        const decodedToken = jwt.verify(req.headers.token,process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const questionId = req.headers.questionid;
        const answerId = req.headers.answerid;

        const response = questionId ? await QuestionModel.findById(questionId) : await AnswerModel.findById(answerId);
        const {totalUpVotes,totalDownVotes,upVoterList,downVoterList} = response;
        const upVoteHas = upVoterList ? upVoterList.includes(userId) : false;
        const downVoteHas = downVoterList ? downVoterList.includes(userId) : false;
        var votePath = '';
        if(upVoteHas) votePath = 'up';
        if(downVoteHas) votePath = 'down';

        if(response){
            res.status(200).json({votes: {totalUpVotes,totalDownVotes},votePath : votePath})
        }else {
            res.status(400).json({error: 'user side error'});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'something is wrong'});

    }
}


module.exports = getVotes;