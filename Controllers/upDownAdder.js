const jwt = require('jsonwebtoken');
const QuestionModel = require('../Schemas/QuestionSchema');
const AnswerModel = require('../Schemas/AnswerSchema');
const PeopleModel = require('../Schemas/PeopleSchema');

async function upDownAdder(req,res){
    try{
        const decodedToken = jwt.verify(req.headers.token,process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const questionId = req.headers.questionid;
        const answerid = req.headers.answerid;
        const type = req.headers.type;
        const preState = req.headers.pre;

        var response = null;

        if(questionId){
            var update = {};
            const question = await QuestionModel.findById(questionId);
            const people = question.askerId;

            if(preState == 'up'){
                update = {
                    $inc : type == 'up' ? {totalUpVotes : -1} : {totalUpVotes: -1, totalDownVotes: 1},
                    $push : type == 'up' ? {} : {downVoterList: userId},
                    $pull : {upVoterList: userId}
                }

            }else if(preState == 'down'){
                update = {
                    $inc : type == 'up' ? {totalUpVotes : 1, totalDownVotes: -1} : {totalDownVotes: -1},
                    $push : type == 'up' ? {upVoterList: userId} : {},
                    $pull : {downVoterList: userId}
                }

            }else {
                update =  {
                    $inc: type == 'up' ? {totalUpVotes: 1} : {totalDownVotes : 1},
                    $push : type == 'up' ? {upVoterList : userId} : {downVoterList : userId}
                }
            }


            response = await QuestionModel.updateOne(
                {_id: questionId},
                update)
            await PeopleModel.updateOne({_id: people},update);
        }else{
            var update = {};
            const answer = await AnswerModel.findById(answerid)
            const people = answer.helperId;

            if(preState == 'up'){
                update = {
                    $inc : type == 'up' ? {totalUpVotes : -1} : {totalUpVotes: -1, totalDownVotes: 1},
                    $push : type == 'up' ? {} : {downVoterList: userId},
                    $pull : {upVoterList: userId}
                }

            }else if(preState == 'down'){
                update = {
                    $inc : type == 'up' ? {totalUpVotes : 1, totalDownVotes: -1} : {totalDownVotes: -1},
                    $push : type == 'up' ? {upVoterList: userId} : {},
                    $pull : {downVoterList: userId}
                }

            }else {
                update =  {
                    $inc: type == 'up' ? {totalUpVotes: 1} : {totalDownVotes : 1},
                    $push : type == 'up' ? {upVoterList : userId} : {downVoterList : userId}
                }
            }


            response = await AnswerModel.updateOne(
                {_id: answerid},
                update)
            await PeopleModel.updateOne({_id: people},update);
        }

        if(response){
            res.status(200).json(response)
        }else{
            res.status(400).json({error: 'Something is wrong'})
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'something is wrong'});

    }
}


module.exports = upDownAdder;