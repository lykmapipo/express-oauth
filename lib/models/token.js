'use strict';


//dependencies
const mongoose = require('mongoose');
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

module.exports = mongoose.model('Token', TokenSchema);