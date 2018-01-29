/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
            MailService.sendEmailVerification();
        
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
                //- using service
                var isMatch = BcryptService.comparePass({
                    user_input_pass: data.uPassword,
                    database_pass: found.uPassword
                });

                if(isMatch)
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
                }else{
                    return res.json(200, {
                        error: false,
                        msg: 'Password is not match !',
                        data: err
                    });
                }
                 
            }
            
            
        })
        .catch(function(err){
            return res.json(404, {
                error: true,
                msg: 'Please check email and password again !',
                data: err
            });
        });

    },

    resetPass:function(req, res){
        //- send email to confirm email
        //- update password
    },

};

