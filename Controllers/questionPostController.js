const QuestionModel = require('../Schemas/QuestionSchema');
const PeopleModel = require('../Schemas/PeopleSchema');
const jwt = require('jsonwebtoken');

async function questionPostController(req,res){
    // console.log(req.body)
    const questionData = {
        title: req.body.title,
        details: req.body.details,
        type: req.body.type,
        coins: req.body.coins,
        imageList: req.body.imgSrcArr
    }

    

    try{
        //decode and verify token 
        const decodedToken = jwt.verify(req.body.token,process.env.JWT_SECRET);
        questionData.askerId = decodedToken.userId;
        const newQuestion = new QuestionModel(questionData);

        const newQuestionSaved =  await newQuestion.save();
        const userId = decodedToken.userId;
        const people = await PeopleModel.findById(userId);
        
        if(people){
            //question id ref is added to user
            people.questionsArr.push(newQuestionSaved._id);
            people.totalCoins = people.totalCoins - req.body.coins;
            await people.save();

            console.log('Question is posted');
            res.status(200).json({msg: 'Question is saved...'})
        }else{
            //if anything wring the question is being removed
            await QuestionModel.findByIdAndDelete(newQuestionSaved._id);
            res.status(500).json({error: 'Something is wrong'});
        }

        
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Server side fault'})
    }

}

module.exports = questionPostController;