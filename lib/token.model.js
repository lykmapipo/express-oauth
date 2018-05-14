'use strict';

/**
 * @module Token
 * @name Token
 * @description Tokens(refresh, access and authorization code) 
 * for the client(s) that are generated durind authentication flows.
 * 
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */


/** 
 * 'accessToken', 'accessTokenExpiresAt', 
 * 'refreshToken', 'refreshTokenExpiresAt', 
 * authorizationCode, 'authorizationCodeExpiresAt', 'redirectUri',
 * 'scope', 'client', 'user' 
 */

/* @todo autopopulate client */
/* @todo autopopulate user */

/* dependencies */
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const { Schema } = mongoose;
const { ObjectId } = Schema;


/* local constants */
const MODEL_NAME = 'Token';
const AUTOPOPULATE_MAX_DEPTH = 1;
const OPTION_AUTOPOPULATE = {
  maxDepth: AUTOPOPULATE_MAX_DEPTH
};


/* token types */
const TYPE_ACCESS = 'access';
const TYPE_REFRESH = 'refresh';
const TYPE_AUTHORIZATION_CODE = 'authorization code';
const TYPE_DEFAULT = TYPE_AUTHORIZATION_CODE;
const TYPES = [
  TYPE_ACCESS, TYPE_REFRESH,
  TYPE_AUTHORIZATION_CODE
];


/* lifetimes */
const REFRESH_TOKEN_LIFETIME =
  (process.env.REFRESH_TOKEN_LIFETIME || (60 * 60 * 24 * 14)); //2 weeks

const ACCESS_TOKEN_LIFETIME =
  (process.env.ACCESS_TOKEN_LIFETIME || (60 * 60)); // 1 hour

const AUTHORIZATION_CODE_LIFETIME =
  (process.env.AUTHORIZATION_CODE_LIFETIME || (60 * 5)); // 5 minutes


/**
 * @name TokenSchema
 * @type {Schema}
 * @since  0.1.0
 * @version 0.1.0
 * @private
 */
const TokenSchema = new Schema({
  /**
   * @name user
   * @description A user underwhich a token is applicable.
   * 
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {boolean} autoset - allow to set id from full object
   * @property {boolean} exists - ensure ref exists before save
   * @property {object} autopopulate - user population options
   * @property {boolean} index - ensure database index
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  user: {
    type: ObjectId,
    ref: 'User',
    // required: true,
    autoset: true,
    exists: true,
    index: true,
  },


  /**
   * @name client
   * @description A client underwhich a token is applicable.
   * 
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {boolean} autoset - allow to set id from full object
   * @property {boolean} exists - ensure ref exists before save
   * @property {object} autopopulate - user population options
   * @property {boolean} index - ensure database index
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  client: {
    type: ObjectId,
    ref: 'Client',
    // required: true,
    autoset: true,
    exists: true,
    index: true,
  },


  /**
   * @name type
   * @description token type i.e access, refresh or authorization code.
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
  type: {
    type: String,
    default: TYPE_DEFAULT,
    enum: TYPES,
    trim: true,
    lowercase: true,
    searchable: true,
    index: true,
    fake: true
  },


  /**
   * @name scope
   * @description authorized scope of the access token, 
   * refresh token or authorization code.
   * 
   * @type {object}
   * @property {String} type - schema(data) type
   * @property {Boolean} trim - clear paddings before set value
   * @property {Boolean} searchable - allow searching by this property
   * @property {Boolean} index - build index on this property 
   * in database collection
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  scope: {
    type: String,
    trim: true,
    searchable: true,
    index: true,
    fake: {
      generator: 'hacker',
      type: 'noun'
    }
  },


  /**
   * @name token
   * @description The access token, refresh token or 
   * authorization code.
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
  token: {
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
   * @name redirectUri
   * @description allowed redirect uri(s) for the token.
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
  redirectUri: {
    type: String,
    trim: true,
    searchable: true,
    index: true,
    fake: {
      generator: 'internet',
      type: 'url'
    }
  },


  /**
   * @name expiredAt
   * @description The expiry time of the access token, refresh token 
   * or authorization code.
   * 
   * @type {object}
   * @property {Date} type - schema(data) type
   * @property {Boolean} searchable - allow searching by this property
   * @property {Boolean} index - build index on this property 
   * in database collection
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  expiredAt: {
    type: Date,
    index: true,
    fake: {
      generator: 'date',
      type: 'future'
    }
  }


}, { timestamps: true, emitIndexErrors: true });



/* statics */

/* static constants */
TokenSchema.statics.MODEL_NAME = MODEL_NAME;
TokenSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;

TokenSchema.statics.TYPE_ACCESS = TYPE_ACCESS;
TokenSchema.statics.TYPE_REFRESH = TYPE_REFRESH;
TokenSchema.statics.TYPE_AUTHORIZATION_CODE = TYPE_AUTHORIZATION_CODE;
TokenSchema.statics.TYPES = TYPES;

TokenSchema.statics.ACCESS_TOKEN_LIFETIME = ACCESS_TOKEN_LIFETIME;
TokenSchema.statics.AUTHORIZATION_CODE_LIFETIME = AUTHORIZATION_CODE_LIFETIME;
TokenSchema.statics.REFRESH_TOKEN_LIFETIME = REFRESH_TOKEN_LIFETIME;



/* plugins */
TokenSchema.plugin(actions);



/* export token model */
module.exports = mongoose.model(MODEL_NAME, TokenSchema);