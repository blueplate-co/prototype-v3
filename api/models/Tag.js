/**
 * Tag.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection:'mongoAdapter',
  tableName:'Tag',
  autoPK: true,
  attributes: {

    id:{
      type: 'string',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    tName: {
      type: 'string',
      required: true,
      size: 100
    },
    tCount:{
      type: 'integer',
      defaultsTo: 0
    }

  }
};

