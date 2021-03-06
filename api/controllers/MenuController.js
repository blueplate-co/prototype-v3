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
        data.mDescribe       = req.param('describe');
        data.mNumberOfPeople = parseInt(req.param('numberOfPeople'));
        //- cost
        data.mCost           = parseInt(req.param('cost'));
        data.mSuggestedPrice = parseInt(req.param('suggestedPrice'));
        data.mCustomPrice    = parseInt(req.param('customPrice'));
        //- prepare time
        data.mCookingTime    = parseInt(req.param('prepareTime'));
        // //- array
        data.mTag            = req.param('tags').split(',');

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
        var mid = req.param('create_menu_id');
        //- string
        var allergies = req.param('allergies');
        // var allergies = [
        //     {dish:did, allergies: 1},
        //     {dish:did, allergies: 2},
        //     {dish:did, allergies: 3}
        // ];
        if(allergies.length > 0)
        {
            var converted = LodashService.convertToCreate({
                plainString: allergies,
                fixedID: mid,
                fixedName: 'menu',
                fixedName2: 'allergy',
            });
    
            MenuAllergy
            .findOrCreate(converted)
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
        }else{
            res.ok("Allergy is null");
        }
        
    },

    addDietariesToMenu:function(req, res){

        //- must be create_menu_id
        var mid = req.param('create_menu_id');
        //- string
        var dietaries = req.param('dietaries');
        // var dietaries = [
        //     {dish:did, dietaries: 1},
        //     {dish:did, dietaries: 2},
        //     {dish:did, dietaries: 3}
        // ];
        if(dietaries.length > 0)
        {
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
        }else{
            res.ok('Dietary is null');
        }
        

    },

    //- update by dish id
    update: function(req, res){
        if(req.method === 'PUT')
        {
            //- must be update_dish_id
            var mid = req.param('update_menu_id');
            sails.log(mid);
             //- update random field
            //- this is must be an object {}
            // var data = JSON.parse(req.param('data'));//- using for postman
            var data = JSON.parse(req.param('data'));
            sails.log(typeof(data));
            
            var fileName = req.param('menuImageName');
            var imageName = {};
            if(fileName != null)
            {
                //- upload image seperately
                imageName = {mImageName: fileName};
                ImageService.saveImage({
                    req: req,
                    res: res,
                    fileInput: 'menuImage'
                });
                sails.log('Upload image success');
                
            }
            sails.log('----------');
            sails.log(_.assign(data, imageName));
            sails.log(_.assign(data, {
                updatedAt: new Date()
            }));

            Menu
            .update(
            {
                menu_id: mid
            }
            , 
            // {
            //     dDescribe: 'hehe2',
            //     dCost: 2,
            //     updatedAt: new Date()
            // }
            data
            )
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
        var mid = req.param('create_menu_id');
        var did = req.param('dishes');

        sails.log(mid);
        //- dish array
        // var dishes = [
        //     {menu: mid, dish: 321},
        //     {menu: mid, dish: 654},
        // ];
        
        var converted = LodashService.convertToCreate({
            plainString: did,
            fixedID: mid,
            fixedName: 'menu',
            fixedName2: 'dish',
        });

        Menu
        .findOne({})
        .where({
            id: mid
        })
        .then(function(menu_found){
            //- insert dish to many-to-many table
            MenuDish
            .create(converted)
            .then(function(created_data){
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
        var mid = req.param('create_menu_id');
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

    //- view dish list by chef id
    viewDishByChefID: function(req, res)
    {
        var chefID = req.param('create_chef_id');
        Dish
        .find({})
        .where({
            chef: chefID
        })
        .then(function(found_data){
            console.log(found_data);
            res.ok(found_data);
        })
        .catch(function(err){
            console.log(err);
            res.negotiate(err);
        });

    },

    //- view menus by chef id
    viewMenuByChefID: function(req, res)
    {
        var chefID = req.param('create_chef_id');
        Menu
        .find({
            chef: chefID,
            deletedAt: null
        })
        .then(function(found_data){
            res.ok({
                error: true,
                message: "Menu was found !",
                data: found_data
            });
        })
        .catch(function(err){
            console.log(err);
            res.negotiate({
                error: true,
                message: 'Errors',
                data: err
            });
        });
    },

    //- delete by menu id (single)
    //- soft delete
    delete: function(req, res)
    {
        var menuID = req.param('update_menu_id');
        Menu
        .update({
            // id: dishID,
            menu_id: menuID,
        },{
            deletedAt: new Date()
        })
        .then(function(deleted_data){
            res.ok({
                error: false,
                message: 'Soft deleted single menu',
                data: deleted_data
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

    //- delete multiple dish by dish array of object
    deleteMultiple: function(req, res)
    {
        //- ["",""]
        var menuIDData = req.param('update_menu_id_array'); 
        
        //- using postman
        // let m2 = JSON.parse(menuIDData);
        // console.log('dish id type: ',typeof(m2));
        // console.log(JSON.parse(menuIDData));

        // console.log('dish id array: ', menuIDData);
        Menu
        .update({ 
            // menu_id: JSON.parse(menuIDData), //- using postman
            menu_id: menuIDData
        }
        ,{
            deletedAt: new Date()
        })
        .then(function(deleted_data){
            res.ok({
                error: false,
                message: 'Deleted success...',
                data: deleted_data
            });
        })
        .catch(function(err){
            res.negotiate({
                error: true,
                message: 'Errors',
                data: err
            });
        });
    }

    

};

