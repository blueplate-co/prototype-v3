
module.exports = function(req, res, next) {

    //- get token from headers
    // sails.log(req.headers.authorization);
    if(req.headers.authorization)
    {
        var token = req.headers.authorization.split(' ')[1]; //- xxx.yyy.zzz
        //- check it
        var isOK = TokenService.verify({
            token: token,
        });
        if(typeof(isOK) == 'array') {
            //- if it is a token then check expriration of it
            var exp = '';
            return next();
        };
    }
    

    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    return res.forbidden('Please login to continue');


}