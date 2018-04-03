'use strict';


//dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * @module express-oauth
 * @name user-model
 * @function user-model
 * @description oauth user data model
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
const UserSchema = new Schema({});

module.exports = mongoose.model('User', UserSchema);