'use strict';


/**
 * @apiDefine User  User
 *
 * @apiDescription Manage user.
 *
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */


/**
 * @apiDefine User
 * @apiSuccess {String} _id Unique user identifier
 * @apiSuccess {Date} createdAt Date when user was created
 * @apiSuccess {Date} updatedAt Date when user was last updated
 */


/**
 * @apiDefine Users
 * @apiSuccess {Object[]} data List of users
 * @apiSuccess {String} data._id Unique user identifier
 * @apiSuccess {Date} data.createdAt Date when user was created
 * @apiSuccess {Date} data.updatedAt Date when user was last updated
 * @apiSuccess {Number} total Total number of user
 * @apiSuccess {Number} size Number of user returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest user
 * was last modified
 */


/**
 * @apiDefine UserSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 *    {
 *       "_id": "5aefff461e0a5527eb1955bd",
 *       "createdAt": "2018-05-07T07:24:54.490Z",
 *       "updatedAt": "2018-05-07T07:24:54.490Z"
 *    }
 */


/**
 * @apiDefine UsersSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "data": [
 *     {
 *       "_id": "5aefff461e0a5527eb1955bd",
 *       "createdAt": "2018-05-07T07:24:54.490Z",
 *       "updatedAt": "2018-05-07T07:24:54.490Z"
 *    }
 *   ],
 *   "total": 20,
 *   "size": 10,
 *   "limit": 10,
 *   "skip": 0,
 *   "page": 1,
 *   "pages": 2,
 *   "lastModified": "2018-05-07T07:22:43.771Z"
 * }
 */


/**
 * @apiDefine JWTError
 * @apiError JWTExpired Authorization token has expired
 */


/**
 * @apiDefine AuthorizationHeaderError
 * @apiError AuthorizationHeaderRequired Authorization header is required
 */


/**
 * @apiDefine AuthorizationHeaderErrorExample
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "success":false,
 *      "message :"Authorization header required",
 *      "error":{}
 *    }
 */


/**
 * @apiDefine JWTErrorExample
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "success":false,
 *      "message :"jwt expired",
 *      "error":{}
 *    }
 */


/**
 * @apiDefine UserRequestHeader
 * @apiHeader {String} [Accept=application/json] Accepted content type
 * @apiHeader {String} Authorization Authorization token
 * @apiHeader {String} [Accept-Encoding='gzip, deflate'] Accepted encoding type
 */


/**
 * @apiDefine UserRequestHeaderExample
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     "Accept": "application/json"
 *     "Authorization": "Bearer ey6utFreRdy5"
 *     "Accept-Encoding": "gzip, deflate"
 *   }
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */



/* dependencies */
const path = require('path');
const _ = require('lodash');
const Router = require('@lykmapipo/express-common').Router;


/* local constants */
const API_VERSION = process.env.API_VERSION || '1.0.0';
const PATH_LIST = '/users';
const PATH_SINGLE = '/users/:id';


/* declarations */
const User = require(path.join(__dirname, 'user.model'));
const router = new Router({
  version: API_VERSION
});



/**
 * @api {get} /users List Users
 * @apiVersion 0.1.0
 * @apiName GetUsers
 * @apiGroup User
 * @apiDescription Returns a list of users
 * @apiUse UserRequestHeader
 * @apiUse Users
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v0.1.0/users
 *
 * @apiUse UserRequestHeaderExample
 * @apiUse UsersSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getUsers(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  User
    .get(options, function onGetUsers(error, results) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(results);
      }

    });

});



/**
 * @api {post} /users Create New User
 * @apiVersion 0.1.0
 * @apiName PostUser
 * @apiGroup User
 * @apiDescription Create new user
 * @apiUse UserRequestHeader
 * @apiUse User
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v0.1.0/users
 *
 * @apiUse UserRequestHeaderExample
 * @apiUse UserSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_LIST, function postUser(request, response, next) {

  //obtain request body
  const body = _.merge({}, request.body);

  User
    .post(body, function onPostUser(error, created) {

      //forward error
      if (error) {
        console.log(error);
        next(error);
      }

      //handle response
      else {
        response.status(201);
        response.json(created);
      }

    });

});



/**
 * @api {get} /users/:id Get Existing User
 * @apiVersion 0.1.0
 * @apiName GetUser
 * @apiGroup User
 * @apiDescription Get existing user
 * @apiUse UserRequestHeader
 * @apiUse User
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v0.1.0/users
 *
 * @apiUse UserRequestHeaderExample
 * @apiUse UserSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_SINGLE, function getUser(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  //obtain user id
  options._id = request.params.id;

  User
    .getById(options, function onGetUser(error, found) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(found);
      }

    });

});


/**
 * @api {patch} /users/:id Patch Existing User
 * @apiVersion 0.1.0
 * @apiName PatchUser
 * @apiGroup User
 * @apiDescription Patch existing user
 * @apiUse UserRequestHeader
 * @apiUse User
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v0.1.0/users
 *
 * @apiUse UserRequestHeaderExample
 * @apiUse UserSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch(PATH_SINGLE, function patchUser(request, response, next) {

  //obtain user id
  const { id } = request.params;

  //obtain request body
  const patches = _.merge({}, request.body);

  User
    .patch(id, patches, function onPatchUser(error, patched) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(patched);
      }

    });

});



/**
 * @api {put} /users/:id Put Existing User
 * @apiVersion 0.1.0
 * @apiName PutUser
 * @apiGroup User
 * @apiDescription Put existing user
 * @apiUse UserRequestHeader
 * @apiUse User
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v0.1.0/users
 *
 * @apiUse UserRequestHeaderExample
 * @apiUse UserSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put(PATH_SINGLE, function putUser(request, response, next) {

  //obtain user id
  const { id } = request.params;

  //obtain request body
  const updates = _.merge({}, request.body);

  User
    .put(id, updates, function onPutUser(error, updated) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(updated);
      }

    });

});



/**
 * @api {delete} /users/:id Delete Existing User
 * @apiVersion 0.1.0
 * @apiName DeleteUser
 * @apiGroup User
 * @apiDescription Delete existing user
 * @apiUse UserRequestHeader
 * @apiUse User
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v0.1.0/users
 *
 * @apiUse UserRequestHeaderExample
 * @apiUse UserSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.delete(PATH_SINGLE, function deleteUser(request, response, next) {

  //obtain user id
  const { id } = request.params;

  User
    .del(id, function onDeleteUser(error, deleted) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(deleted);
      }

    });

});



/* expose router */
module.exports = router;