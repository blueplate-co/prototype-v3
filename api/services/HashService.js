var crypto = require('crypto');
var secret = 'ASDFGHJKL:QWERTYUIOZXCVN!@#$%^&*(asdfghjklqwertyuioozxcvbnm<>?:"{_+=-0][;';
module.exports = {
    //- create new random Hash string 
    //- for login token
    encrypt: function(options){

        var email = options.email;
        //- encrypt
        var cipher = crypto.createCipher('aes-128-cbc', secret);
        let encrypted = cipher.update(email, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    },

    decrypt: function(options)
    {
        //- encrypted data
        var crypted = options.cryptedData;
        //- decrypt
        var myKey = crypto.createDecipher('aes-128-cbc', secret);
        var data = myKey.update(crypted, 'hex', 'utf8');
        data += myKey.final('utf8');
        return data; //- user email
    }

}