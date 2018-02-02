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
    mCost:{},
    mSuggestedPrice:{},
    mCustomPrice:{},
    mCookingTime:{},
    mServingOption:{},
    mTag:{},
    mMinOrder:{},

    deleted_at:{},

    //- foreign key
    dishes:{
      collection: 'dish',
      via: 'menu',
    },
    chef:{
      model: 'Chef',
    },

  }
};

