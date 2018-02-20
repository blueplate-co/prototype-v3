module.exports = {

    'facebook' : {
        'clientID'      : '157133415087106', // your App ID
        'clientSecret'  : '42417987d7d7b05b3ffd887cc52b84ad', // your App Secret
        'callbackURL'   : 'http://localhost:1337/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name', 'currency', 'gender', 'locale', 'birthday', 'age_range'] // For requesting permissions from Facebook API
    },
}