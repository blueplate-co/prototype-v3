/**
 * Kitchen.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id:{
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    kName:{},
    kChefName:{},
    kKeywords:{},
    kCountry:{},
    kAddress:{},
    kCoodinates:{}, //- lat & long
    kAbout:{},
    kServingOptions:{},
    kBankFullName:{},
    kBankName:{},
    kAccountNo:{},
    kBankAddress:{},
    kOrderCount:{},
    kAverageRating:{},
    delete_at:{},

    uID:{},
    

  }
};

