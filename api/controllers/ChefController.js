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
                //- insert relations
                // var uID = created_user.id;
                // sails.log(uID);
                // created_user.ingredients.add({
                //     iName: 'ingredient 1',
                //     iDescription: 'asdasdasd',
                // });

                // created_user.save(function(err){});
                
                return res.json(200, {
                    error: false,
                    message: 'insert success',
                    data: {
                        uid: created_user.id
                    }
                });
                // return created_user.id;
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

    //- update by id
    update: function(req, res){
        //- update random field
        //- this is must be an object {}
        var data = req.param('data');
        if(typeof(data) === 'Object')
        {
            var cid = req.param('chefID');
        
            //- check if has file in request

            Chef.update({
                id: cid
            },data)
            .then(function(updated_data){
                res.json(200, {
                    error: false,
                    message: 'Updated...',
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

    delete: function(req, res)
    {
        
        //- delete by chef id
        //- relationship delete
        var cid = req.param('chefID');
        Chef.delete({
            id: cid
        }).catch(function(err){
            res.json(500, {
                error: true,
                message: 'errors',
                data: err
            });
        });

    },

};

