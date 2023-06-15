const tempDB = require('../tempDB/tempUserData');
const PeopleModel = require('../Schemas/PeopleSchema');

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
                        pass: tempDB[reqData.mail]['pass']

                    })
                    await newUser.save();
                    res.status(200).json({msg: 'New user has been saved'});

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