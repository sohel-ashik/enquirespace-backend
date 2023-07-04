const jwt = require('jsonwebtoken');
const PeopleModel = require('../../Schemas/PeopleSchema');

async function answerGetController(req,res){
    try{
        const decodedToken = jwt.verify(req.headers.token,process.env.JWT_SECRET);
        const userId = req.headers.profileid ? req.headers.profileid : decodedToken.userId;


        const people = await PeopleModel.findById(userId).populate({
            path: 'answersArr',
            populate: {
                path: 'questionId'
            }
        });

        if(people){
            res.status(200).json(people)
        }else{
            res.status(400).json({error: 'Something is wrong'})
        }

    }catch(err){
        res.status(500).json({error: 'something is wrong'});

    }
}


module.exports = answerGetController;