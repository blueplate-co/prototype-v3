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
    },
    dDescribe:{
      type: 'string',
    },
    dCost:{
      type: 'float', //- or double
    },
    dCookingTime:{
      type: 'string',
    },
    //- needed to be thinking more
    dServingOption:{
      type: 'string',
    },
    dDietary:{
      type: 'string',
    },
    dFoodAllergy:{
      type: 'string',
    },

    //- 
    dTag:{},
    dImageLink:{
      type: 'string',
    },
    

    //- foreign key
    menu:{
      model: 'menu',
    },
    chef:{
      model: 'Chef',
    },

  }
};

