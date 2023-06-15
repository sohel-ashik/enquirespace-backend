
const sendMail = require('./nodeMailer/sendMail');
const tempDB = require('../tempDB/tempUserData');
const bcrypt = require('bcrypt');

async function signupController(req,res){
    try{
        const code = await sendMail(req.body.mail);
        const hashPass = await bcrypt.hash(req.body.pass,10);
        if(code){
            tempDB[req.body.mail] = {
                code: code,
                name: req.body.name,
                mail: req.body.mail,
                pass: hashPass,
                expire: Date.now() + 3600000
            }

            res.status(200).json({msg:'Confirmation mail sened'});

        }else {
            res.status(500).json({error: 'Somethign is wrong'});
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Somethign is wrong'});
    }
}


module.exports = signupController;