

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PeopleModel = require('../../Schemas/PeopleSchema');

async function editProfile(req,res){
    console.log('here')
    try{
        const decodedToken = jwt.verify(req.headers.token,process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const data = req.body;
        const encryptedPass = await bcrypt.hash(data.newPass,10);

        const filter = {_id:userId};
        const update = {
            ...(data.userName && {name: data.userName}),
            ...(data.phone && {phone: data.phone}),
            ...(data.designation && {designation: data.designation}),
            ...(data.newPass && {pass: encryptedPass}),
            ...(data.imgLink && {profilePic : data.imgLink})
        }
        
        console.log(update);

        const people = await PeopleModel.updateOne(filter,update);
        if(people){
            res.status(200).json({people})
        }else{
            res.status(400).json({error: 'Something is wrong'})
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'something is wrong'});

    }
}


module.exports = editProfile;