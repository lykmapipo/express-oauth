'use strict';

/**
 * @module express-oauth
 * @name Client
 * @type {Model}
 * @description manage entity(i.e application) that interact with
 *              resource server(i.e API Server) on behalf of end user
 * @description oauth client data model
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */


//dependencies
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const Schema = mongoose.Schema;


/**
 * client types
 */
const TYPE_DESKTOP = 'desktop'; //desktop client
const TYPE_MOBILE = 'mobile'; //smartphone mobile app client
const TYPE_SERVER = 'server'; //web server client
const TYPE_WEB = 'web'; //web browser spa client
const TYPE_DEFAULT = TYPE_WEB;
const TYPES = [
  TYPE_DESKTOP, TYPE_MOBILE,
  TYPE_SERVER, TYPE_WEB
];


/**
 * @name ClientSchema
 * @type {Schema}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @private
 */
const ClientSchema = new Schema({
  /**
   * @name type
   * @type {Object}
   * @description medium used by client i.e web, mobile, desktop etc.
   *              useful on tracking client and api request source.
   * @property {Object} type data type
   * @property {String} default value to set on `type` in none provided
   * @property {Boolean} trim clear paddings before set value
   * @property {Boolean} lowercase force case to lowercase before set value
   * @property {Boolean} searchable allow search client by their type
   * @property {Boolean} index index the `type` column in client collection
   * @since 0.1.0
   * @version 0.1.0
   * @private
   */
  type: {
    type: String,
    default: TYPE_DEFAULT,
    trim: true,
    lowercase: true,
    searchable: true,
    index: true
  },


  /**
   * @name name
   * @type {Object}
   * @description human readable name of the client e.g FooBar etc.
   *              useful on tracking client(s) and api request source.
   * @property {Object} type data type
   * @property {Boolean} trim clear paddings before set value
   * @property {Boolean} searchable allow search client by their nameH
   * @property {Boolean} index index the `type` column in client collection
   * @since 0.1.0
   * @version 0.1.0
   * @private
   */
  name: {
    type: String,
    trim: true,
    searchable: true,
    index: true
  },


  /**
   * @name secret
   * @type {Object}
   * @description oauth secret of the client.
   * @property {Object} type data type
   * @property {Boolean} trim clear paddings before set value
   * @property {Boolean} required mark secret as must be set
   * @since 0.1.0
   * @version 0.1.0
   * @private
   */
  secret: {
    type: String,
    trim: true,
    required: true
  },


  /**
   * @name grants
   * @type {Object}
   * @description allowed oauth2 grant types forh the client e.g password etc.
   * @property {String[]} type data type
   * @property {Array} default value to set on `type` in none provided
   * @property {Boolean} searchable allow search client by their grants
   * @property {Boolean} index index the `type` column in client collection
   * @since 0.1.0
   * @version 0.1.0
   * @private
   */
  grants: {
    type: [String],
    default: [],
    searchable: true,
    index: true
  },


  /**
   * @name redirectUris
   * @type {Object}
   * @description allowed oauth2 rediect uris for the client.
   * @property {String[]} type data type
   * @property {Array} default value to set on empty in none provided
   * @since 0.1.0
   * @version 0.1.0
   * @private
   */
  redirectUris: {
    type: [String],
    default: [],
  },


});


/**
 * static constants
 */
ClientSchema.statics.TYPE_DESKTOP = TYPE_DESKTOP;
ClientSchema.statics.TYPE_MOBILE = TYPE_MOBILE;
ClientSchema.statics.TYPE_SERVER = TYPE_SERVER;
ClientSchema.statics.TYPE_WEB = TYPE_WEB;
ClientSchema.statics.TYPES = TYPES;


/**
 * plugins
 */
ClientSchema.plugin(actions);


/**
 * export
 * @type {Model}
 */
module.exports = mongoose.model('Client', ClientSchema);