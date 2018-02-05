/**
 * ChefController
 *
 * @description :: Server-side logic for managing Chefs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var path = require('path');
module.exports = {
    
    create: function(req, res)
    {
        var data = {};
        //- basic info
        data.cFirstName = req.param('firstName');
        data.cLastName = req.param('lastName');
        data.uid = req.param('uid');
        //- places
        data.cAddr = req.param('address');
        data.cPhoneNumber = req.param('phoneNumber');

        //- services
        data.cServiceOption = req.param('serviceOption');

        //- images (using service)
        // data.cImageName = req.param('chefImageName');

        //- about
        data.cDOB = req.param('dateOfBirth');
        data.cGender = req.param('gender');


        //- experience
        data.cCertification = req.param('certification');
        data.cSchool = req.param('school');

        //- yourself
        data.cAbout = req.param('about');
        data.cInspiration = req.param('inspiration');

        //- ingredients + dietaries (must be an array)
        // data.ingredients = ['thịt', 'cá', 'trứng', 'sữa'];
        // data.dietaries = ['cá', 'rau sống'];
        data.ingredients = req.param('ingredients');
        data.dietaries = req.param('dietaries');

        //- upload image seperately
        data.cImageName = ImageService.saveImage({
            req: req,
            res: res,
            fileInput: 'chefImage'
        });

        //- create chef first
        //- then insert ingredients, allergy
        Chef
        .create(data)
        .then(function(created_user){
            if(created_user)
            {
                
                return res.json(200, {
                    error: false,
                    message: 'insert success',
                    data: {
                        chefID: created_user.id
                    }
                });

            }   

        })
        .catch(function(err){
            return res.json(500, {
                error: true,
                message: 'Cannot create chef',
                data: err
            });
        });
        


    },

    //- view chef info by id
    viewByID: function(req, res)
    {
        var cid = req.param('chefID');
        Chef
        .find({})
        .where({
            id: cid
        })
        .then(function(found_data){
            return res.json(200, {
                error: false,
                message: 'found',
                data: found_data
            });
        })
        .catch(function(err){
            return res.json(500, {
                error: true,
                message: 'errors',
                data: err
            });
        });
    },

    //- view all chef
    viewAll: function(req, res)
    {
        var cid = req.param('chefID');
        Chef
        .find({})
        .then(function(found_data){
            return res.json(200, {
                error: false,
                message: 'found',
                data: found_data
            });
        })
        .catch(function(err){
            return res.json(500, {
                error: true,
                message: 'errors',
                data: err
            });
        });
    },

    //- update by id
    update: function(req, res){
        if(req.method === 'PUT')
        {
            //- update random field
            //- this is must be an object {}
            var data = req.param('data');
            if(typeof(data) === 'Object')
            {
                var cid = req.param('chefID');
                //- if request has file
                //- upload the image with image name
                //- check if has file in request
                Chef.update({
                    id: cid
                },data)
                .then(function(updated_data){
                    res.json(200, {
                        error: false,
                        message: 'Chef updated...',
                        data: updated_data
                    });
                }).catch(function(err){
                    res.json(500, {
                        error: true,
                        message: 'Errors',
                        data: err
                    });
                });


            }
        }
        
        
    },

    //- delete chef by chef id
    delete: function(req, res)
    {
        //- delete by chef id
        //- relationship delete
        var cid = req.param('chefID');
        Chef
        .destroy({
            id: cid
        })
        .then(function(deleted_data){
            res.json(200, {
                error: false,
                message: 'delete success',
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


};

