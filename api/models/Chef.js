/**
 * Chef.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection:'mongoAdapter',
  tableName:'Chef',
  attributes: {

    id:{
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    cFirstName:{
      type: 'string',
    },
    cLastName:{
      type: 'string',
    },
    cAddr:{
      type: 'string',
    },
    cPhoneNumber:{
      type: 'string',
    },
    cDOB:{
      type: 'string',
    },
    cGender:{
      type: 'string',
      max: 10,
    },
    // cCertification:{
    //   type: 'string',
    // },
    // cSchool:{
    //   type: 'string',
    //   max: 250
    // },
    cExperience:{
      type: 'array', //- array of object
    },
    cAbout:{
      type: 'text',
    },
    cInspiration:{
      type: 'text',
    },

    //- profile images and banner
    cImageName:{
      type: 'string',
    },
    //- services
    //- will be changed in future
    //- in model of one kitchen -> many services
    cServiceOption:{
      type:'array',
      // enum: ['diveIn', 'delivery', 'pickUp']
    },


    //-foreign key
    user:{
      model: 'user',
      unique: true,
    },

    dishes:{
      collection: 'Dish',
      via: 'chef',
    },

    menus:{
      collection: 'Menu',
      via: 'chef',
    },

    //- food allergy + dietaries
    cFoodAllergy:{
      type: 'array',
    },
    CDietary:{
      type: 'array',
    },

  }
};

