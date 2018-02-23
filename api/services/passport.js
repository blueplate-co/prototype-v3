var passport       = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
//- configuration
var fbConfig       = require('./facebook.js');
var googleConfig   = require('./google.js');

function findById(id, fn) {
  User.findOne(id).done(function (err, user) {
    if (err) {
      return fn(null, null);
    } else {
      return fn(null, user);
    }
  });
}

function findByFacebookId(id, fn) {
  User.findOne({
    facebookId: id
  }).done(function (err, user) {
    if (err) {
      return fn(null, null);
    } else {
      return fn(null, user);
    }
  });
}

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });
 
// passport.deserializeUser(function (id, done) {
//   findById(id, function (err, user) {
//     done(err, user);
//   });
// });


// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


//- middleware for facebook
passport.use(new FacebookStrategy(
    fbConfig.facebook
  , function (accessToken, refreshToken, profile, done) {


    console.log(profile);
    console.log(profile.id);
    console.log(accessToken);
    console.log(profile.name.givenName);
    console.log(profile.name.familyName);
    console.log(profile.emails[0].value);
    return done(null, profile);

        
    // findByFacebookId(profile.id, function (err, user) {

    //   // Create a new User if it doesn't exist yet
    //   if (!user) {
    //     User.create({

    //       facebookId: profile.id

    //       // You can also add any other data you are getting back from Facebook here 
    //       // as long as it is in your model

    //     }).done(function (err, user) {
    //       if (user) {
    //         return done(null, user, {
    //           message: 'Logged In Successfully'
    //         });
    //       } else {
    //         return done(err, null, {
    //           message: 'There was an error logging you in with Facebook'
    //         });
    //       }
    //     });

    //   // If there is already a user, return it
    //   } else {
    //     return done(null, user, {
    //       message: 'Logged In Successfully'
    //     });
    //   }
    // });
  }
));

//- middleware for google authentication
passport.use(new GoogleStrategy(
  {

    clientID        : "495077090541-v31i7g6v50ejiv8vn2nok5p8ilglv3ef.apps.googleusercontent.com",
    clientSecret    : "f9d9RiKAg8EGhR_nQ_tPUeb6",
    callbackURL     : "http://localhost:1337/auth/google/callback",

}
  ,
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      sails.log('here at google middleware');
      sails.log(profile);
      return done(null, profile);
    });
  }
));

module.exports.http = {
  //- facebook custom middleware
  customMiddleware: function(app) {
 
    // passport.use(new FacebookStrategy(
    // fbConfig.facebook
    // , 
    //   function (accessToken, refreshToken, profile, done) {

    //     //- get profile data
    //     console.log(profile);
    //     console.log(profile.id);
    //     console.log(accessToken);
    //     console.log(profile.name.givenName);
    //     console.log(profile.name.familyName);
    //     console.log(profile.emails[0].value);
    //     return done(null, profile);
    //   },

    // ));

    // //- google authentication
    // passport.use(new GoogleStrategy(
    //   googleConfig.google
    //   ,
    //   function(request, accessToken, refreshToken, profile, done) {
    //     process.nextTick(function () {
    //       console.log(profile);
    //       console.log(profile.id);
    //       console.log(accessToken);
    //       console.log(profile.name.givenName);
    //       console.log(profile.name.familyName);
    //       console.log(profile.emails[0].value);
    //       return done(null, profile);
    //     });
    //   }
    // ));

 
    app.use(passport.initialize());
    app.use(passport.session());
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

