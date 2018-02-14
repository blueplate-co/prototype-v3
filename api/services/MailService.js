var nodemailer = require('nodemailer');
module.exports = {
    sendEmailVerification:function(options){
        //- declare some variables
        var email = options.email;
        var username = options.username;
        var token = options.token;

        //- start send email
        var server_host = "13.250.107.234";
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
        var verifyLink = 'http://localhost:1337/api/verify/' + token;
        var mailTemplate = '<p>Hi ' + username + ',</p><br>Thank you for joining us. <br>' +
        'To verify your email address (' + email + '), please visit the following link to active your account:<br><br>' +
        '<a href="' + verifyLink + '" style="background:#4dd0e1; padding:5px; color:white; text-decoration: none; text-align: center">Activate account</a><br><br>' + 
        'We are so grateful to have another member coming to our community. Feel free to drop me a line if there is anything wrong through out the process.<br>' +
        'See you around!<br><br>' + 
        'Best,<br>' +
        'Alan<br><br>';
        var mainOptions = { //- config environment, email content
            from: 'Bao bao',
            to: email,
            subject: 'Blue Plate Corporation',
            text: 'Welcome to our service!',
            html: mailTemplate
        }
        transporter.sendMail(mainOptions, function(err, info){
            if (err) console.log(err);
            //- if success
            console.log('Message sent: ' +  info.response);
        });


    },

    sendEmailResetPass:function(options){
        //- declare some variables
        var email = options.email;

        //- start send email
        var server_host = "13.250.107.234";
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
        var verifyLink = 'http://localhost:1337/api/reset/password';
        var mailTemplate = 'To reset password with email address (' + email + '), please visit the following link to reset password:<br><br>' +
        '<a href="' + verifyLink + '" style="background:#4dd0e1; padding:5px; color:white; text-decoration: none; text-align: center">Reset password</a><br>';
        var mainOptions = { //- config environment, email content
            from: 'Bao bao',
            to: email,
            subject: 'Blue Plate Corporation',
            text: 'Reset Password !',
            html: mailTemplate
        }
        transporter.sendMail(mainOptions, function(err, info){
            if (err) console.log(err); 
            //- if success
            console.log('Email of reset password is sent: ' + info.response);
            
        });


    },

    encryptEmail:function(options){

    },
    
}