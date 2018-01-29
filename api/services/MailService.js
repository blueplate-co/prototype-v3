var nodemailer = require('nodemailer');
module.exports = {
    sendEmailVerification:function(options){
        //- declare some variables

        //- start send email
        var server_host = "13.250.107.234:1337";
        var localhost = "localhost:1337";
        var transporter =  nodemailer.createTransport({ // config mail server
            host: 'smtp.gmail.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            service: 'gmail',
            auth: {
                user: 'bao.tran@blueplate.co',
                pass: 'transybao93'
            }
        });
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'Bao bao',
            to: 'transybao93@gmail.com',
            subject: 'Blue Plate Corporation',
            text: 'Welcome to our service!',
            html: '<a href="http://localhost:1337/api/verify/123">Activate account</a>'
        }
        transporter.sendMail(mainOptions, function(err, info){
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log('Message sent: ' +  info.response);
                res.send('Message sent !');
            }
        });


    },

    encryptEmail:function(options){

    },
    
}