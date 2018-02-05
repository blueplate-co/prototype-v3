/**
 * FoodAllergy.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'FoodAllergy',
  connection:'mongoAdapter',
  attributes: {

    id:{
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    faName:{
      type: 'string',
      max: 100,
    },
    faDescribe:{
      type: 'string',
      max: 200,
    },


  }
};

