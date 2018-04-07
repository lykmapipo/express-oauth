'use strict';

/**
 * @apiDefine Client  Client
 *
 * An entity(i.e application) that interact with 
 * resource server(i.e API Server) on behalf of end user.
 *
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @public
 * 
 */


/**dependencies*/
const path = require('path');
const _ = require('lodash');
const Router = require('@lykmapipo/express-common').Router;


/**declaration*/
const Client = require(path.join(__dirname, '..', 'models', 'client'));
const router = new Router({ version: '1.0.0' });


/**expose client model*/
Object.defineProperty(router, 'Model', {
  get() {
    return Client;
  }
});


/**
 * @apiDefine ClientSchema
 * @apiSuccess {String} _id Unique client identifier
 * @apiSuccess {String} type Medium used by client i.e web, mobile, desktop etc.
 * @apiSuccess {String} secret Secret of the client
 * @apiSuccess {String} name Human readable name of the client e.g FooBar etc.
 * @apiSuccess {String[]} grants Allowed grant types forh the client e.g password etc.
 * @apiSuccess {String[]} redirectUris Allowed redirect uris for the client
 * @apiSuccess {NUmber} refreshTokenLifetime Client specific lifetime of generated refresh tokens in seconds
 * @apiSuccess {Number} accessTokenLifetime Client specific lifetime of generated access tokens in seconds
 * @apiSuccess {Number} authorizationCodeLifetime Client specific lifetime of generated access tokens in seconds
 * @apiSuccess {Date} createdAt Date when client was created
 * @apiSuccess {Date} updatedAt Date when client was last updated
 */


/**
 * @apiDefine ClientList
 * @apiSuccess {Object[]} data List of client
 * @apiSuccess {Number} total Total number of client
 * @apiSuccess {Number} size Number of client returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 */


/**
 * @api {get} /clients List Clients
 * @apiVersion 1.0.0
 * @apiName GetClients
 * @apiGroup Client
 *  
 * @apiDescription Returns a list of registered clients
 *
 * @apiHeader {String} Accept=application/json Accepted content type
 * @apiHeader {String} Authorization Authorization token
 * @apiHeader {String} [Accept-Encoding='gzip, deflate'] Accepted encoding type
 *
 * @apiUse ClientList
 *
 * @apiExample {curl} curl:
 *   curl -i https://express-oauth.herokuapp.com/v1.0.0/clients
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     "Accept": "application/json"
 *     "Authorization": "Bearer ey6utFreRdy5"
 *     "Accept-Encoding": "gzip, deflate"
 *   }
 *   
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": [],
 *     "total": 0,
 *     "size": 0,
 *     "limit": 10,
 *     "skip": 0,
 *     "page": 1,
 *     "pages": 1
 *   }
 *   H
 */
router.get('/clients', function getClients(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  Client
    .get(options, function onGetClients(error, results) {

      //foward error
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


/**TODO api doc*/
router.post('/clients', function postClient(request, response, next) {

  //obtain request body
  const body = _.merge({}, request.body);

  Client
    .post(body, function onPostClient(error, created) {

      //foward error
      if (error) {
        next(error);
      }
      //handle response
      else {
        response.status(201);
        response.json(created);
      }

    });

});


/**TODO api doc*/
router.get('/clients/:id', function getClient(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  //obtain client id
  options._id = request.params.id;

  Client
    .getById(options, function onGetClient(error, found) {

      //foward error
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


/**TODO api doc*/
router.patch('/clients/:id', function patchClient(request, response, next) {

  //obtain client id
  const _id = request.params.id;

  //obtain request body
  const patches = _.merge({}, request.body);

  Client
    .patch(_id, patches, function onPatchClient(error, patched) {

      //foward error
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


/**TODO api doc*/
router.put('/clients/:id', function putClient(request, response, next) {

  //obtain client id
  const _id = request.params.id;

  //obtain request body
  const updates = _.merge({}, request.body);

  Client
    .put(_id, updates, function onPutClient(error, updated) {

      //foward error
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


/**TODO api doc*/
router.delete('/clients/:id', function deleteClient(request, response, next) {

  //obtain client id
  const _id = request.params.id;

  Client
    .del(_id, function onDeleteClient(error, deleted) {

      //foward error
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


/**expose router*/
module.exports = router;