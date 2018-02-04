/**
 * DishController
 *
 * @description :: Server-side logic for managing Dishes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var ObjectID = require('mongodb').ObjectID;
module.exports = {
	create: function(req, res){

        //- create new dish
        var data = {};
        data.dName = req.param('name');
        data.dDescribe = req.param('describe');
        data.dCost = req.param('cost');
        data.dCookingTime = req.param('cookingTime');
        //- serving option, dietary, food allergy
        //- must be an array
        data.dServingOption = req.param('servingOption');
        data.dDietary = req.param('dietary');
        data.dFoodAllergy = req.param('allergy');
        data.dTag = req.param('tag');

        //- chef id
        var cid = req.param('chefID');

        //- upload image
        data.dImageName = req.param('dishImageName');
        ImageService.saveImage({
            req: req,
            res: res,
            fileInput: 'DishImage',
        });
        
        //- finding chef
        Chef
        .findOne({})
        .where({
            id: cid,
        })
        .then(function(found_data){
            var chefID = found_data.id;
            
            //- insert to Dish table
            found_data.dishes.add(data);
            found_data.save(function(err){
                // if(err) return res.json(500, {error: true, message: 'Error', data: err});
            });
            res.json(200, {error: false, message: 'found', data: found_data});

        }).catch(function(err){
            res.json(500, {error: true, message: 'Errors', data: err});
        });

    },

    //- update by dish ID
    update: function(req, res)
    {
        var did = req.param('dishID');
        Dish
        .update({
            id: did,
        }, {

        })
        .then(function(dish){
            res.json(200, {
                error: false,
                message: 'Dish found',
                data: dish,
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

    createDishByMenuID: function(req, res){

    },

    view: function(req, res){
        //- view by dish id
        var did = req.param('dishID');
        Dish
        .findOne({})
        .where({
            id: did
        })
        .then(function(dish){
            res.json(200, {
                error: false,
                message: 'Dish found',
                data: dish,
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

    viewByChefID: function(req, res){
        //- view by dish id
        var cid = req.param('chefID');
        Dish
        .findOne({})
        .where({
            chef: cid
        })
        .then(function(chef){
            res.json(200, {
                error: false,
                message: 'Chef found',
                data: chef,
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


    
};

