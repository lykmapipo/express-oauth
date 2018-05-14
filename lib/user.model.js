'use strict';

/**
 * @module User
 * @name User
 * @description Manage user.
 * 
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */



/* dependencies */
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const irina = require('irina');
const { Schema } = mongoose;



/* local constants */
const MODEL_NAME = 'User';
const AUTOPOPULATE_MAX_DEPTH = 1;
const OPTION_AUTOPOPULATE = {
  select: { name: 1, email: 1, phone: 1, avatar: 1 },
  maxDepth: AUTOPOPULATE_MAX_DEPTH
};



/**
 * @name UserSchema
 * @type {Schema}
 * @since  0.1.0
 * @version 0.1.0
 * @private
 */
const UserSchema = new Schema({
  /**
   * @name name
   * @description human readable name used to identify a party. 
   * It may be a person full name, company name etc.
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
      generator: 'name',
      type: 'findName'
    }
  },


  /**
   * @name avatar
   * @description A url or (base64 encode) user avatar.
   * It may be a person photo, company logo etc.
   * 
   * @type {object}
   * @property {String} type - schema(data) type
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  avatar: {
    type: String,
    fake: {
      generator: 'image',
      type: 'avatar'
    }
  },


  /**
   * @name email
   * @description Primary email address of the user.
   * It is currently provided by irina module.
   * 
   * @see {@link https://github.com/lykmapipo/irina}
   * 
   * @type {object}
   * @property {String} type - schema(data) type
   * @property {Boolean} trim - clear paddings before set value
   * @property {Boolean} required - mark this property required
   * @property {Boolean} searchable - allow searching by this property
   * @property {Boolean} unique - build unique index on this property 
   * in database collection
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  // email:String,


  /**
   * @name phone
   * @description Primary valid existing mobile phone number 
   * that can be used to contact a user directly.
   *
   * @type {object}
   * @property {String} type - schema(data) type
   * @property {Boolean} trim - clear paddings before set value
   * @property {Boolean} required - mark this property required
   * @property {Boolean} searchable - allow searching by this property
   * @property {Boolean} unique - build unique index on this property 
   * in database collection
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  phone: {
    type: String,
    trim: true,
    required: true,
    searchable: true,
    unique: true,
    fake: {
      generator: 'phone',
      type: 'phoneNumber'
    }
  }
}, { timestamps: true, emitIndexErrors: true });



/* statics */

/* static constants */
UserSchema.statics.MODEL_NAME = MODEL_NAME;
UserSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;



/* plugins */
UserSchema.plugin(irina, { registerable: { autoConfirm: true } });
UserSchema.plugin(actions);



/* export client model */
module.exports = mongoose.model(MODEL_NAME, UserSchema);