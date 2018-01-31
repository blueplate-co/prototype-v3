/**
 * FriendController
 *
 * @description :: Server-side logic for managing Friends
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    sendRequest: function(req, res)
    {
        var userID = req.param('userID'); //- A
        var friendID = req.param('friendID'); //- B
        sails.log(req.params);
        //- insert to friend 
        Friend
        .create(req.params)
        .then(function(created_data){

        })
        .catch(function(err){

        });
    },

    acceptRequest: function(req, res)
    {
        
    },

    cancelRequest: function(req, res)
    {

    },

    unfriend: function(req, res)
    {

    }

};

