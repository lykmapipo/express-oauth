'use strict';


//dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * @module express-oauth
 * @name client-model
 * @function client-model
 * @description oauth client data model
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
const ClientSchema = new Schema({});

module.exports = mongoose.model('Client', ClientSchema);