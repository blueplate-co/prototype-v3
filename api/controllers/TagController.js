/**
 * TagController
 *
 * @description :: Server-side logic for managing Tags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    createSingle: function(req, res)
    {
        var tName = _.escape(req.param('tagName').trim());
        Tag
        .create({
            tName: tName
        })
        .then(function(created_data){
            res.ok({
                error: false,
                message: 'Created single tag success',
                data: created_data
            });
        })
        .catch(function(){
            
        });
    },

    createMultiple: function(req, res)
    {
        var data = req.param('tags'); //- array of object [{},{}]
        Tag
        .create(data)
        .then(function(created_data){
            res.ok({
                error: false,
                message: 'Created tags success',
                data: created_data
            });
        })
        .catch(function(err){
            res.negotiate({
                error: true,
                message: 'Errors',
                data: err
            });
        });
    },

    viewAll: function(req, res)
    {
        Tag
        .find()
        .create(function(found_data){
            res.ok({
                error: false,
                message: 'Created tags success',
                data: created_data
            });
        })
        .then(function(err){
            res.negotiate({
                error: true,
                message: 'Errors',
                data: err
            });
        });
    },

    updateCount: function(req, res)
    {
        //- update tag count
        //- by tag id
        var tagID = req.param('tagID');

        Tag
        .update({
            id: tagID
        },{
            tCount: tCount+=1
        })
        .then(function(updated_data){
            console.log(updated_data);
            res.ok({
                error: false,
                message: 'Update count of single tag OK',
                data: updated_data
            });
        })
        .catch(function(err){
            res.negotiate({
                error: true,
                message: 'Cannot update count',
                data:err
            });
        });
    },

    checkExist: function()
    {
        //- update tag count
        //- by tag id
        var tagID = req.param('tagID');

        Tag
        .count({
            id: tagID
        })
        .then(function(count){
            if(count > 1)
            {
                res.ok({
                    error: false,
                    message: 'This tag has already exist',
                    data: count
                });
            }else{
                res.ok({
                    error: false,
                    message: 'Created new tag !',
                    data: count
                });
            }
            
        })
        .catch(function(err){
            res.negotiate({
                error: true,
                message: 'Cannot check tag existance',
                data:err
            });
        });
    }

};

