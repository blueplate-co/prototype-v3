/**
 * Ingredient.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection:'mongoAdapter',
  tableName:'Ingredient',
  attributes: {

    id:{
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    iName:{
      type: 'string',
      max: 100
    },
    iDescription:{
      type: 'string',
      max: 200
    },

    //- foreign key
    //- many to many relations
    chefs:{
      collection: 'Ingredient',
      via: 'ingredients',
    },

  }
};

