var bcrypt = require('bcrypt');

module.exports = {

    //- encrypt password
    genPass: function(options){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(options.pass, salt);
        return hash;
    },

    //- compare two password
    comparePass: function(options){ //- return true/false
        var userInputPass = options.user_input_pass;
        var databasePass = options.database_pass;
        return bcrypt.compareSync(userInputPass, databasePass); 
    },

}

