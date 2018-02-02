/**
 * ChefController
 *
 * @description :: Server-side logic for managing Chefs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    create: function(req, res)
    {
        var data = {};
        //- basic info
        data.cFirstName = req.param('firstName');
        data.cLastName = req.param('lastName');
        data.email = req.param('email');
        //- places
        data.cAddr = req.param('address');
        data.cPhoneNumber = req.param('phoneNumber');

        //- services
        data.cServiceOption = req.param('serviceOption');

        //- images (using service)
        data.cImageName = req.param('chefImageName');

        //- about
        data.cDOB = req.param('dateOfBirth');
        data.cGender = req.param('gender');


        //- experience
        data.cCertification = req.param('certification');
        data.cSchool = req.param('school');

        //- yourself
        data.cAbout = req.param('about');
        data.cInspiration = req.param('inspiration');

        //- upload image seperately
         ImageService.saveImage({
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
                var uID = created_user.id;
                sails.log(uID);
                created_user.ingredients.add({
                    iName: 'ingredient 1',
                    iDescription: 'asdasdasd',
                });

                created_user.save(function(err){});

            }   

        }).catch(function(err){
            return res.json(500, {
                error: true,
                message: 'Cannot create chef',
                data: err
            });
        });
        


    },

};

