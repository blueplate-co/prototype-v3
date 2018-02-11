/**
 * IngredientController
 *
 * @description :: Server-side logic for managing Ingredients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    //- view ingredient list
    view: function(req, res)
    {
        Ingredient
        .find({})
        .then(function(ingredient){
            res.json(200, {
                error: false,
                message: 'all ingredient',
                data: ingredient,
            });
        })
        .catch(function(err){
            res.json(500, {
                error: true,
                message: 'Errors. Cannot show all ingredient',
                data: err,
            });
        });
    },

    create: function(req, res)
    {
        var data = {};
        data.iName        = req.param('name');
        data.iDescription = req.param('description');
        data.iQuantity    = req.param('quantity');
        data.iUnit        = req.param('unit');
        Ingredient
        .create(data)
        .then(function(created_data){
            res.created({
                error: false,
                message: 'new ingredient created',
                data: created_data
            });
        })
        .catch(function(err){
            res.json(500, {
                error: true,
                message: 'Cannot create new ingradient',
                data: err
            });
        });
    },

    //- insert ingredient by array of object
    createMultiple: function(req, res)
    {
        //- array of object
        var data = req.param('data');
        Ingredient
        .create(JSON.parse(data))
        .then(function(created_data){
            res.ok({
                error: false,
                message: 'Create multiple ingredients success',
                data: created_data,
            });
        })
        .catch(function(err){
            res.badRequest({
                error: true,
                message: "Cannot create multiple ingredients",
                dat: err
            });
        });
    },



};

