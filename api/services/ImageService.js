var path = require('path');
module.exports = {

    uploadImage:function(options){
        //- input a request
        var req = options.req;
        var res = options.res;
        var fileInput = options.fileInput;
        req.file(fileInput).upload({
            dirname: path.resolve(sails.config.appPath, 'public/images'),
            maxBytes: 5000000, //- limit 5MB
            
        },function whenDone(err, uploadedFiles) {
            if (err) {
                return res.negotiate({error: true, message: 'Error !', data: err});
              }

              // If no files were uploaded, respond with an error.
              if (uploadedFiles.length === 0){
                return res.badRequest({error: true, message: 'No file was uploaded', data: null});
              }
              //- open the image
              sails.log(uploadedFiles[0].fd);
            //   res.render(uploadedFiles[0].fd);
              return res.json(200, {error:false, message: 'Upload image success', data: uploadedFiles});

        });
        // return true;
    },

    optimizeImage: function(options){
        
    },

    downloadImage: function(){

    },
    
}