module.exports = {

    upload:function(options){
        //- input a request
        var req = options.req;

        req.file('avatar').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/images')
        },function (err, uploadedFiles) {

            if (err) return res.negotiate(err);
            return res.json({
                message: uploadedFiles.length + ' file(s) uploaded successfully!'
            });
            
        });


    },

    optimizeImage: function(options){
        
    }
    
}