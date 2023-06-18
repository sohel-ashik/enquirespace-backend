
const jwt = require('jsonwebtoken');
const PeopleModel = require('../../Schemas/PeopleSchema');

async function profileController(req,res){
    try{
        const decodedToken = jwt.verify(req.headers.token,process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        const people = await PeopleModel.findById(userId);
        if(people){
            const {name,mail,phone,designation,totalUpVotes,totalDownVotes,totalCoins,joinedDate,profilePic} = people;
            res.status(200).json({name,mail,phone,designation,totalUpVotes,totalDownVotes,totalCoins,joinedDate,profilePic})
        }else{
            res.status(400).json({error: 'Something is wrong'})
        }

    }catch(err){
        res.status(500).json({error: 'something is wrong'});

    }
}


module.exports = profileController;