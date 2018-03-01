var passport       = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
// var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
//- configuration
var fbConfig       = require('./facebook.js');
var googleConfig   = require('./google.js');

// function findById(id, fn) {
//   User.findOne(id).done(function (err, user) {
//     if (err) {
//       return fn(null, null);
//     } else {
//       return fn(null, user);
//     }
//   });
// }

function findByFacebookId(id, fn) {
  User
  .findOne({
    facebookId: id
  })
  .then(function(found_data){
    //- if not exist
    if(!found_data)
    {
      //- create new user
      User.create
    }
    
    //- if exist
    return done(found_data);
  })
  .done(function (err, user) {
    if (err) {
      return fn(null, null);
    } else {
      return fn(null, user);
    }
  });
}


// serialize and deserialize
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });

//- serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user.facebookId);
});
 
passport.deserializeUser(function(facebookId, done) {
  User.findOne({facebookId: facebookId}, function(err, user) {
    done(err, user);
  });
});


//- middleware for facebook
passport.use(new FacebookStrategy(
    fbConfig.facebook
  , function (accessToken, refreshToken, profile, done) {

    // var facebookId = profile.id;
    // var token = accessToken;
    // var email = profile.emails[0].value;


    // console.log(profile);
    // console.log(profile.id);
    // console.log(accessToken);
    // console.log(profile.name.givenName);
    // console.log(profile.name.familyName);
    // console.log(profile.emails[0].value);

    User
    .findOne(
      {
        facebookId: profile.id
      }, function(err, user) {
      if (user) {
        return done(null, user);
      } else {
 
        var data = {
          provider: profile.provider,
          facebookId: profile.id,
          uName: profile.displayName
        };
 
        if (profile.emails && profile.emails[0] && profile.emails[0].value) {
          data.uEmail = profile.emails[0].value;
        }
        // if (profile.name && profile.name.givenName) {
        //   data.uFirstName = profile.name.givenName;
        // }
        // if (profile.name && profile.name.familyName) {
        //   data.lastname = profile.name.familyName;
        // }
 
        User
        .create(data, function(err, user) {
          return done(err, user);
        });
      }
    });


    // return done(null, profile);

  }
));

//- middleware for google authentication
passport.use(new GoogleStrategy(
  googleConfig.google
  ,
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    
    return done(null, profile); 
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
    //     // console.log(profile);
    //     // console.log(profile.id);
    //     // console.log(accessToken);
    //     // console.log(profile.name.givenName);
    //     // console.log(profile.name.familyName);
    //     // console.log(profile.emails[0].value);
    //     return done(null, profile);
    //   },

    // ));

    //- google authentication
    // passport.use(new GoogleStrategy(
    //   googleConfig.google
    //   ,
    //   function(accessToken, refreshToken, profile, done) {
    //     console.log(profile);
    //     console.log(profile.id);
    //     console.log(accessToken);
    //     console.log(profile.name.givenName);
    //     console.log(profile.name.familyName);
    //     console.log(profile.emails[0].value);
    //     return done(null, profile); 
    //   }
    // ));

    // passport.use(new GoogleStrategy(
    //   googleConfig.google
    //   ,
    //   function(accessToken, refreshToken, profile, done) {
    //     console.log(profile);
        
    //     return done(null, profile); 
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

