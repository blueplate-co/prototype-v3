/**
 * Kitchen.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection:'mongoAdapter',
  tableName:'Kitchen',
  attributes: {

    id:{
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    kName:{
      type: 'string',
      max: 100,
    },
    kChefName:{
      type: 'string',
      max: 100,
    },
    kKeywords:{
      type: 'string',
    },
    kCountry:{
      type: 'string',
      max: 100,
    },
    kAddress:{
      type: 'string',
    },
    kCoodinates:{
      type: 'array',
    }, //- lat & long
    kAbout:{
      type: 'string',
    },

    kServingOptions:{},

    kBankFullName:{
      type: 'string',
      max: 250,
    },
    kBankName:{
      type: 'string',
      max: 200
    },
    kAccountNo:{
      type: 'string',
    },
    kBankAddress:{
      type: 'string',
    },
    kOrderCount:{
      type: 'integer',
    },
    kAverageRating:{
      type: 'float',
    },
    delete_at:{
      type: 'datetime',
      defaultsTo: null
    },

    uID:{},
    

  }
};

