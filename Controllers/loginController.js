
const PeopleModel = require('../Schemas/PeopleSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

async function loginController(req,res){

    try{
        const data = await PeopleModel.findOne({mail: req.body.mail});
        if(data){
            const compare_pass = await bcrypt.compare(req.body.pass,data.pass);
            if(compare_pass){
                const {_id,name,mail,profilePic} = data;
                const token = jwt.sign({
                    userId: _id,
                    name: name,
                    mail: mail,
                    profilePic: profilePic
                },process.env.JWT_SECRET);

                res.status(200).json({msg: 'Login in completed', token: token});

            } else{
                res.status(400).json({error: 'Email or pass did not matched.'})
            }
        }else{
            res.status(400).json({error: 'Email or pass did not matched.'})
        }
    }catch(err){
        res.status(500).json({error: 'Something is wrong'})
    }
}


module.exports = loginController;
