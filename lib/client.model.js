'use strict';

/**
 * @module Client
 * @name Client
 * @description Manage entity(i.e application) that interact with 
 * resource server(i.e API Server) on behalf of end user
 * 
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */


/* @todo homepageUri */
/* @todo logoUri  */
/* @todo privacyPolicyUri  */
/* @todo termsUri  */
/* @todo email  */
/* @todo phone number(mobile)  */


/* dependencies */
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const { Schema } = mongoose;


/* local constants */
const MODEL_NAME = 'Client';
const AUTOPOPULATE_MAX_DEPTH = 1;
const OPTION_AUTOPOPULATE = {
  maxDepth: AUTOPOPULATE_MAX_DEPTH
};


/* client types */
const TYPE_DESKTOP = 'desktop'; //native desktop client
const TYPE_MOBILE_ANDROID = 'android'; //android mobile app client
const TYPE_MOBILE_IOS = 'iOS'; //android mobile app client
const TYPE_SERVER = 'server'; //web server client
const TYPE_WEB = 'web'; //web browser spa client
const TYPE_OTHER = 'other'; //other client type
const TYPE_DEFAULT = TYPE_WEB;
const TYPES = [
  TYPE_DESKTOP, TYPE_MOBILE_ANDROID,
  TYPE_MOBILE_IOS, TYPE_SERVER,
  TYPE_WEB, TYPE_OTHER
];


/* lifetimes */
const REFRESH_TOKEN_LIFETIME =
  (process.env.REFRESH_TOKEN_LIFETIME || (60 * 60 * 24 * 14)); //2 weeks

const ACCESS_TOKEN_LIFETIME =
  (process.env.ACCESS_TOKEN_LIFETIME || (60 * 60)); // 1 hour

const AUTHORIZATION_CODE_LIFETIME =
  (process.env.AUTHORIZATION_CODE_LIFETIME || (60 * 5)); // 5 minutes


/**
 * @name ClientSchema
 * @type {Schema}
 * @since  0.1.0
 * @version 0.1.0
 * @private
 */
const ClientSchema = new Schema({
  /**
   * @name type
   * @description medium used by client i.e web, mobile, desktop etc. 
   * useful on tracking client and api request source.
   * 
   * @type {object}
   * @property {String} type - schema(data) type
   * @property {String} default - value to set if none provided
   * @property {Boolean} trim - clear paddings before set value
   * @property {Boolean} lowercase - force case to lower before set value
   * @property {Boolean} searchable - allow searching by this property
   * @property {Boolean} index - build index on this property 
   * in database collection
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  type: { //agent
    type: String,
    default: TYPE_DEFAULT,
    trim: true,
    lowercase: true,
    searchable: true,
    index: true,
    fake: true
  },


  /**
   * @name name
   * @description human readable name of the client e.g FooBar etc. 
   * It is useful on tracking client(s) and api request source.
   * 
   * @type {object}
   * @property {String} type - schema(data) type
   * @property {Boolean} trim - clear paddings before set value
   * @property {Boolean} required - mark this property required
   * @property {Boolean} searchable - allow searching by this property
   * @property {Boolean} index - build index on this property 
   * in database collection
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  name: {
    type: String,
    trim: true,
    required: true,
    searchable: true,
    index: true,
    fake: {
      generator: 'company',
      type: 'companyName'
    }
  },


  /**
   * @name secret
   * @description oauth2 client secret.
   * 
   * @type {object}
   * @property {String} type - schema(data) type
   * @property {Boolean} trim - clear paddings before set value
   * @property {Boolean} required - mark this property required
   * @property {Boolean} index - build index on this property 
   * in database collection
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  secret: {
    type: String,
    trim: true,
    required: true,
    index: true,
    fake: {
      generator: 'random',
      type: 'uuid'
    }
  },


  /**
   * @name grants
   * @description allowed oauth2 grant types for the client 
   * e.g password etc.
   * 
   * @type {object}
   * @property {String[]} type - schema(data) type
   * @property {String[]} default - value to set if none provided
   * @property {Boolean} searchable - allow searching by this property
   * @property {Boolean} index - build index on this property 
   * in database collection
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  grants: {
    type: [String],
    default: [],
    searchable: true,
    index: true,
    fake: true
  },

  //TODO scopes

  /**
   * @name redirectUris
   * @description allowed oauth2 redirect uris for the client.
   * 
   * @type {object}
   * @property {String[]} type - schema(data) type
   * @property {String[]} default - value to set if none provided
   * @property {Boolean} searchable - allow searching by this property
   * @property {Boolean} index - build index on this property 
   * in database collection
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  redirectUris: {
    type: [String],
    default: [],
    searchable: true,
    index: true,
    fake: true
  },


  /**
   * @name refreshTokenLifetime
   * @description client specific lifetime of generated refresh tokens
   * in seconds
   * 
   * @type {object}
   * @property {String} type - schema(data) type
   * @property {String} default - value to set if none provided
   * @property {Boolean} searchable - allow searching by this property
   * @property {Boolean} index - build index on this property 
   * in database collection
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  refreshTokenLifetime: {
    type: Number,
    default: REFRESH_TOKEN_LIFETIME,
    searchable: true,
    index: true,
    fake: true
  },


  /**
   * @name accessTokenLifetime
   * @description client specific lifetime of generated access tokens 
   * in seconds
   * 
   * @type {object}
   * @property {String} type - schema(data) type
   * @property {String} default - value to set if none provided
   * @property {Boolean} searchable - allow searching by this property
   * @property {Boolean} index - build index on this property 
   * in database collection
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  accessTokenLifetime: {
    type: Number,
    default: ACCESS_TOKEN_LIFETIME,
    searchable: true,
    index: true,
    fake: true
  },


  /**
   * @name authorizationCodeLifetime
   * @description client specific lifetime of generated access tokens 
   * in seconds
   * 
   * @type {object}
   * @property {String} type - schema(data) type
   * @property {String} default - value to set if none provided
   * @property {Boolean} searchable - allow searching by this property
   * @property {Boolean} index - build index on this property 
   * in database collection
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  authorizationCodeLifetime: {
    type: Number,
    default: AUTHORIZATION_CODE_LIFETIME,
    searchable: true,
    index: true,
    fake: true
  }


}, { timestamps: true, emitIndexErrors: true });



/* statics */

/* static constants */
ClientSchema.statics.MODEL_NAME = MODEL_NAME;
ClientSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;

ClientSchema.statics.TYPE_DESKTOP = TYPE_DESKTOP;
ClientSchema.statics.TYPE_MOBILE_ANDROID = TYPE_MOBILE_ANDROID;
ClientSchema.statics.TYPE_MOBILE_IOS = TYPE_MOBILE_IOS;
ClientSchema.statics.TYPE_SERVER = TYPE_SERVER;
ClientSchema.statics.TYPE_WEB = TYPE_WEB;
ClientSchema.statics.TYPE_OTHER = TYPE_OTHER;
ClientSchema.statics.TYPE_DEFAULT = TYPE_DEFAULT;
ClientSchema.statics.TYPES = TYPES;

ClientSchema.statics.ACCESS_TOKEN_LIFETIME = ACCESS_TOKEN_LIFETIME;
ClientSchema.statics.AUTHORIZATION_CODE_LIFETIME = AUTHORIZATION_CODE_LIFETIME;
ClientSchema.statics.REFRESH_TOKEN_LIFETIME = REFRESH_TOKEN_LIFETIME;


/* @todo generate client secret(jwt) */
/* @todo verify client secret(jwt) */



/* plugins */
ClientSchema.plugin(actions);



/* export client model */
module.exports = mongoose.model(MODEL_NAME, ClientSchema);