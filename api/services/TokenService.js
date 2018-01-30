var jwt = require('jsonwebtoken');
var secret = "QWERTYUIOPASDFGHJKL:ZXCVBNM<>?asdfghjkl1234567890-fuckyou";
module.exports = {

    /**
     * Generate a token
     */
    generate: function(options){
        var userInfo = options.userInfo; //- user id
        var token = jwt.sign(
            userInfo, 
            secret, 
            {expiresIn: "3 days"} //- 3 days
        );
        return token;
    },

    /**
     * Verify token
     */
    verify: function(options){
        var token = options.token;
        
        return jwt.verify(options.token, secret, function(err, decoded){
            //- if err
            if(err) {
                sails.log('error: ' + err);
                return false;
            }
            //- if ok
            return true;
        });


    },

    /**
     * Decode a token
     */
    decode:function(options){
        var token = options.token;
        return jwt.decode(token);
    },

}
