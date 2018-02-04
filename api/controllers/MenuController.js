/**
 * MenuController
 *
 * @description :: Server-side logic for managing Menus
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    //- create new menu from chef
    create: function(req, res)
    {
        var cid = req.param('chefID');
        //- some data to insert
        var data = {};
        data.mName           = req.param('name');
        data.mCost           = req.param('cost');
        data.mSuggestedPrice = req.param('suggestedPrice');
        data.mCustomPrice    = req.param('customPrice');
        data.mCookingTime    = req.param('cookingTime');
        data.mMinOrder       = req.param('minOrder');
        
        //- array
        data.mServingOption  = req.param('servingOption');
        data.mTag            = req.param('tags');
        
        //- finding chef
        Chef
        .findOne({})
        .where({
            id: cid
        })
        .then(function(found_chef){
            if(!found_chef) return res.json(404, {error: true, message: 'Chef not found', data: null});
            found_chef.menus.add(data);
            found_chef.save(function(err){});
            
            //- create new menu
            return res.created({
                error: false,
                message: 'Menu created...',
                data: null
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

    addDishToMenu: function(req, res){
        //- insert dish by menu id, dishID + chefID
        var mid = req.param('menuID');
        var did = req.param('dishID');
        var cid = req.param('chefID');

        Menu
        .findOne({})
        .where({
            id: mid
        })
        .then(function(menu_found){
            //- insert dish to many-to-many table
            MenuDish
            .create({
                menu: mid,
                dish: did
            }).then(function(created_data){
                res.created({
                    error: false,
                    message: 'Dish added to menu...',
                    data: created_data
                });
            }).catch(function(err){
                res.json(500, {
                    error: true,
                    message: 'errors',
                    data: err
                });
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

    //- view menu dishes by menu id
    viewMenuDishes: function(req, res)
    {
        var mid = req.param('menuID');
        MenuDish
        .find({})
        .where({
            menu: mid
        })
        .populate('dish')
        .then(function(found_data){
            res.json(200, {
                error: false,
                message: 'found data',
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

    //- view menu by dish id
    viewDishMenu: function(req, res)
    {
        var did = req.param('dishID');
        MenuDish
        .find({})
        .where({
            dish: did
        })
        .populate('menu')
        .then(function(found_data){
            res.json(200, {
                error: false,
                message: 'found data',
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
    

};

