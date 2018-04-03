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
const _ = require('lodash');
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
 * lifetimes
 */
const REFRESH_TOKEN_LIFETIME = (60 * 60 * 24 * 14); //2 weeks
const ACCESS_TOKEN_LIFETIME = (60 * 60); // 1 hour.
const AUTHORIZATION_CODE_LIFETIME = (60 * 5); // 5 minutes.


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
   * @property {String} default value to set on `type` if none provided
   * @property {Boolean} trim clear paddings before set value
   * @property {Boolean} lowercase force case to lower before set value
   * @property {Boolean} searchable allow search client by their type
   * @property {Boolean} index build index on `type` column in client collection
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
   * @property {String} type data type
   * @property {Boolean} trim clear paddings before set value
   * @property {Boolean} searchable allow search client by their name
   * @property {Boolean} index build index on `name` column in client collection
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
   * @property {String} type data type
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
   * @property {Array} default value to set on `type` if none provided
   * @property {Boolean} searchable allow search client by their grants
   * @property {Boolean} index build index on `grants` column in client collection
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

  //TODO scopes

  /**
   * @name redirectUris
   * @type {Object}
   * @description allowed oauth2 redirect uris for the client.
   * @property {String[]} type data type
   * @property {Array} default value to set on `redirectUris` 
   *                           if none provided
   * @since 0.1.0
   * @version 0.1.0
   * @private
   */
  redirectUris: {
    type: [String],
    default: [],
  },


  /**
   * @name refreshTokenLifetime
   * @type {Object}
   * @description client specific lifetime of generated refresh tokens 
   *              in seconds
   * @property {Number} type data type
   * @property {Number} default value to set on `refreshTokenLife` if none provided
   * @property {Boolean} searchable allow search client by their 
   *                                refreshTokenLifeTime
   * @property {Boolean} index build index on `refreshTokenLifeTime` 
   *                           column in client collection
   * @since 0.1.0
   * @version 0.1.0
   * @private
   */
  refreshTokenLifetime: {
    type: Number,
    default: REFRESH_TOKEN_LIFETIME,
    searchable: true,
    index: true
  },


  /**
   * @name accessTokenLifetime
   * @type {Object}
   * @description client specific lifetime of generated access tokens 
   *              in seconds
   * @property {Number} type data type
   * @property {Number} default value to set on `accessTokenLife` if none provided
   * @property {Boolean} searchable allow search client by their 
   *                                accessTokenLifeTime
   * @property {Boolean} index build index on `accessTokenLifeTime` 
   *                           column in client collection
   * @since 0.1.0
   * @version 0.1.0
   * @private
   */
  accessTokenLifetime: {
    type: Number,
    default: ACCESS_TOKEN_LIFETIME,
    searchable: true,
    index: true
  },


  /**
   * @name authorizationCodeLifetime
   * @type {Object}
   * @description client specific lifetime of generated access tokens 
   *              in seconds
   * @property {Number} type data type
   * @property {Number} default value to set on `authorizationCodeLife` 
   *                            if none provided
   * @property {Boolean} searchable allow search client by their 
   *                                authorizationCodeLifeTime
   * @property {Boolean} index build index on `authorizationCodeLifeTime` 
   *                           column in client collection
   * @since 0.1.0
   * @version 0.1.0
   * @private
   */
  authorizationCodeLifetime: {
    type: Number,
    default: AUTHORIZATION_CODE_LIFETIME,
    searchable: true,
    index: true
  }


});


/**
 * static constants
 */
ClientSchema.statics.TYPE_DESKTOP = TYPE_DESKTOP;
ClientSchema.statics.TYPE_MOBILE = TYPE_MOBILE;
ClientSchema.statics.TYPE_SERVER = TYPE_SERVER;
ClientSchema.statics.TYPE_WEB = TYPE_WEB;
ClientSchema.statics.TYPE_DEFAULT = TYPE_DEFAULT;
ClientSchema.statics.TYPES = TYPES;

ClientSchema.statics.ACCESS_TOKEN_LIFETIME = ACCESS_TOKEN_LIFETIME;
ClientSchema.statics.AUTHORIZATION_CODE_LIFETIME = AUTHORIZATION_CODE_LIFETIME;
ClientSchema.statics.REFRESH_TOKEN_LIFETIME = REFRESH_TOKEN_LIFETIME;


/**
 * static methods
 */


/**
 * @name is
 * @function is
 * @description check if client is of the provided type(s)
 * @param  {String|String[]}  type type(s) to test for client type
 * @return {Boolean} is return true or false whether client is of
 *                      specified type
 */
ClientSchema.statics.is = function is(...type) {

  //collect passed types
  let types = _.compact([].concat(...type));
  types = _.uniq(types);

  //TODO implement logic
  return !_.isEmpty(types);

};


/**
 * plugins
 */
ClientSchema.plugin(actions);


/**
 * export
 * @type {Model}
 */
module.exports = mongoose.model('Client', ClientSchema);