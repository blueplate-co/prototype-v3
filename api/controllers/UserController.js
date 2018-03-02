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

            //- add chef
            // sails.log(created_data.id);
            // created_data.chef.add(created_data.id);
            // created_data.save(function(err){
            //     if (err) { return res.serverError(err); }
            //     return res.ok();
            //   });
        
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
                    // return res.json(200, {
                    //     error: false,
                    //     msg: 'Found',
                    //     data: {
                    //         token: token,
                    //         email: found.uEmail,
                    //         userID: found.id
                    //     }
                    // });

                    res.ok({
                        token: token,
                        email: found.uEmail,
                        userID: found.id
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

    //- check token expiration
    isExpired: function(req, res)
    {
        var token = req.param('userToken');
        //- check it
        var isOK = TokenService.verify({
            token: token,
        });
        if(isOK)res.ok('token is not expired');
        res.negotiate('expired');
    },

    //- check if email is verified
    //- using email
    checkEmailVerified: function(req, res)
    {
        var email = req.param('userEmail');
        User.count({
            uEmail: email,
            uVerified: true
        })
        .then(function(count_data){
            if(count_data > 0)
            {
                res.ok("This email is verified");
            }
            res.ok("This email is not verified");
        }).catch(function(err){
            res.negotiate(err);
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
        var userEmail = req.param('email');
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
                res.ok(updated_data);
            })
            .catch(function(err){
                res.serverError(err);
            });

            
        })
        .catch(function(err){
            res.serverError(err);
        });

    },

    //- check if user is a chef or not
    //- check by user email
    checkUserRole: function(req, res)
    {
        var email = req.param('email');
        User
        .findOne({
            uEmail: email,
            uCanCook: true
        })
        .then(function(found_data){
            if(!found_data){
                res.ok({
                    message: 0
                })
            }else{
                //- if this user has already a chef
                //- return chef id
                Chef
                .findOne({
                    uid: found_data.id
                })
                .then(function(chef){
                    if(!chef)res.negotiate({
                        message:"Cannot find chef's profile"
                    });
                    res.ok({
                        message: chef.id
                    });
                })
                .catch(function(err){
                    res.negotiate(err);
                });
            }

            
            

        })
        .catch(function(err){
            res.negotiate(err);
        });
    },

    //- email resend
    resendEmail: function(req, res)
    {
        var email = req.param('email');
        var userToken = req.param('token');
        var username = req.param('username');
        sails.log('email: ',email);
        sails.log('userToken: ',userToken);
        sails.log('username: ',username);
        //- send email
        MailService.sendEmailVerification({
            username: username,
            email: email,
            token: userToken
        });
        res.ok({
            message: 'Resend email ok',
        });
    },

    verifyToken: function(req, res){
        var token = req.param('token');
        sails.log(token);
        var email = HashService.decrypt({
            cryptedData: token,
        });

        //- update data
        User
        .update({
            uEmail: email
        }, {
            uVerified: true
        })
        .then(function(updated_data){

            //- send token back


            //- if success
            res.redirect('http://13.250.50.89:4003/verify');

        }).catch(function(err){
             res.json(500, {
                 error: true,
                 message: 'Verify failed...',
                 data: err
             });
        });

        
    },

    test: function(req, res){
        sails.log('authentication success');
        sails.log(req.headers);
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
        passport.authenticate('facebook', { scope: ['email', 'user_about_me']})(req, res, next);
    },

    facebookCallback: function(req, res) {
        passport.authenticate('facebook', function(err, user) {
            if(err) sails.log(err);

            req.logIn(user, function(err) {
                if (err) {
                    sails.log(err);
                    res.redirect('/');
                    return;
                }
                // sails.log(user);
                req.flash('userID', user.id);
                req.flash('userName', user.last_name);
                req.flash('userEmail', user.email);
                res.redirect('/api/facebook/login');
                return;
              });
            
        })(req, res);
    },

    //- google authentication
    google: function(req, res)
    {
        // passport.authenticate('google', { scope: [
        //     'https://www.googleapis.com/auth/plus.login',
        //     'https://www.googleapis.com/auth/plus.profile.emails.read'
        //   ] },
        // function (err, user) {
            
            
            
        // })(req, res);

        passport.authenticate('google', { scope: 
            [
                'https://www.googleapis.com/auth/plus.login',
                'https://www.googleapis.com/auth/plus.profile.emails.read'
            ] 
        })(req, res);
    },

    googleCallback: function(req, res)
    {
        // passport.authenticate('google')(req, res, next);
        passport.authenticate('google', { failureRedirect: '/' }),
        function(req, res) {
            console.log('Google authentication success');
            res.redirect('https://www.google.com');
        }
    },

    //- create social network token
    facebookLogin: function(req, res)
    {
        sails.log('facebookLogin function');

        //- keep flash data
        var data = {};
        data.facebookId = req.flash('userID')[0];
        data.uName = req.flash('userName')[0];
        data.uEmail = req.flash('userEmail')[0];
        //- chek if user with facebook id is existed
        User
        .find({
            facebookId: data.facebookId
        }).then(function(found_data){
            if(_.isEmpty(found_data))
            {
                //- if user not found
                //- create new one
                User
                .create(data)
                .then(function(created_data){
                    sails.log('created data: ', created_data);
                    //- response a token back
                    var userInfo = {id: created_data.id};
                    var token    = TokenService.generate({
                        userInfo: userInfo,
                    }); 
                    return res.ok({
                        message: 'created new user',
                        token: token,
                    });
                })
                .catch(function(err){
                    sails.log(err);
                    res.negotiate(err);
                });

            }else{
                //- if user found
                //- response a token back
                var userInfo = {id: found_data.id};
                var token    = TokenService.generate({
                    userInfo: userInfo,
                });

                return res.ok({
                    message: 'user existed',
                    token: token
                });
            }
            

        }).catch(function(err){
            res.negotiate(err);
        });
        
        
        
    },

    socialLogin: function(req, res)
    {
        var email = req.param('email');
        var username = req.param('username');
        var facebookID = req.param("facebookID"); //- can be null
        var googleID = req.param('googleID');//- can be null

        //- insert to database
        // User
        // .find({
        //     facebookId: data.facebookId
        // }).then(function(found_data){
        
        
        // });
    }

};

