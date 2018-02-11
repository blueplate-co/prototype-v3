/**
 * ChefController
 *
 * @description :: Server-side logic for managing Chefs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var path = require('path');
var ObjectId = require('mongodb').ObjectId;
const uuidv4 = require('uuid/v4'); //- random unique string
module.exports = {
        
    create: function(req, res)
    {
        var data = {};
        //- basic info
        data.cFirstName = req.param('firstName');
        data.cLastName = req.param('lastName');
        data.uid = req.param('uid');
        //- check uid (for email duplicate) to create profile
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


        //- experience => array
        // data.cCertification = req.param('certification');
        // data.cSchool = req.param('school');
        data.cExperience = req.param('experiences'); //- must be an array of obbject

        //- yourself
        data.cAbout = req.param('about');
        data.cInspiration = req.param('inspiration');

        //- food allergy + dietaries (must be an array)
        // data.dietaries = ['cá', 'rau sống'];
        data.cFoodAllergy = req.param('foodallergies');
        data.CDietary = req.param('dietaries');

        //- create unique id
        var uuid = uuidv4();
        data.chef_id = uuid;

        //- upload image seperately
        data.cImageName = req.param('chefImageName');
        ImageService.saveImage({
            req: req,
            res: res,
            fileInput: 'chefImage'
        });

        //- create chef first
        //- then insert ingredients, allergy
        Chef
        .findOrCreate(data)
        .then(function(created_user){
            if(created_user)
            {
                
                return res.json(200, {
                    error: false,
                    message: 'insert success',
                    data: {
                        create_chef_id: created_user.id,
                        update_chef_id: created_user.chef_id,
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

    //- check if exist profile with this user id
    checkChefCreate:function(req, res)
    {
        var uid = req.param('userID'); //- using update chefID
        Chef
        .count({
            uid: uid
        }).exec(function(err, chefCount){
            if(err) res.json({
                error: true,
                message: 'errors',
                data: err
            });

            //- if success
            if(chefCount == 0)
            {
                //- chef profile is not exist
                res.ok({
                    error: false,
                    message: 'Chef profile is not found',
                    data: chefCount
                });
            }else{
                //- chef profile is exist
                res.ok({
                    error: false,
                    message: 'chef profile found',
                    data: chefCount
                });
            }
        });
    },

    //- view chef info by id
    viewByID: function(req, res)
    {
        
        var cid = req.param('chefID');
        sails.log(cid);
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
    showAllChef: function(req, res)
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

    //- update by user id
    update: function(req, res){
        if(req.method === 'PUT')
        {
            //- must be update_chef_id
            var cid = req.param('update_chef_id');
            sails.log(cid);
             //- update random field
            //- this is must be an object {}
            var data = req.param('data');
            var fileName = req.param('chefImageName');
            if(fileName != null)
            {
                //- upload image seperately
                var imageName = {cImageName: fileName};
                ImageService.saveImage({
                    req: req,
                    res: res,
                    fileInput: 'chefImage'
                });
                sails.log('Upload image success');
            }
            
            Chef
            .update({
                chef_id: cid,
            }, _.assign(JSON.parse(data), imageName))
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
        
        
    },

    //- delete chef by chef id
    deleteChef: function(req, res)
    {
        //- delete by chef id
        //- relationship delete
        var cid = req.param('chefID');

        sails.log(cid);
        Chef
        .destroy({
            id: cid
        })
        .exec(function (err) {
            if (err) {
                return res.negotiate(err);
            }
            sails.log('Delete success');
            return res.ok({
                error: false,
                message: 'Deleted',
                data: null
            });
        });
        
        // Chef
        // .destroy({
        //     id: cid
        // })
        // .then(function(deleted_data){
        //     res.json(200, {
        //         error: false,
        //         message: 'delete success',
        //         data: deleted_data
        //     });
        // })
        // .catch(function(err){
        //     res.json(500, {
        //         error: true,
        //         message: 'errors',
        //         data: err
        //     });
        // });

    },


};

