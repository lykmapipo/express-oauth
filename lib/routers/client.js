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


/**
 * @api {get} /clients Get Clients
 * @apiVersion 1.0.0
 * @apiName GetClients
 * @apiGroup Client
 * @apiPermission none
 *  
 * @apiDescription Returns a list of registered clients
 *
 * @apiExample Example Usage:
 * curl -i https://express-oauth.herokuapp.com/v1.0.0/clients
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Accept-Encoding": "Accept-Encoding: gzip, deflate"
 *       "Accept": "application/json"
 *     } 
 */
router.get('/clients', function GetClients(request, response, next) {

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


/**expose client model*/
Object.defineProperty(router, 'Model', {
  get() {
    return Client;
  }
});


module.exports = router;