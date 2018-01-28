/**
 * Foodie.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection:'mongoAdapter',
  tableName:'Foodie',
  attributes: {

    id:{
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    fEmail:{
      type: 'string',
      unique: true,
    },
    fDOB:{
      type: 'string',
    },
    fKeyword:{
      type: 'string',
      max: '200',
    },
    fGender:{
      type: 'string',
      max: 5,
      enum: ['male', 'female']
    },
    fAbout:{
      type: 'string',
    },
    fCountry:{
      type: 'string',
    },
    fAddress:{
      type: 'string',
    },
    fOfficeAddressCountry:{
      type: 'string',
    },
    fOfficeAddress:{
      type: 'string',
    },
    fOfficeCoodinates:{
      type: 'array',
    }, //- lat & long

    fAllergyTags:{},
    fDietaryTags:{},

    fCardNumber:{
      type: 'string',
      max: 17
    },
    fCardExpMonth:{
      type: 'string',
      max: 2
    },
    fCardExpYear:{
      type: 'string',
      max: 4
    },
    deleted_at:{
      type: 'datetime',
      defaultsTo: null,
    },

    uID:{},

  }
};

