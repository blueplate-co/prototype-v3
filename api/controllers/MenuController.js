/**
 * MenuController
 *
 * @description :: Server-side logic for managing Menus
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const uuidv4 = require('uuid/v4'); //- random unique string
module.exports = {
    //- create new menu from chef
    create: function(req, res)
    {
        var cid = req.param('chefID');
        //- some data to insert
        var data = {};
        data.mName           = req.param('name');
        // data.mCost           = req.param('cost');
        // data.mSuggestedPrice = req.param('suggestedPrice');
        // data.mCustomPrice    = req.param('customPrice');
        // data.mCookingTime    = req.param('cookingTime');
        // data.mMinOrder       = req.param('minOrder');
        
        // //- array
        // data.mServingOption  = req.param('servingOption');
        // data.mTag            = req.param('tags');

        //- create unique id
        var uuid = uuidv4();
        data.menu_id = uuid;
        data.chef = cid;
        
        //- finding chef
        Chef
        .findOne({})
        .where({
            id: cid
        })
        .then(function(found_chef){
            if(!found_chef) return res.json(404, {error: true, message: 'Chef not found', data: null});

            //- create menu with chef id
            Menu
            .findOrCreate(data)
            .then(function(created_menu){
                //- create new menu
                return res.created({
                    error: false,
                    message: 'Menu created...',
                    data: 
                    {
                        update_menu_id: created_menu.menu_id,
                        create_menu_id: created_menu.id,
                    }
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



    //- add multiple ingredients to dish
    addAllergiesToMenu: function(req, res)
    {
        //- must be create_menu_id
        var mid = req.param('menuID');
        //- string
        var allergies = req.param('allergies');
        // var allergies = [
        //     {dish:did, allergies: 1},
        //     {dish:did, allergies: 2},
        //     {dish:did, allergies: 3}
        // ];
        var converted = LodashService.convertToCreate({
            plainString: allergies,
            fixedID: mid,
            fixedName: 'menu',
            fixedName2: 'allergy',
        });

        MenuAllergy
        .create(converted)
        .then(function(created_data){
            res.created({
                error: false,
                message: 'added new allergy to menu',
                data: {
                    created_data
                }
            });
        })
        .catch(function(err){
            res.json(500, {
                error: true, 
                message: 'Cannot insert allergy', 
                data: err
            });
        });
    },

    addDietariesToMenu:function(req, res){

        //- must be create_menu_id
        var mid = req.param('menuID');
        //- string
        var dietaries = req.param('dietaries');
        // var dietaries = [
        //     {dish:did, dietaries: 1},
        //     {dish:did, dietaries: 2},
        //     {dish:did, dietaries: 3}
        // ];
        var converted = LodashService.convertToCreate({
            plainString: dietaries,
            fixedID: mid,
            fixedName: 'menu',
            fixedName2: 'dietary',
        });

        MenuDietary
        .create(converted)
        .then(function(created_data){
            res.created({
                error: false,
                message: 'added new dietary to menu',
                data: {
                    created_data
                }
            });
        })
        .catch(function(err){
            res.json(500, {
                error: true, 
                message: 'Cannot insert allergy', 
                data: err
            });
        });

    },

    //- update menu info by menu id
    //- update by dish id
    update: function(req, res){
        if(req.method === 'PUT')
        {
            //- must be update_dish_id
            var mid = req.param('update_menu_id');
            sails.log(mid);
             //- update random field
            //- this is must be an object {}
            var data = req.param('data');
            var fileName = req.param('menuImageName');
            if(fileName != null)
            {
                //- upload image seperately
                ImageService.saveImage({
                    req: req,
                    res: res,
                    fileInput: 'menuImage'
                });
                sails.log('Upload image success');
            }

            Menu
            .update(
            {
                menu_id: mid
            }
            , JSON.parse(data))
            .then(function(updated_data){
                return res.json(200, {
                    error: false,
                    message: 'Menu updated...',
                    data: updated_data
                });
            }).catch(function(err){
                return res.json(500, {
                    error: true,
                    message: 'Errors',
                    data: err
                });
            });

        }
        
        
    },

    //- add many dish to menu
    addDishToMenu: function(req, res){
        //- insert dish by menu id, dishID + chefID
        var mid = req.param('menuID');
        var did = req.param('dishID');
        var cid = req.param('chefID');


        MenuDish
        .find({})
        .where()
        .then()
        .catch(function(err){
            res.json(500, {
                error: true,
                message: 'errors',
                data: err
            });
        });


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

    //- delete by menu id
    delete: function(req, res)
    {
        var mid = req.param('menuID');
        Menu
        .destroy({
            id: mid
        })
        .then(function(deleted_data){
            res.ok({
                error: false,
                message: 'deleted menu',
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
    

};

