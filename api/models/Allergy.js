/**
 * FoodAllergy.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'Allergy',
  connection:'mongoAdapter',
  attributes: {

    id:{
      type: 'string',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    aName:{
      type: 'string',
      max: 100,
    },
    aDescribe:{
      type: 'string',
      max: 200,
    },

    //- foreign key
    dishes: {
      collection: 'Dish',
      via: 'allergy',
      through: 'dishallergy',
    },
    menus:{
      collection: 'Menu',
      via: 'allergy',
      through: 'menuallergy',
    },


  }
};

