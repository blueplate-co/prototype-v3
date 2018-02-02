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
        data.cImageName = req.param('chefImage');

        //- about
        data.cDOB = req.param('dob');
        data.cGender = req.param('gender');


        //- experience
        data.cCertification = req.param('certification');
        data.cSchool = req.param('school');

        //- yourself
        data.cAbout = req.param('about');
        data.cInspiration = req.param('inspiration');
        


    },

};

