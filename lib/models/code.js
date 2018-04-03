'use strict';


//dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * @module express-oauth
 * @name code-model
 * @function code-model
 * @description oauth code data model
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
const AuthorizationCodeSchema = new Schema({});

module.exports =
  mongoose.model('AuthorizationCode', AuthorizationCodeSchema);