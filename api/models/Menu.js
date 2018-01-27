/**
 * Menu.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id:{},
    mName:{},
    mSellingPrice:{},
    mMinOrder:{},
    mLeadHour:{},
    mLeadDay:{},
    mAverageRating:{},
    deleted_at:{},
    mOnlineStatus:{},
    mOrderCount:{},

    dID:{}, //- dishes ID
    uID:{},
  }
};

