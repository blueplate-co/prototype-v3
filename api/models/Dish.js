/**
 * Dish.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'Dish',
  connection:'mongoAdapter',
  attributes: {

    id:{
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    dName:{
      type: 'string',
      size: 150,
      // required: true,
    },
    dDescribe:{
      type: 'string',
      required: true,
    },
    dCost:{
      type: 'float', //- or double
    },
    dSuggestedPrice:{
      type: 'float',
    },
    dCustomPrice:{
      type: 'float',
    },
    dCookingTime:{
      type: 'string',
    },

    //- array
    dServingOption:{
      type: 'array',
    },
    dDietary:{
      type: 'array',
    },
    dFoodAllergy:{
      type: 'array',
    },

    //- ['tag 1', 'tag 2']
    dTag:{
      type: 'array'
    },
    dImageName:{
      type: 'string',
      required: true,
    },
    

    //- foreign key
    menus:{
      // model: 'menu',
      collection: 'Menu',
      via: 'dishes',
      through: 'menudish',
    },
    chef:{
      model: 'Chef',
    },
    ingredients:{
      collection: 'Ingredient',
      via: 'dish',
      through: 'dishingredient',
    },

  }
};

