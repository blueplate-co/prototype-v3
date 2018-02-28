/**
 * FoodAllergyController
 *
 * @description :: Server-side logic for managing Foodallergies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    create: function(req, res)
    {
        var data = {};
        data.faName = req.param('name');
        data.faDescribe = req.param('describe');

        Allergy
        .create(data)
        .then(function(created_data){
            res.created({
                error: false,
                message: 'created new food allergy',
                data: created_data
            });
        })
        .catch(function(err){
            res.json(500, {
                error: true,
                message: 'errors',
                data: err
            });
        });
    },

    viewAll: function(req, res)
    {
        FoodAllergy
        .find({})
        .then(function(found_data){
            res.created({
                error: false,
                message: 'view all allergy',
                data: found_data
            });
        })
        .catch(function(err){
            res.json(500, {
                error: true,
                message: 'errors',
                data: err
            });
        });
    },

    viewAllWithLimit: function(req, res)
    {
        //- limit will be a number
        var limit = parseInt(req.param('limit'));
        FoodAllergy
        .find({})
        .limit(limit)
        .then(function(found_data){
            res.created({
                error: false,
                message: 'view all',
                data: found_data
            });
        })
        .catch(function(err){
            res.json(500, {
                error: true,
                message: 'errors',
                data: err
            });
        });
    },

    //- insert ingredient by array of object
    createMultiple: function(req, res)
    {
        //- array of object
        var data = req.param('data');
        sails.log(data);
        Allergy
        .findOrCreate(data)
        .then(function(created_data){
            res.ok({
                error: false,
                message: 'Create multiple allergies success',
                data: created_data,
            });
        })
        .catch(function(err){
            res.badRequest({
                error: true,
                message: "Cannot create multiple allergies",
                dat: err
            });
        });
    },

};

