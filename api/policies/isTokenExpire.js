
module.exports = function(req, res, next) {

    //- get token from headers
    // sails.log(req.headers.authorization);
    if(req.headers.authorization)
    {
        var token = req.headers.authorization.split(' ')[1]; //- xxx.yyy.zzz
        //- check it
        sails.log(token);
        var isOK = TokenService.verify({
            token: token,
        });
        if(typeof(isOK) == 'object') {
            //- if it is a token then check expriration of it
            var expirationDate = isOK[0]; //- in milliseconds
            //- convert milliseconds and compare to current date

            return next();
        }
        return res.forbidden('Please login to continue');
    }
    

    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    return res.forbidden('Please login to continue');


}