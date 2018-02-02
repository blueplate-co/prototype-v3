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
  attributes: {
    
    id:{
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    uName:{
      type: 'string',
      size: 150,
      required: true,
    },
    uEmail:{
      type: 'string',
      unique: true,
      required: true,
    },
    uPassword:{
      type: 'string',
      required: true,
    },

    //- for facebook
    uNickName:{
      type: 'string',
    },
    facebookId: {
      type: 'string',
      required: false,
      unique: true
    },

    uToken:{
      type: 'string',
    },
    uVerified:{
      type:'boolean', //- 0 or 1
      defaultsTo: false
    },

    //- foreign key
    chef: {
      collection:'Chef',
      via: 'user'
    },
    friends:{
      collection: 'user',
      via: 'user',
    },
    menu: {
      collection:'menu',
      via: 'user'
    }


  },

  beforeCreate: function(user, cb) {

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.uPassword, salt, function(err, hash) {
          if(err) console.log(err);  
          // Store hash in your password DB.
          user.uPassword = hash;
          // console.log('hash password: ' + hash);
          cb();
        });
    });

  },


};

