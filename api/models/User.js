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
    },
    uEmail:{
      type: 'string',
      unique: true,
    },
    uPassword:{
      type: 'string',
    },
    uPhoneNumber:{
      type: 'number',
    },

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

