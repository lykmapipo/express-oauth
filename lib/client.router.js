'use strict';


/**
 * @apiDefine Client  Client
 *
 * @apiDescription An entity(i.e application) that interact with 
 * resource server(i.e API Server) on behalf of end user.
 *
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */


/**
 * @apiDefine Client
 * @apiSuccess {String} _id Unique client identifier
 * @apiSuccess {Date} createdAt Date when client was created
 * @apiSuccess {Date} updatedAt Date when client was last updated
 */


/**
 * @apiDefine Clients
 * @apiSuccess {Object[]} data List of clients
 * @apiSuccess {String} data._id Unique client identifier
 * @apiSuccess {Date} data.createdAt Date when client was created
 * @apiSuccess {Date} data.updatedAt Date when client was last updated
 * @apiSuccess {Number} total Total number of client
 * @apiSuccess {Number} size Number of client returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest client
 * was last modified
 */


/**
 * @apiDefine ClientSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 *    {
 *       "_id": "5aefff461e0a5527eb1955bd",
 *       "createdAt": "2018-05-07T07:24:54.490Z",
 *       "updatedAt": "2018-05-07T07:24:54.490Z"
 *    }
 */


/**
 * @apiDefine ClientsSuccessResponse
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
 * @apiError  JWTExpired Authorization token has expired
 */


/**
 * @apiDefine AuthorizationHeaderError
 * @apiError  AuthorizationHeaderRequired  Authorization header is required
 */


/**
 * @apiDefine AuthorizationHeaderErrorExample
 * @apiErrorExample   {json} Error-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "success":false,
 *      "message :"Authorization header required",
 *      "error":{}
 *    }
 */


/**
 * @apiDefine JWTErrorExample
 * @apiErrorExample  {json}   Error-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "success":false,
 *      "message :"jwt expired",
 *      "error":{}
 *    }
 */


/**
 * @apiDefine ClientRequestHeader
 * @apiHeader {String} [Accept=application/json] Accepted content type
 * @apiHeader {String} Authorization Authorization token
 * @apiHeader {String} [Accept-Encoding='gzip, deflate'] Accepted encoding type
 */


/**
 * @apiDefine ClientRequestHeaderExample
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
const PATH_LIST = '/clients';
const PATH_SINGLE = '/clients/:id';


/* declarations */
const Client = require(path.join(__dirname, 'client.model'));
const router = new Router({
  version: API_VERSION
});



/**
 * @api {get} /clients List Clients
 * @apiVersion 0.1.0
 * @apiName GetClients
 * @apiGroup Client
 * @apiDescription Returns a list of clients
 * @apiUse ClientRequestHeader
 * @apiUse Clients
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v0.1.0/clients
 *
 * @apiUse ClientRequestHeaderExample
 * @apiUse ClientsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getClients(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  Client
    .get(options, function onGetClients(error, results) {

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
 * @api {post} /clients Create New Client
 * @apiVersion 0.1.0
 * @apiName PostClient
 * @apiGroup Client
 * @apiDescription Create new client
 * @apiUse ClientRequestHeader
 * @apiUse Client
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v0.1.0/clients
 *
 * @apiUse ClientRequestHeaderExample
 * @apiUse ClientSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_LIST, function postClient(request, response, next) {

  //obtain request body
  const body = _.merge({}, request.body);

  Client
    .post(body, function onPostClient(error, created) {

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
 * @api {get} /clients/:id Get Existing Client
 * @apiVersion 0.1.0
 * @apiName GetClient
 * @apiGroup Client
 * @apiDescription Get existing client
 * @apiUse ClientRequestHeader
 * @apiUse Client
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v0.1.0/clients
 *
 * @apiUse ClientRequestHeaderExample
 * @apiUse ClientSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_SINGLE, function getClient(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  //obtain client id
  options._id = request.params.id;

  Client
    .getById(options, function onGetClient(error, found) {

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
 * @api {patch} /clients/:id Patch Existing Client
 * @apiVersion 0.1.0
 * @apiName PatchClient
 * @apiGroup Client
 * @apiDescription Patch existing client
 * @apiUse ClientRequestHeader
 * @apiUse Client
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v0.1.0/clients
 *
 * @apiUse ClientRequestHeaderExample
 * @apiUse ClientSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch(PATH_SINGLE, function patchClient(request, response, next) {

  //obtain client id
  const { id } = request.params;

  //obtain request body
  const patches = _.merge({}, request.body);

  Client
    .patch(id, patches, function onPatchClient(error, patched) {

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
 * @api {put} /clients/:id Put Existing Client
 * @apiVersion 0.1.0
 * @apiName PutClient
 * @apiGroup Client
 * @apiDescription Put existing client
 * @apiUse ClientRequestHeader
 * @apiUse Client
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v0.1.0/clients
 *
 * @apiUse ClientRequestHeaderExample
 * @apiUse ClientSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put(PATH_SINGLE, function putClient(request, response, next) {

  //obtain client id
  const { id } = request.params;

  //obtain request body
  const updates = _.merge({}, request.body);

  Client
    .put(id, updates, function onPutClient(error, updated) {

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
 * @api {delete} /clients/:id Delete Existing Client
 * @apiVersion 0.1.0
 * @apiName DeleteClient
 * @apiGroup Client
 * @apiDescription Delete existing client
 * @apiUse ClientRequestHeader
 * @apiUse Client
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v0.1.0/clients
 *
 * @apiUse ClientRequestHeaderExample
 * @apiUse ClientSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.delete(PATH_SINGLE, function deleteClient(request, response, next) {

  //obtain client id
  const { id } = request.params;

  Client
    .del(id, function onDeleteClient(error, deleted) {

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