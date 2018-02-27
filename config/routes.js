/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //- root route
  '/': {
    
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/


  //- User routes

  /**
   * 
   * @api {POST} /api/register User register
   * @apiName User register
   * @apiGroup User
   * @apiVersion  1.0.0
   * 
   * 
   * @apiParam  {String} username Username
   * @apiParam  {String} email User's email
   * @apiParam  {String} password User's password
   * 
   * 
   * @apiParamExample  {json} Request-Example:
     {
         "username" : "<username>",
         "email": "<user email>",
         "password": "<user password>"
     }
   * 
   * @apiSuccess (200) {Boolean} error true/false
   * @apiSuccess (200) {String} message successful string
   * @apiSuccess (200) {Object} data show data
   * 
   * @apiSuccessExample {json} Success-Response:
     {
        HTTP/1.1 200 OK
        
     }
   * 
   * 
   */
  'POST /api/register':{
    controller: 'UserController',
    action: 'register',
  },

  'POST /api/login':{
    controller: 'UserController',
    action: 'login',
  },

  'POST /api/email/resend':{
    controller: 'UserController',
    action: 'resendEmail',
  },

  /**
   * 
   * @api {POST} /api/check/token User email's code validation
   * @apiName User email's code validation
   * @apiGroup User
   * @apiVersion  1.0.0
   * 
   * 
   * @apiParam  {String} token
   * 
   * 
   * @apiParamExample  {json} Request-Example:
     {
         "token" : "<token inside the email>",
     }
   * 
   * 
   */
  'GET /api/verify/:token':{
    controller: 'UserController',
    action: 'verifyToken',
  },

  'GET /api/reset/password':{
    controller: 'UserController',
    action: 'resetPass',
  },

  'POST /api/update/password': {
    controller: 'UserController',
    action: 'updateNewPassword',
  },

  'POST /api/email/verified':{
    controller: 'UserController',
    action: 'checkEmailVerified'
  },

  'GET /api/test':{
    controller: 'UserController',
    action: 'test',
  },

  'POST /api/user/upload/image':{
    controller: 'UserController',
    action: 'uploadImage',
  },

  'POST /api/user/update':{
    controller: 'UserController',
    action: 'updateUser'
  },

  /**
   * 
   * @api {POST} /api/check/token User's token checking
   * @apiName User's token checking
   * @apiGroup User
   * @apiVersion  1.0.0
   * 
   * 
   * @apiParam  {String} userToken
   * 
   * 
   * @apiParamExample  {json} Request-Example:
     {
         "userToken" : "<user token string here>",
     }
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
     {
        HTTP/1.1 200 OK
        "token is not expired"
     }
   * 
   * 
   * * @apiSuccessExample {json} Success-Response:
     {
        HTTP/1.1 500
        "expired"
     }
   * 
   * 
   */
  'POST /api/check/token':{
    controller: 'UserController',
    action: 'isExpired'
  },

  //- facebook authentication
  'GET /auth/facebook':{
    controller: 'UserController',
    action: 'facebook',
  },

  'GET /auth/facebook/callback':{
    controller: 'UserController',
    action: 'facebookCallback',
  },

  //- google authentication
  'GET /auth/google':{
    controller: 'UserController',
    action: 'google',
  },
  'GET /auth/google/callback':{
    controller: 'UserController',
    action: 'googleCallback',
  },

  //- Chef routes
  'GET /api/chef/view/all': {
    controller: 'ChefController',
    action: 'showAllChef',
  },

  'POST /api/chef/view/id': {
    controller: 'ChefController',
    action: 'viewByID',
  },

  /**
   * 
   * @api {POST} /path Create Chef's profile
   * @apiName /api/chef/create
   * @apiGroup Chef
   * @apiVersion  1.0.0
   * 
   * 
   * @apiParam  {String} firstName Chef's first name
   * @apiParam  {String} lastName Chef's last name
   * 
   * @apiSuccess (200) {type} name description
   * 
   * @apiParamExample  {type} Request-Example:
     {
         property : value
     }
   * 
   * 
   * @apiSuccessExample {type} Success-Response:
     {
         property : value
     }
   * 
   * 
   */
  'POST /api/chef/create':{
    controller: 'ChefController',
    action: 'create',
  },

  'PUT /api/chef/update':{
    controller: 'ChefController',
    action: 'update'
  },

  'DELETE /api/chef/delete':{
    controller: 'ChefController',
    action: 'deleteChef',
  },

  //- Dish routes
  'POST /api/dish/create': {
    controller: 'DishController',
    action: 'create'
  },

  'POST /api/dish/create/ingredients':{
    controller: 'DishController',
    action: 'addIngredientsToDish',
  },
  
  'POST /api/dish/create/allergies':{
    controller: 'DishController',
    action: 'addAllergiesToDish',
  },

  'POST /api/dish/create/dietaries':{
    controller: 'DishController',
    action: 'addDietariesToDish',
  },

  'DELETE /api/dish/deleteAll': {
    controller: 'DishController',
    action: 'deleteAll',
  },

  'GET /api/dish/showByID': 'DishController.viewByID',

  'GET /api/dish/showAll':'DishController.viewAll',

  'GET /api/dish/showLimit':'DishController.viewLimit',
  
  'PUT /api/dish/update':{
    controller: 'DishController',
    action: 'update'
  },

  'DELETE /api/dish/delete/ingredients':'DishController.deleteIngredientsFromDish',
  
  //- Menu routes

  /**
   * 
   * @api {POST} /api/menu/create Create Menu's profile
   * @apiName Create Menu's profile
   * @apiGroup Menu
   * @apiVersion  1.0.0
   * 
   * 
   * @apiParam  {String} chefID Chef's ID
   * @apiParam  {String} name Menu's name
   * 
   * 
   * @apiParamExample  {json} Request-Example:
     {
         "chefID" : "5a7431f357076fd017913c9f",
         "name": "menu 1"
     }
   * 
   * @apiSuccess (200) {Boolean} error true/false
   * @apiSuccess (200) {String} message successful string
   * @apiSuccess (200) {Object} data show data
   * 
   * @apiSuccessExample {json} Success-Response:
     {
        HTTP/1.1 200 OK
        "error": false,
        "message": "Menu created...",
        "data": {
            "update_menu_id": "c918f3bd-6584-43b7-b639-e0d9c9f9c81a",
            "create_menu_id": "5a7bf6bc29a21d20110c3e5a"
        }
     }
   * 
   * 
   */
  'POST /api/menu/create':{
    controller: 'MenuController',
    action: 'create',
  },

  /**
   * 
   * @api {POST} /api/menu/add/dish Add dish to menu
   * @apiName Add dish to menu
   * @apiGroup Menu
   * @apiVersion  1.0.0
   * 
   * 
   * @apiParam  {String} create_menu_id create_menu_id
   * @apiParam  {String} dishes Dish's ID, seperate with commas(,)
   * 
   * 
   * @apiParamExample  {json} Request-Example:
     {
         "create_menu_id" : "5a7bf6bc29a21d20110c3e5a",
         "dishes": "0001,0002,0003"
     }
   * 
   * @apiSuccess (200) {Boolean} error true/false
   * @apiSuccess (200) {String} message successful string
   * @apiSuccess (200) {Array} data show data
   * 
   * @apiSuccessExample {json} Success-Response:
     {
        HTTP/1.1 200 OK
        "error": false,
        "message": "Dish added to menu...",
        "data": [
            {
                "menu": "5a7bf6bc29a21d20110c3e5a",
                "dish": "0001",
                "createdAt": "2018-02-08T07:07:04.325Z",
                "updatedAt": "2018-02-08T07:07:04.325Z",
                "id": "5a7bf71829a21d20110c3e5b"
            },
            {
                "menu": "5a7bf6bc29a21d20110c3e5a",
                "dish": "0002",
                "createdAt": "2018-02-08T07:07:04.327Z",
                "updatedAt": "2018-02-08T07:07:04.327Z",
                "id": "5a7bf71829a21d20110c3e5c"
            },
            {
                "menu": "5a7bf6bc29a21d20110c3e5a",
                "dish": "0003",
                "createdAt": "2018-02-08T07:07:04.328Z",
                "updatedAt": "2018-02-08T07:07:04.328Z",
                "id": "5a7bf71829a21d20110c3e5d"
            }
        ]
     }
   * 
   * 
   */
  'POST /api/menu/add/dish':{
    controller: 'MenuController',
    action: 'addDishToMenu',
  },

  /**
   * 
   * @api {POST} /api/menu/view/dish View menu's dish
   * @apiName View menu's dish
   * @apiGroup Menu
   * @apiVersion  1.0.0
   * 
   * 
   * @apiParam  {String} create_menu_id create_menu_id
   * 
   * 
   * @apiParamExample  {json} Request-Example:
     {
         "create_menu_id" : "5a7bf6bc29a21d20110c3e5a"
     }
   * 
   * @apiSuccess (200) {Boolean} error true/false
   * @apiSuccess (200) {String} message successful string
   * @apiSuccess (200) {Array} data show data
   * 
   * @apiSuccessExample {json} Success-Response:
     {
        HTTP/1.1 200 OK
        "error": false,
        "message": "found data",
        "data": [
            {
                "menu": "5a7bf6bc29a21d20110c3e5a",
                "createdAt": "2018-02-08T07:07:04.325Z",
                "updatedAt": "2018-02-08T07:07:04.325Z",
                "id": "5a7bf71829a21d20110c3e5b"
            },
            {
                "menu": "5a7bf6bc29a21d20110c3e5a",
                "createdAt": "2018-02-08T07:07:04.327Z",
                "updatedAt": "2018-02-08T07:07:04.327Z",
                "id": "5a7bf71829a21d20110c3e5c"
            },
            {
                "menu": "5a7bf6bc29a21d20110c3e5a",
                "createdAt": "2018-02-08T07:07:04.328Z",
                "updatedAt": "2018-02-08T07:07:04.328Z",
                "id": "5a7bf71829a21d20110c3e5d"
            }
        ]
     }
   * 
   * 
   */
  'POST /api/menu/view/dish':{
    controller: 'MenuController',
    action: 'viewMenuDishes'
  },

  'POST /api/dish/view/menu':{
    controller: 'MenuController',
    action: 'viewDishMenu'
  },

  'POST /api/view/dishes':{
    controller: 'MenuController',
    action: 'viewDishByChefID',
  },

  'POST /api/menu/create/allergies':{
    controller: 'MenuController',
    action: 'addAllergiesToMenu',
  },

  'POST /api/menu/create/dietaries':{
    controller: 'MenuController',
    action: 'addDietariesToMenu',
  },

  'PUT /api/menu/update':{
    controller: 'MenuController',
    action: 'update',
  },

  //- Allergy routes
  'GET /api/allergy/viewAll':'AllergyController.viewAll',
  'POST /api/allergy/viewLimit':'AllergyController.viewAllWithLimit',
  'POST /api/allergy/create':'AllergyController.create',

  //- Dietary routes
  'GET /api/dietary/viewAll':'DietaryController.viewAll',
  'POST /api/dietary/viewLimit':'DietaryController.viewAllWithLimit',
  'POST /api/dietary/create':'DietaryController.create',

  //- Ingredient routes
  'POST /api/ingredient/create':'IngredientController.create',
  'POST /api/ingredient/create/multiple':'IngredientController.createMultiple',

};
