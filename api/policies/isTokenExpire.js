
module.exports = function(req, res, next) {

    sails.log('token: ', req.headers);
    //- get token from headers
    // sails.log(req.headers.authorization);
    if(req.headers.authorization)
    {
        var token = req.headers.authorization.split(' ')[1]; //- xxx.yyy.zzz
        //- check it
        var isOK = TokenService.verify({
            token: token,
        });
        sails.log('=============================');
        sails.log('authentication middleware');
        sails.log('token: ', token);
        sails.log('isOK? ',isOK);
        sails.log('=============================');
        //- if check token success
        if(isOK) return next();
        //- else
        return res.forbidden({
            error: true,
            message:'Please login to continue',
            data: null
        });
        // return  res.redirect('http://localhost:3000');
    }
    

    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    return res.forbidden('Please login to continue');

    // return res.redirect('http://localhost:3000');

}