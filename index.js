'use strict';


/**
 * @name express-oauth
 * @description minimal oauth implementation for express
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @example
 * 
 * const oauth = require('@lykmapipo/express-oauth');
 * 
 * oauth.app.start();
 * 
 */


//dependencies
const path = require('path');
const app = require('@lykmapipo/express-common');


/**import models*/
const modelsPath = path.join(__dirname, 'lib', 'models');
const ClientModel = require(path.join(modelsPath, 'client'));


/**import routers*/
const routersPath = path.join(__dirname, 'lib', 'routers');
const ClientRouter = require(path.join(routersPath, 'client'));


/**export client router & model*/
Object.defineProperty(exports, 'client', {
  get() {
    return { router: ClientRouter, model: ClientModel };
  }
});


/**export app*/
Object.defineProperty(exports, 'app', {
  get() {

    /**TODO bind oauth middlewares authenticate, token, authorize*/

    /**bind oauth routes*/
    app.mount(ClientRouter);

    return app;
  }
});