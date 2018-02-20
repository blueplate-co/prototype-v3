var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./fb.js');

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

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function (id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new FacebookStrategy(
//     {
//     clientID: "YOUR-FACEBOOK-CLIENT-ID",
//     clientSecret: "YOUR-FACEBOOK-CLIENT-SECRET",
//     callbackURL: "http://localhost:1337/user/facebook/callback",
//     enableProof: false
//   }
    config.facebook
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

module.exports.http = {
 
  customMiddleware: function(app) {
 
    passport.use(new FacebookStrategy(
    config.facebook
    , function (accessToken, refreshToken, profile, done) {


      console.log(profile);
            console.log(profile.id);
            console.log(accessToken);
            console.log(profile.name.givenName);
            console.log(profile.name.familyName);
            console.log(profile.emails[0].value);
          return done(null, profile);
  
          
      
    }
  ));
 
    app.use(passport.initialize());
    app.use(passport.session());
  }
};