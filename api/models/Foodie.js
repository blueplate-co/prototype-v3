/**
 * Foodie.js
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
    fEmail:{},
    fDOB:{},
    fKeyword:{},
    fGender:{},
    fAbout:{},
    fCountry:{},
    fAddress:{},
    fOfficeAddressCountry:{},
    fOfficeAddress:{},
    fOfficeCoodinates:{}, //- lat & long
    fAllergyTags:{},
    fDietaryTags:{},
    fCardNumber:{},
    fCardExpMonth:{},
    fCardExpYear:{},
    deleted_at:{},

    uID:{},

  }
};

