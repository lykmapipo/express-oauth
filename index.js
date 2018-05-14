'use strict';


/**
 * @name express-oauth
 * @description minimal oauth implementation for express
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @license MIT
 * @example
 *
 * const { app } = require('@lykmapipo/express-oauth');
 *
 * ...
 *
 * app.start()
 * 
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const app = require('@lykmapipo/express-common');


/* local constants */
const libPath = path.join(__dirname, 'lib');


/* declarations */
const pkg = require(path.join(__dirname, 'package.json'));
const fields = [
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
];
const info = _.merge({}, _.pick(pkg, fields));


/* ensure api version */
process.env.API_VERSION = (process.env.API_VERSION || info.version);


/* import models */
const Client = require(path.join(libPath, 'client.model'));


/* import routers */
const clientRouter = require(path.join(libPath, 'client.router'));


/* export package(module) info */
exports.info = info;


/* export models */
exports.Client = Client;


/* export routers */
exports.clientRouter = clientRouter;


/* export app */
Object.defineProperty(exports, 'app', {
  get() {

    /* TODO bind oauth middlewares authenticate, token, authorize */

    /* bind oauth routes */
    app.mount(clientRouter);

    return app;
  }
});