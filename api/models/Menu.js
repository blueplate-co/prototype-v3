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
    mSellingPrice:{
      type: 'integer',
      min: 0,
    },
    mMinOrder:{
      type: 'integer',
      min: 0
    },
    mLeadHour:{
      type: 'integer',
    },
    mLeadDay:{
      type: 'integer',
    },
    mAverageRating:{
      type: 'float',
    },
    deleted_at:{},
    mOnlineStatus:{
      type: 'binary',
    },
    mOrderCount:{
      type: 'integer',
    },

    dID:{}, //- dishes ID
    uID:{},
  }
};

