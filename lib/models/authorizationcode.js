'use strict';


//dependencies
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const Schema = mongoose.Schema;


/**
 * @module express-oauth
 * @namauthorizatione authorizationcode-model
 * @function authorizationcode-model
 * @description oauth authorizationcode data model
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
const AuthorizationCodeSchema = new Schema({});

//plugins
AuthorizationCodeSchema.plugin(actions);

module.exports =
  mongoose.model('AuthorizationCode', AuthorizationCodeSchema);