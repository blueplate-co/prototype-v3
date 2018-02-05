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

        //- update
        //- chef id
        var cid = req.param('chefID');

        data.dDescribe = req.param('describe');
        //- upload image
        data.dImageName = req.param('dishImageName');
        ImageService.saveImage({
            req: req,
            res: res,
            fileInput: 'dishImage',
        });

        // data.dName = req.param('name');
        // data.dDescribe = req.param('describe');
        // data.dCost = req.param('cost');
        // data.dCookingTime = req.param('cookingTime');
        // //- serving option, dietary, food allergy
        // //- must be an array
        // data.dServingOption = req.param('servingOption');
        // data.dDietary = req.param('dietary');
        // data.dFoodAllergy = req.param('allergy');
        // data.dTag = req.param('tag');
        // data.ingredients = req.param('ingredients'); //- must be an array of ingredient's id

        // //- chef id
        // var cid = req.param('chefID');

        // //- upload image
        // data.dImageName = req.param('dishImageName');
        // ImageService.saveImage({
        //     req: req,
        //     res: res,
        //     fileInput: 'DishImage',
        // });
        
        //- finding chef
        Chef
        .findOne({})
        .where({
            id: cid,
        })
        .then(function(found_data){
            data.chef = found_data.id;
            sails.log(data);
            //- insert to dish data 
            Dish
            .create(data)
            .then(function(created_dish){
                sails.log(created_dish);
                // var did = created_dish.id;
                return res.json(200, {
                    error: false,
                    message: 'added new dish',
                    data:
                    {
                        dishID: created_dish.id
                    } 
                    
                    
                });
            })
            .catch(function(err){
                return res.json(500, {error: true, message: 'Cannot add new dish', data: err});
            });
            
            // found_data.dishes.add(data);
            // return found_data.dishes.save(function(err){});

            // res.json(200, {error: false, message: 'found', data: found_data});

        }).catch(function(err){
            res.json(500, {error: true, message: 'Errors', data: err});
        });

    },


    //- add single ingredient to dish
    addIngredientToDish: function(req, res)
    {
        var did = req.param('dishID');
        var iid = req.param('ingredientID');
        DishIngredient
            .create({
                dish: did,
                ingredient: iid,
            })
            .then(function(created_data){
                res.created({
                    error: false,
                    message: 'added new ingredient to dish',
                    data: {
                        created_data
                    }
                });
            })
            .catch(function(err){
                res.json(500, {
                    error: true, 
                    message: 'Cannot insert ingredient', 
                    data: err
                });
            });
    },

    //- add multiple 
    addIngredientsToDish: function(req, res)
    {

    },

    //- update by dish ID
    update: function(req, res)
    {
        var did = req.param('dishID');
        var data = req.param('data');
        if(typeof(data) === 'Object')
        {
            Dish
            .update({
                id: did,
            }, data)
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
        }
        
    },

    //- view dish by dish id
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


    //- delete by dish id
    delete: function(req, res)
    {
        var did = req.param('dishID');
        Dish.destroy({
            id: did
        }).catch(function(err){
            res.json(500, {
                error: true,
                message: 'errors',
                data: err
            });
        });
    }
    
};

