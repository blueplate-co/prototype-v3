/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');
module.exports = {

  connection:'mongoAdapter',
  tableName:'User',
  autoPK: false,
  attributes: {
    
    id:{
      type: 'string',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    uName:{
      type: 'string',
      size: 150,
      // required: true,
    },
    uEmail:{
      type: 'string',
      unique: true,
      required: true,
    },
    uPassword:{
      type: 'string',
      // required: true,
    },

    //- for facebook
    facebookId: {
      type: 'string',
      // required: false,
      // unique: true
      defaultsTo: null
    },
    
    // facebookToken: {
    //   type: 'string',
    // },

    googleId: {
      type: 'string',
      defaultsTo: null
    },

    uToken:{
      type: 'string',
    },
    uVerified:{
      type:'boolean', //- 0 or 1
      defaultsTo: false
    },
    uCanCook:{ //- foodie or homecook
      type: 'boolean', //- false
      defaultsTo: false,
    },

    //- foreign key
    chef: {
      collection:'Chef',
      via: 'user'
    },
    // friends:{
    //   collection: 'user',
    //   via: 'user',
    // },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.uPassword;
      return obj;
    }

  },

  beforeCreate: function(user, cb) {

    //- check if user password is exist
    if(user.uPassword)
    {

      bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(user.uPassword, salt, function(err, hash) {
            if(err) console.log(err);  
            // Store hash in your password DB.
            user.uPassword = hash;
            // console.log('hash password: ' + hash);
            cb();
          });
      });

    }
    cb();
    

  },


};

