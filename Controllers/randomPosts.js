const jwt = require('jsonwebtoken');
const QuestionModel = require('../Schemas/QuestionSchema');
const PeopleModel = require('../Schemas/PeopleSchema');
const AnswerModel = require('../Schemas/AnswerSchema');

async function randomPosts(req,res){
    try{
        const decodedToken = jwt.verify(req.headers.token,process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        const randomEntries = await QuestionModel.aggregate([
            {$sample: { size: 10}}
        ]).exec();

        const populatedEntries = await QuestionModel.populate(randomEntries, 
            { 
                path: 'askerId',
                model: PeopleModel ,
                 select: 'name mail profilePic'});

        const populatedEntriesWithAnswerList = await QuestionModel.populate(populatedEntries,
            {
                path: 'answerList',
                model: AnswerModel
            })
        
        const populatedEntriesWithAnswerListWithHelperId = await QuestionModel.populate(populatedEntriesWithAnswerList,{
            path: 'answerList.helperId',
            model: PeopleModel,
            select: 'name mail profilePic'

        })

        res.status(200).json({data: populatedEntriesWithAnswerListWithHelperId});

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'something is wrong'});

    }
}


module.exports = randomPosts;