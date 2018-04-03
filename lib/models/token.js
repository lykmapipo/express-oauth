'use strict';


//dependencies
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const Schema = mongoose.Schema;


/**
 * @module express-oauth
 * @name token-model
 * @function token-model
 * @description oauth token data model
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
const TokenSchema = new Schema({});

//plugins
TokenSchema.plugin(actions);

module.exports = mongoose.model('Token', TokenSchema);