/**
 * Menu.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection:'mongoAdapter',
  tableName:'Menu',
  attributes: {
    id:{
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    mName:{
      type: 'string',
    },
    mDescribe:{
      type: 'string'
    },
    mNumberOfPeople:{
      type: 'integer',
    },
    mCost:{
      type: 'integer', //- or double
    },
    mSuggestedPrice:{
      type: 'integer', //- or double
    },
    mCustomPrice:{
      type: 'integer',
    },
    mCookingTime:{
      type: 'integer',
    },
    mTag:{
      type: 'array'
    },

    //- image
    mImageName:{
      type: 'string',
    },
    
    deleted_at:{},

    

    //- foreign key
    dishes:{
      collection: 'Dish',
      via: 'menus',
      through: 'menudish',
    },
    chef:{
      model: 'Chef',
    },
    allergies:{
      collection: 'Allergy',
      via: 'menu',
      through: 'menuallergy',
    },
    dietaries:{
      collection: 'Dietary',
      via: 'menu',
      through: 'menudietary',
    },
    

  }
};

