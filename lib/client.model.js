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
/* @todo policyUri  */
/* @todo termsUri  */
/* @todo scopes  */
/* @todo owner  */
/* @todo contact  */
/* @todo email  */
/* @todo phone number(mobile)  */
/* @todo client secret expirations  */


/* dependencies */
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const { Schema } = mongoose;


/* local constants */
const MODEL_NAME = 'Client';
const AUTOPOPULATE_MAX_DEPTH = 1;
const OPTION_AUTOPOPULATE = {
  select: { name: 1, secret: 1, grants: 1, redirectUris: 1 },
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
   * @description Medium(or agent) used by client i.e web, mobile, desktop etc. 
   * to communicate with resource and oauth provider server.
   *  
   * Used to track client and api request source type(or agent).
   * 
   * @type {object}
   * @property {string} type - schema(data) type
   * @property {boolean} trim - clear paddings before set value
   * @property {boolean} lowercase - force case to lower before set value
   * @property {string} default - value to set if none provided
   * @property {boolean} index - build index on this property 
   * @property {boolean} searchable - allow searching by this property
   * in database collection
   * @property {object} fake - fake data generator options
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  type: { /* @todo rename to agent */
    type: String,
    trim: true,
    lowercase: true,
    default: TYPE_DEFAULT,
    index: true,
    searchable: true,
    fake: true
  },


  /**
   * @name name
   * @description Human readable name of the client e.g FooBar etc. Used to 
   * track client(s) and api request source.
   *
   * Its human-readable string name of the client to be presented to the 
   * end-user during authorization.
   * 
   * @type {object}
   * @property {string} type - schema(data) type
   * @property {boolean} trim - clear paddings before set value
   * @property {boolean} required - mark this property required
   * @property {boolean} searchable - allow searching by this property
   * @property {boolean} index - build index on this property 
   * in database collection
   * @property {object} fake - fake data generator options
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  name: {
    type: String,
    trim: true,
    required: true,
    index: true,
    searchable: true,
    fake: {
      generator: 'company',
      type: 'companyName'
    }
  },


  /**
   * @name secret
   * @description Client's secret.
   * 
   * @type {object}
   * @property {string} type - schema(data) type
   * @property {boolean} trim - clear paddings before set value
   * @property {boolean} required - mark this property required
   * @property {boolean} index - build index on this property 
   * in database collection
   * @property {object} fake - fake data generator options
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  secret: {
    type: String,
    trim: true,
    required: true,
    index: true,
    // hide: true,
    fake: {
      generator: 'random',
      type: 'uuid'
    }
  },


  /**
   * @name grants
   * @description Allowed grant types for the client to use e.g 
   * client_credentials, authorize_code, refresh_token etc.
   * 
   * @type {object}
   * @property {string[]} type - schema(data) type
   * @property {string[]} default - value to set if none provided
   * @property {boolean} searchable - allow searching by this property
   * @property {boolean} index - build index on this property 
   * in database collection
   * @property {object} fake - fake data generator options
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  grants: {
    type: [String],
    index: true,
    default: [],
    searchable: true,
    fake: true
  },

  //TODO scopes

  /**
   * @name redirectUris
   * @description Allowed redirect uris for the client.
   * 
   * @type {object}
   * @property {string[]} type - schema(data) type
   * @property {string[]} default - value to set if none provided
   * @property {boolean} searchable - allow searching by this property
   * @property {boolean} index - build index on this property 
   * in database collection
   * @property {object} fake - fake data generator options
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  redirectUris: {
    type: [String],
    default: [],
    index: true,
    searchable: true,
    fake: true
  },


  /**
   * @name refreshTokenLifetime
   * @description Client specific lifetime of generated refresh tokens 
   * in seconds
   * 
   * @type {object}
   * @property {string} type - schema(data) type
   * @property {string} default - value to set if none provided
   * @property {boolean} index - build index on this property 
   * @property {boolean} searchable - allow searching by this property
   * in database collection
   * @property {object} fake - fake data generator options
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  refreshTokenLifetime: {
    type: Number,
    default: REFRESH_TOKEN_LIFETIME,
    index: true,
    searchable: true,
    fake: true
  },


  /**
   * @name accessTokenLifetime
   * @description Client specific lifetime of generated access tokens 
   * in seconds
   * 
   * @type {object}
   * @property {string} type - schema(data) type
   * @property {string} default - value to set if none provided
   * @property {boolean} index - build index on this property 
   * @property {boolean} searchable - allow searching by this property
   * in database collection
   * @property {object} fake - fake data generator options
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  accessTokenLifetime: {
    type: Number,
    default: ACCESS_TOKEN_LIFETIME,
    index: true,
    searchable: true,
    fake: true
  },


  /**
   * @name authorizationCodeLifetime
   * @description client specific lifetime of generated access tokens 
   * in seconds
   * 
   * @type {object}
   * @property {string} type - schema(data) type
   * @property {string} default - value to set if none provided
   * @property {boolean} index - build index on this property 
   * @property {boolean} searchable - allow searching by this property
   * in database collection
   * @property {object} fake - fake data generator options
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  authorizationCodeLifetime: {
    type: Number,
    default: AUTHORIZATION_CODE_LIFETIME,
    index: true,
    searchable: true,
    fake: true
  }


}, { timestamps: true, emitIndexErrors: true });



/*------------------------------------------------------------------------------
statics
------------------------------------------------------------------------------*/

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


/*------------------------------------------------------------------------------
plugins
------------------------------------------------------------------------------*/
ClientSchema.plugin(actions);


/* export client model */
module.exports = mongoose.model(MODEL_NAME, ClientSchema);