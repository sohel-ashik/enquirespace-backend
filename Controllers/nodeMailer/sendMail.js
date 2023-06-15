
const nodemailer = require('nodemailer');

async function sendMail(mail){
    const secret_code = Math.floor(1000 + Math.random() * 9000);

    //creating the transporting
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sohelashik595@gmail.com',
            pass: 'rhtasjtgxihsgmyk'
        }
    });

    //defining the email options
    const mailOptions = {
        from: 'sohelashik595@gmail.com',
        to: mail,
        subject: 'Enquire Space Confirmation Code',
        text: `Your confirmation code is : ${secret_code}`
    };

    try{
        await transporter.sendMail(mailOptions);
        console.log('Mail send');
        return secret_code;
    }catch(err){
        console.log('Error in mail sending');
        return null;
    }

}


module.exports = sendMail;