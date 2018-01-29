/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');

module.exports = {
	//- register new user
    register: function(req, res){

        //- get some data
        var data = {};
        data.uName     = req.param('username');
        data.uEmail    = req.param('email');
        data.uPassword = req.param('password');

        //- create new user
        User
        .create(data)
        .then(function(created_data){
            //- send email
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
                html: '<a href="https://www.google.com">Activate account</a>'
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
        
            //- return
            return res.json(201, {
                error: false,
                msg: 'Created !',
                data: null,
            });
        })
        .catch(function(err){
            return res.json(500, {
                error: true,
                msg: 'Errors !',
                data: err,
            });
        });


    },

    //- login using OAuth2
    login: function(req, res){
        var data = {};
        //- nếu tồn tại
        if(req.param('email') && req.param('password'))
        {
            data.uEmail = req.param('email').trim();
            data.uPassword = req.param('password');
        }
        
        //- check user information due to database information
        User
        .findOne({uEmail: data.uEmail})
        .then(function(found){
            
            //- if exist
            if(found)
            {
                //- compare password
                bcrypt.compare(data.uPassword, found.uPassword, function(err, result) {
                    if(err) return res.json(500, {error: true, msg: "Cannot encrypt !", data:null});
                    //- if password is match
                    if(result == true)
                    {
                        //- create json web token
                        var userInfo = {id: found.id};
                        // var token    = TokenService.generate({
                        //     userInfo: userInfo,
                        // });            

                        //- return message with jwt
                        return res.json(200, {
                            error: false,
                            msg: 'Found',
                            data: null
                        });
                    }else if(result == false){
                        return res.json(200, {
                            error: false,
                            msg: 'Password is not match !',
                            data: err
                        });
                    }
                });
                
            }else{
                sails.log('not found');
                return res.json(404, {
                    error: false,
                    msg: 'Not found',
                    data: null
                });
            }
            
            
        })
        .catch(function(err){
            return res.json(500, {
                error: true,
                msg: 'Errors !',
                data: err
            });
        });

    },

    resetPass:function(req, res){
        //- send email to confirm email
        //- update password
    },

};

