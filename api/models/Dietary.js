/**
 * Dietary.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection:'mongoAdapter',
  tableName:'Dietary',
  attributes: {

    id:{
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },

    dName:{
      type: 'string',
      max: 200
    },
    dDescription:{
      type: 'string',
      max: 200
    },
    
    //- foreign key
    dishes:{
      collection: 'Dish',
      via: 'dietary',
      through: 'dishdietary',
    },
    
  }
};

