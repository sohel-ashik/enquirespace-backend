const tempDB = require('../tempDB/tempUserData');
const PeopleModel = require('../Schemas/PeopleSchema');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

async function codeConfirmController(req,res){
    const reqData = req.body;
    console.log(tempDB);

    if(tempDB[reqData.mail] && tempDB[reqData.mail]['code'] == reqData.code && Date.now() < tempDB[reqData.mail]['expire']){
        
        try{
            const data = await PeopleModel.findOne({mail: reqData.mail})

            if(!data){
                try{
                    const newUser = new PeopleModel({
                        name: tempDB[reqData.mail]['name'],
                        mail: tempDB[reqData.mail]['mail'],
                        pass: tempDB[reqData.mail]['pass'],
                        totalCoins: 1000

                    })
                    const savedUser = await newUser.save();
                    const {_id,name,mail,profilePic} = savedUser;
                    const token = jwt.sign({
                        userId: _id,
                        name: name,
                        mail: mail,
                        profilePic: profilePic
                    },process.env.JWT_SECRET);

                    res.status(200).json({msg: 'sign up successful',token: token});

                }catch(err){
                    console.log(err);
                    res.status(500).json({err: 'Server side error'})
                }

            }else{
                res.status(400).json({err: 'This user is registered'});
            }

        }catch(err){
            console.log(err);
            res.status(500).json({err: 'Something is wrong'});
        }
        
        
    }else{
        res.status(400).json({err: 'Validation failed'});
    }
}


module.exports = codeConfirmController;