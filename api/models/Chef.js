/**
 * Chef.js
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
    cAddr:{},
    cPhoneNumber:{},
    cDOB:{},
    cGender:{},
    cCookingExperience:{},
    cCertification:{},
    cSchool:{},
    cAbout:{},
    cInspiration:{},

    //- profile images and banner
    cImageLink:{},
    //- services

    //-foreign key
    dishes:{
      collection: 'Dish',
      via: 'chef',
    },
    menus:{
      collection: 'Menu',
      via: 'chef',
    },

  }
};

