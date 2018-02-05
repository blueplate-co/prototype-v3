var path = require('path');
module.exports = {

    uploadImage: function(options){
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

    saveImage: function(options){
        //- input a request
        var req = options.req;
        var res = options.res;
        var fileInput = options.fileInput;
        var uid = options.uid;
        var uEmail = options.email;
        // setting allowed file types
        var allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        // skipper default upload directory .tmp/uploads/
        req.file(fileInput).upload({
            dirname: path.resolve(sails.config.appPath, 'public/images'),
            maxBytes: 5000000, //- limit 5MB
            //- customize
            saveAs:function(file, cb) {
                var d = new Date();
                var originFileName = file.filename;
                var extension = file.filename.split('.').pop();
                // sails.log(extension);
                // generating unique filename with extension
                var uuid = d.getMilliseconds() + "." + extension;
      
                // seperate allowed and disallowed file types
                if(allowedTypes.indexOf(file.headers['content-type']) === -1) {
                  // save as disallowed files default upload path
                //   cb(null,uuid);
                }else{
                  // save as allowed files
                  cb(null,"/" + originFileName);
                }


             }
        },function whenDone(err, uploadedFiles) {
            if (err) {
                return res.negotiate({error: true, message: 'Error !', data: err});
            }

            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length === 0){
                return res.badRequest({error: true, message: 'No file was uploaded', data: null});
            }
            //- open the image
            // sails.log(uploadedFiles[0].fd);
            sails.log('base url: ' + sails.getBaseUrl());
        //   res.render(uploadedFiles[0].fd);

            //- update chef profile
            return uploadedFiles[0].filename;

        });
        // return true;
    },

    optimizeImage: function(options){
        
    },

    saveToS3: function(options){
        
    },

    downloadImageByID: function(options){
        var res = options.res;
        var type = options.type; //- foodie or homecook (chef)
        var uid = options.uid; //- get images fd by uid

        var fd = '';

        if(type === 'foodie')
        {

        }else if(type === 'homecook')
        {
            
        }

        var SkipperDisk = require('skipper-disk');
        var fileAdapter = SkipperDisk(/* optional opts */);
        var server_path = "/home/transybao/blueplate/main/public/images/";
        var local_path = "E:/projects/sails/blueplate/public/images/";
        // set the filename to the same file as the user uploaded
        res.set("Content-disposition", "attachment; filename='315.jpeg'");

        // Stream the file down
        fileAdapter.read(local_path + '315.jpeg')
        .on('error', function (err){
        return res.serverError(err);
        })
        .pipe(res);
    },
    
}