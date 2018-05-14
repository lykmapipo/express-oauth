'use strict';


/**
 * @apiDefine Token  Token
 *
 * @apiDescription Tokens(refresh, access and authorization code) 
 * for the client(s) that are generated durind authentication flows.
 *
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */


/**
 * @apiDefine Token
 * @apiSuccess {String} _id Unique token identifier
 * @apiSuccess {Date} createdAt Date when token was created
 * @apiSuccess {Date} updatedAt Date when token was last updated
 */


/**
 * @apiDefine Tokens
 * @apiSuccess {Object[]} data List of tokens
 * @apiSuccess {String} data._id Unique token identifier
 * @apiSuccess {Date} data.createdAt Date when token was created
 * @apiSuccess {Date} data.updatedAt Date when token was last updated
 * @apiSuccess {Number} total Total number of token
 * @apiSuccess {Number} size Number of token returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest token
 * was last modified
 */


/**
 * @apiDefine TokenSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 *    {
 *       "_id": "5aefff461e0a5527eb1955bd",
 *       "createdAt": "2018-05-07T07:24:54.490Z",
 *       "updatedAt": "2018-05-07T07:24:54.490Z"
 *    }
 */


/**
 * @apiDefine TokensSuccessResponse
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
 * @apiDefine TokenRequestHeader
 * @apiHeader {String} [Accept=application/json] Accepted content type
 * @apiHeader {String} Authorization Authorization token
 * @apiHeader {String} [Accept-Encoding='gzip, deflate'] Accepted encoding type
 */


/**
 * @apiDefine TokenRequestHeaderExample
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
const PATH_LIST = '/tokens';
const PATH_SINGLE = '/tokens/:id';
const PATH_CLIENT = '/clients/:id/tokens';


/* declarations */
const Token = require(path.join(__dirname, 'token.model'));
const router = new Router({
  version: API_VERSION
});



/**
 * @api {get} /tokens List Tokens
 * @apiVersion 0.1.0
 * @apiName GetTokens
 * @apiGroup Token
 * @apiDescription Returns a list of tokens
 * @apiUse TokenRequestHeader
 * @apiUse Tokens
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v0.1.0/tokens
 *
 * @apiUse TokenRequestHeaderExample
 * @apiUse TokensSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getTokens(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  Token
    .get(options, function onGetTokens(error, results) {

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
 * @api {post} /tokens Create New Token
 * @apiVersion 0.1.0
 * @apiName PostToken
 * @apiGroup Token
 * @apiDescription Create new token
 * @apiUse TokenRequestHeader
 * @apiUse Token
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v0.1.0/tokens
 *
 * @apiUse TokenRequestHeaderExample
 * @apiUse TokenSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_LIST, function postToken(request, response, next) {

  //obtain request body
  const body = _.merge({}, request.body);

  Token
    .post(body, function onPostToken(error, created) {

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
 * @api {get} /tokens/:id Get Existing Token
 * @apiVersion 0.1.0
 * @apiName GetToken
 * @apiGroup Token
 * @apiDescription Get existing token
 * @apiUse TokenRequestHeader
 * @apiUse Token
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v0.1.0/tokens
 *
 * @apiUse TokenRequestHeaderExample
 * @apiUse TokenSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_SINGLE, function getToken(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  //obtain token id
  options._id = request.params.id;

  Token
    .getById(options, function onGetToken(error, found) {

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
 * @api {patch} /tokens/:id Patch Existing Token
 * @apiVersion 0.1.0
 * @apiName PatchToken
 * @apiGroup Token
 * @apiDescription Patch existing token
 * @apiUse TokenRequestHeader
 * @apiUse Token
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v0.1.0/tokens
 *
 * @apiUse TokenRequestHeaderExample
 * @apiUse TokenSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch(PATH_SINGLE, function patchToken(request, response, next) {

  //obtain token id
  const { id } = request.params;

  //obtain request body
  const patches = _.merge({}, request.body);

  Token
    .patch(id, patches, function onPatchToken(error, patched) {

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
 * @api {put} /tokens/:id Put Existing Token
 * @apiVersion 0.1.0
 * @apiName PutToken
 * @apiGroup Token
 * @apiDescription Put existing token
 * @apiUse TokenRequestHeader
 * @apiUse Token
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v0.1.0/tokens
 *
 * @apiUse TokenRequestHeaderExample
 * @apiUse TokenSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put(PATH_SINGLE, function putToken(request, response, next) {

  //obtain token id
  const { id } = request.params;

  //obtain request body
  const updates = _.merge({}, request.body);

  Token
    .put(id, updates, function onPutToken(error, updated) {

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
 * @api {delete} /tokens/:id Delete Existing Token
 * @apiVersion 0.1.0
 * @apiName DeleteToken
 * @apiGroup Token
 * @apiDescription Delete existing token
 * @apiUse TokenRequestHeader
 * @apiUse Token
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v0.1.0/tokens
 *
 * @apiUse TokenRequestHeaderExample
 * @apiUse TokenSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.delete(PATH_SINGLE, function deleteToken(request, response, next) {

  //obtain token id
  const { id } = request.params;

  Token
    .del(id, function onDeleteToken(error, deleted) {

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


/**
 * @api {get} /clients/:client/tokens List Jurisdiction Tokens
 * @apiVersion 0.1.0
 * @apiName GetJurisdictionTokens
 * @apiGroup Token
 * @apiDescription Returns a list of tokens of specified client
 * @apiUse TokenRequestHeader
 * @apiUse Tokens
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v0.1.0/clients/:client/tokens
 *
 * @apiUse TokenRequestHeaderExample
 * @apiUse TokensSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_CLIENT, function getTokens(request, response, next) {

  //obtain request options
  const { client } = request.params;
  const filter =
    (client ? { filter: { client: client } } : {});
  const options =
    _.merge({}, filter, request.mquery);


  Token
    .get(options, function onGetTokens(error, found) {

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



/* expose router */
module.exports = router;