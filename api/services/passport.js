var passport       = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
// var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
//- configuration
var fbConfig       = require('./facebook.js');
var googleConfig   = require('./google.js');
var request        = require('request');


// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//- serialize and deserialize
// passport.serializeUser(function(user, done) {
//   done(null, user.facebookId);
// });
 
// passport.deserializeUser(function(facebookId, done) {
//   User.findOne({facebookId: facebookId}, function(err, user) {
//     done(err, user);
//   });
// });


//- middleware for facebook
// passport.use(new FacebookStrategy(
//     fbConfig.facebook
//   , function (accessToken, refreshToken, profile, done) {

//     // var facebookId = profile.id;
//     // var token = accessToken;
//     // var email = profile.emails[0].value;

//     // sails.log("=========================");
//     // // console.log(profile);
//     // sails.log(profile.id);
//     // sails.log(accessToken);
//     // sails.log(profile.name.givenName);
//     // sails.log(profile.name.familyName);
//     // sails.log(profile.emails[0].value);
//     // sails.log("=========================");

//     // User
//     // .findOne(
//     //   {
//     //     facebookId: profile.id
//     //   })
//     //   .then(function(found_data){
//     //     sails.log(found_data);
//     //     if(!_.isEmpty(found_data))
//     //     {
//     //       sails.log('có data');
//     //       sails.log(found_data);
//     //     }else{


//     //       sails.log('chưa có data');
//     //       sails.log('tạo mới');
//     //       var data = {
//     //         // provider: profile.provider,
//     //         facebookId: profile.id,
//     //         uName: profile.name.givenName,
//     //         facebookToken: accessToken
//     //       };

//     //       if (profile.emails && profile.emails[0] && profile.emails[0].value) {
//     //         data.uEmail = profile.emails[0].value;
//     //       }
//     //       // if (profile.name && profile.name.givenName) {
//     //       //   data.uFirstName = profile.name.givenName;
//     //       // }
//     //       // if (profile.name && profile.name.familyName) {
//     //       //   data.lastname = profile.name.familyName;
//     //       // }

//     //       sails.log('data: ', data);

//     //       //- create new data
//     //       // User
//     //       // .create(data)
//     //       // .then(function(created_data){
//     //       //   sails.log('created data: ', created_data);
//     //       //   return done(null, create);
//     //       // }).catch(function(err){
//     //       //   sails.log('error: ', err);
//     //       // });

//     //       createNewAccount(data);
           

//     //     }
  

//     //   })
//     //   .catch(function(err){
//     //     sails.log(err);
//     //   });


//     return done(null, profile);

//   }
// ));

var verifyHandler = function(req, token, tokenSecret, profile, done) {
 
  process.nextTick(function() {
    var url = 'https://graph.facebook.com/v2.4/me?access_token=%s&fields=id,name,email,first_name,last_name,gender';
    url = url.replace('%s', token);
 
    var options = {method: 'GET', url: url, json: true};
    request(options, function (err, response) {
      if (err) {
        return done(null, null);
      }
 
      var data = {
        id: response.body.id,
        first_name: response.body.first_name,  //jshint ignore:line
        last_name: response.body.last_name,    //jshint ignore:line
        email: response.body.email,
        gender: response.body.gender
      };
      
      return done(null, data);

    });
  });
};
 
passport.use(new FacebookStrategy(
  // {
  // clientID: 'YOU_CLIENT_ID',
  // clientSecret: 'YOUR_CLIENT_SECRET',
  // callbackURL: 'http://localhost:1337/facebook/callback',
  // passReqToCallback: true
  // }
  fbConfig.facebook
, verifyHandler));

//- middleware for google authentication
passport.use(new GoogleStrategy(
  googleConfig.google
  ,
  function(accessToken, refreshToken, profile, done) {
    // console.log(profile);
    
    return done(null, profile); 
  }
));

module.exports.http = {
  //- facebook custom middleware
  customMiddleware: function(app) {

 
    app.use(passport.initialize());
    app.use(passport.session());

    // app.use(function(req, res, next){
    //   res.locals.user = req.session.user;
    //   next();
    // });

  },


};



// module.exports = function(passport) {

//   // used to serialize the user for the session
//   passport.serializeUser(function(user, done) {
//       done(null, user.id);
//   });

//   // used to deserialize the user
//   passport.deserializeUser(function(id, done) {
//       User.findById(id, function(err, user) {
//           done(err, user);
//       });
//   });


//   passport.use(new FacebookStrategy(
//     fbConfig.facebook
//     , 
//       function (accessToken, refreshToken, profile, done) {

//         //- get profile data
//         console.log(profile);
//         console.log(profile.id);
//         console.log(accessToken);
//         console.log(profile.name.givenName);
//         console.log(profile.name.familyName);
//         console.log(profile.emails[0].value);
//         return done(null, profile);
//       },

//     ));

//     //- google authentication
//     passport.use(new GoogleStrategy(
//       googleConfig.google
//       ,
//       function(request, accessToken, refreshToken, profile, done) {
//         process.nextTick(function () {
//           console.log(profile);
//           console.log(profile.id);
//           console.log(accessToken);
//           console.log(profile.name.givenName);
//           console.log(profile.name.familyName);
//           console.log(profile.emails[0].value);
//           return done(null, profile);
//         });
//       }
//     ));
  

// };

