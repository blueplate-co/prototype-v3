/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt');
var passport = require('passport');

module.exports = {
	//- register new user
    register: function(req, res){

        //- get some data
        var data = {};
        data.uName     = req.param('username');
        data.uEmail    = req.param('email');
        data.uPassword = req.param('password');
        data.uToken    = HashService.encrypt({
            email: req.param('email'),
        });
        sails.log(data);
        //- create new user
        User
        .create(data)
        .then(function(created_data){
            sails.log(created_data);
            //- send email
            MailService.sendEmailVerification({
                username: data.uName,
                email: data.uEmail,
                token: created_data.uToken
            });
        
            //- return
            return res.json(201, {
                error: false,
                msg: 'Created !',
                data: created_data,
            });
        })
        .catch(function(err){
            //- validate email
            if(err.invalidAttributes.uEmail)
            {
                // var uEmail = err.invalidAttributes.uEmail;
                // var message = uEmail[0].message;
                // console.log(message);
                return res.negotiate({
                    error: true,
                    message: 'This email have already existed !',
                    data: data.uEmail,
                });
            }
            
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
                    var token    = TokenService.generate({
                        userInfo: userInfo,
                    });            

                    //- return message with jwt
                    return res.json(200, {
                        error: false,
                        msg: 'Found',
                        data: token
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
        var email = req.param('email');
        //- send email to confirm email address
        //- update password
        //- send email and redirect
        var isSent = MailService.sendEmailResetPass({
            email: email,
        });
        res.ok('email is sent');
    },

    //- update password by user email
    updateNewPassword: function(req, res)
    {
        //- declare some variable
        var userEmail = req.param('userEmail');
        var newPassword = req.param('userPassword');
        //- encrypt new password and update to database
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newPassword, salt, function(err, newPass) {
                if(err) console.log(err);  
              
                //- update new password using user email
                User
                .update({
                    uEmail: userEmail
                },{
                    uPassword: newPass
                })
                .then(function(updated_data){
                    res.ok(updated_data);
                })
                .catch(function(err){
                    res.serverError(err);
                });
                

            });
        });
    },

    //- update username and user email by user id
    updateUser: function(req, res)
    {
        var uid = req.param('userID');
        var update_data = req.param('update_data');
    
        //- update
        User
        .update({
            id: uid,
        }, JSON.parse(update_data))
        .then(function(updated_data){
            res.ok(updated_data);
        })
        .catch(function(err){
            res.serverError(err);
        });
    },

    //- update role by user email
    updateRole: function(req, res)
    {
        //- create_user_id
        var userEmail = req.param('userEmail');
        User
        .findOne()
        .where({
            uEmail: userEmail,
        })
        .then(function(found_data){
            
            //- update data
            User
            .update({
                uEmail: userEmail,
            },{
                uCanCook: true,
            })
            .then(function(updated_data){
                res.ok(found_data);
            })
            .catch(function(err){
                res.serverError(err);
            });

            
        })
        .catch(function(err){
            res.serverError(err);
        });

    },

    verifyToken: function(req, res){
        var token = req.param('token');
        sails.log(token);
        var email = HashService.decrypt({
            cryptedData: token,
        });

        //- update data
        User.update({
            uEmail: email
        }, {
            uVerified: true
        })
        .then(function(updated_data){

            //- if success
            res.redirect('https://www.google.com');

        }).catch(function(err){
             res.json(500, {
                 error: true,
                 message: 'Verify failed...',
                 data: err
             });
        });

        
    },

    test: function(req, res){
        sails.log('test');
    },

    uploadImage: function(req, res){

        var isUploaded = ImageService.uploadImage({
            req: req,
            res: res,
            fileInput: 'img'
        });
    },


    //- facebook authentication
    facebook: function (req, res, next) {
        passport.authenticate('facebook', { scope: ['email', 'user_about_me']},
           function (err, user) {
            //     req.logIn(user, function (err) {
            //     if(err) {
            //        req.session.flash = 'There was an error';
            //        res.redirect('https://www.google.com');
            //     } else {
            //        req.session.user = user;
            //        sails.log('');
            //        res.redirect('https://www.google.com');
            //     }
            // });
            
        })(req, res, next);
    },
   
    facebookCallback: function (req, res, next) {
        passport.authenticate('facebook',
            function (req, res) {
                //- authenticate success
                sails.log('facebook authenticate success...');
                // res.redirect('https://www.google.com');
        })(req, res, next);
    },

    //- google authentication
    google: function(req, res, next)
    {
        sails.log('here at google 1');
        // passport.authenticate('google', { scope: [
        //     'https://www.googleapis.com/auth/plus.login',
        //     'https://www.googleapis.com/auth/plus.profile.emails.read'
        //   ] });

        passport.authenticate('google', { scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read'
          ] });
        
        // passport.authenticate('google', { scope: ['profile'] });

    },

    googleCallback: function(req, res, next)
    {
        sails.log('here at google callback');
        passport.authenticate('google', { failureRedirect: '/' }),
            function(req, res) {
                sails.log('google authentication success...');
                res.redirect('https://www.google.com');
        };

        // passport.authenticate('google', { failureRedirect: '/login' }),
        // function(req, res) {
        //     sails.log('authentication success...');
        //     // res.redirect('/');
        // };
    },

};

