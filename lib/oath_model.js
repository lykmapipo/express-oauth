'use strict';


//dependencies
//TODO initialize with default client
//TODO initialize with default user
//TODO seed all model as resources(permission)
//user, client, refresh_token, access_token, authorization_code,
//scopes
//models: user, client, code, token

/**
 * @module express-oauth
 * @name generateAccessToken
 * @function generateAccessToken
 * @description invoked to generate a new access token.
 * @param {Object} client client the access token is generated for.
 * @param {Object} user user the access token is generated for.
 * @param {Object} scope scopes associated with the access token. 
 *                       Can be null.
 * @param {Function} done callback to invoke on success or failure
 * @return {String} jwt encoded access token
 * @see  {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#generateaccesstoken-client-user-scope-callback}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
exports.generateAccessToken =
  function generateAccessToken(client, user, scope, done) {
    done(null, {});
  };


/**
 * @module express-oauth
 * @name generateAuthorizationCode
 * @function generateAuthorizationCode
 * @description invoked to generate a new authorization code.
 * @param {Object} client client the authorization code is generated for.
 * @param {Object} user user the authorization code is generated for.
 * @param {Object} scope scopes associated with the authorization code. 
 *                       Can be null.
 * @param {Function} done callback to invoke on success or failure
 * @return {String} jwt encoded authorization code
 * @see  {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#generateauthorizationcode-client-user-scope-callback}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
exports.generateAuthorizationCode =
  function generateAuthorizationCode(client, user, scope, done) {
    done(null, {});
  };


/**
 * @module express-oauth
 * @name generateRefreshToken
 * @function generateRefreshToken
 * @description invoked to generate a new refresh token.
 * @param {Object} client client the refresh token is generated for.
 * @param {Object} user user the refresh token is generated for.
 * @param {Object} scope scopes associated with the refresh token. 
 *                       Can be null.
 * @param {Function} done callback to invoke on success or failure
 * @return {String} jwt encoded refresh token
 * @see  {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#generaterefreshtoken-client-user-scope-callback}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
exports.generateRefreshToken =
  function generateRefreshToken(client, user, scope, done) {
    done(null, {});
  };


/**
 * @module express-oauth
 * @name getAccessToken
 * @function getAccessToken
 * @description invoked to retrieve an existing access token.
 * @param {Srting} accessToken access token to retrieve.
 * @param {Function} done callback to invoke on success or failure
 * @return {Object} token access token and associated data
 * @return {String} token.accessToken access token passed to get access token
 * @return {Date} token.accessTokenExpiresAt expiry time of the access token
 * @return {String} token.scope authorized scope of the access token
 * @return {Object} token.client client associated with the access token
 * @return {Object} token.user user associated with the access token
 * @see  {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getaccesstoken-accesstoken-callback}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
exports.getAccessToken =
  function getAccessToken(accessToken, done) {
    done(null, {});
  };


/**
 * @module express-oauth
 * @name getRefreshToken
 * @function getRefreshToken
 * @description invoked to retrieve an existing refresh token.
 * @param {Srting} refreshToken refresh token to retrieve.
 * @param {Function} done callback to invoke on success or failure
 * @return {Object} token refresh token and associated data
 * @return {String} token.refreshToken refresh token passed to get refresh token
 * @return {Date} token.refreshTokenExpiresAt expiry time of the refresh token
 * @return {String} token.scope authorized scope of the refresh token
 * @return {Object} token.client client associated with the refresh token
 * @return {Object} token.user user associated with the refresh token
 * @see  {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getrefreshtoken-refreshtoken-callback}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
exports.getRefreshToken =
  function getRefreshToken(accessToken, done) {
    done(null, {});
  };


/**
 * @module express-oauth
 * @name getAuthorizationCode
 * @function getAuthorizationCode
 * @description invoked to retrieve an existing authorization code.
 * @param {Srting} authorizationCode authorization code to retrieve.
 * @param {Function} done callback to invoke on success or failure
 * @return {Object} token authorization code and associated data
 * @return {String} token.code authorization code passed to get authorization code
 * @return {Date} token.expiresAt expiry time of the authorization code
 * @return {String} token.scope authorized scope of the authorization code
 * @return {Object} token.client client associated with the authorization code
 * @return {Object} token.user user associated with the authorization code
 * @see  {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getauthorizationcode-authorizationcode-callback}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
exports.getAuthorizationCode =
  function getAuthorizationCode(authorizationCode, done) {
    done(null, {});
  };


/**
 * @module express-oauth
 * @name getClient
 * @function getClient
 * @description invoked to retrieve a client using a client id or 
 *              a client id/client secret combination, depending 
 *              on the grant type.
 * @param {String} clientId valid id of the client to retrieve.
 * @param {String} clientSecret secret of the client to retrieve. 
 *                              It can be null.
 * @param {Function} done callback to invoke on success or failure
 * @return {Object} client found client
 * @return {String} client.id unique string identifying the client
 * @return {String[]} client.redirectUris redirect URIs allowed for the client
 * @return {String[]} client.grants grant types allowed for the client
 * @return {Number} client.accessTokenLifetime client-specific lifetime of generated access tokens in seconds
 * @return {Number} client.refreshTokenLifetime client-specific lifetime of generated refresh tokens in seconds.
 * @see  {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getclient-clientid-clientsecret-callback}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
exports.getClient =
  function getClient(clientId, clientSecret, done) {
    done(null, {});
  };


/**
 * @module express-oauth
 * @name getUser
 * @function getUser
 * @description invoked to retrieve a user using a username/password combination.
 * @param {String} username valid username of the user to retrieve.
 * @param {String} password password of the user to retrieve.
 * @param {Function} done callback to invoke on success or failure
 * @return {Object} user found user
 * @return {String} user.id valid user id
 * @return {String} user.name valid user full name
 * @return {String} user.email valid unique user email address
 * @see  {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getuser-username-password-callback}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
exports.getUser =
  function getUser(username, password, done) {
    done(null, {});
  };


/**
 * @module express-oauth
 * @name getUserFromClient
 * @function getUserFromClient
 * @description invoked to retrieve the user associated with the specified client.
 * @param {Object} client client to retrieve the associated user for.
 * @param {String} client.id unique string identifying the client.
 * @param {Function} done callback to invoke on success or failure
 * @return {Object} user found user
 * @return {String} user.id valid user id
 * @return {String} user.name valid user full name
 * @return {String} user.email valid unique user email address
 * @see  {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getuserfromclient-client-callback}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
exports.getUserFromClient =
  function getUserFromClient(client, done) {
    done(null, {});
  };


/**
 * @module express-oauth
 * @name saveToken
 * @function saveToken
 * @description invoked to save an access token and optionally a 
 *              refresh token, depending on the grant type.
 * @param {Object} token token(s) to be saved.
 * @param {String} token.accessToken access token to be saved.
 * @param {Date} token.accessTokenExpiresAt expiry time of the access token.
 * @param {String} token.refreshToken refresh token to be saved.
 * @param {Date} token.refreshTokenExpiresAt  expiry time of the refresh token.
 * @param {String} token.scope authorized scope of the token(s).
 * @param {Object} client client associated with the token(s).
 * @param {Object} user user associated with the token(s).
 * @param {Function} done callback to invoke on success or failure
 * @return {Object} token representing the token(s) and associated data
 * @return {String} token.accessToken access token passed to saved.
 * @return {Date} token.accessTokenExpiresAt expiry time of the token(s).
 * @return {String} token.refreshToken refresh token passed to be saved.
 * @return {Date} token.refreshTokenExpiresAt expiry time of the refresh token.
 * @return {String} token.scope authorized scope of the access token
 * @return {Object} token.client client associated with the token(s)
 * @return {String} token.client.id unique string identifying the client
 * @return {Object} token.user user associated with the token(s)
 * @see  {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#savetoken-token-client-user-callback}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
exports.saveToken =
  function saveToken(token, client, user, done) {
    done(null, {});
  };


/**
 * @module express-oauth
 * @name saveAuthorizationCode
 * @function saveAuthorizationCode
 * @description invoked to save an authorization code.
 * @param {Object} code code to be saved.
 * @param {String} code.authorizationCode authorization code to be saved.
 * @param {Date} code.expiresAt expiry time of the authorization code.
 * @param {String} code.redirectUri redirect URI associated with the authorization code.
 * @param {String} code.scope authorized scope of the authorization code.
 * @param {Object} client client associated with the authorization code.
 * @param {Object} user user associated with the authorization code.
 * @param {Function} done callback to invoke on success or failure
 * @return {Object} code representing authorization code and associated data.
 * @return {String} code.authorizationCode  authorization code passed to be saved.
 * @return {Date} code.expiresAt expiry time of the authorization code.
 * @return {String} code.redirectUri redirect URI associated with the authorization code.
 * @return {String} code.scope authorized scope of the authorization code.
 * @return {Object} code.client client associated with the authorization code.
 * @return {String} code.client.id unique string identifying the client
 * @return {Object} code.user user associated with the token(s)
 * @see  {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#saveauthorizationcode-code-client-user-callback}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
exports.saveAuthorizationCode =
  function saveAuthorizationCode(code, client, user, done) {
    done(null, {});
  };


/**
 * @module express-oauth
 * @name revokeToken
 * @function revokeToken
 * @description invoked to revoke a token.
 * @param {Object} token token to be revoked.
 * @param {String} token.refreshToken refresh token.
 * @param {Date} token.refreshTokenExpiresAt expiry time of the refresh token.
 * @param {String} token.scope authorized scope of the token.
 * @param {Object} token.client client associated with the token.
 * @param {String} token.client.id unique string identifying the client.
 * @param {Object} token.user user associated with the token.
 * @param {Function} done callback to invoke on success or failure
 * @return {Boolean} revoked return true if the revocation was 
 *                           successful or false if the refresh 
 *                           token could not be found. 
 * @see  {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#revoketoken-token-callback}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
exports.revokeToken =
  function revokeToken(token, done) {
    done(null, {});
  };


/**
 * @module express-oauth
 * @name revokeAuthorizationCode
 * @function revokeAuthorizationCode
 * @description invoked to revoke an authorization code.
 * @param {Object} code code to be revoked.
 * @param {String} code.code authorization code.
 * @param {Date} code.expiresAt expiry time of the authorization code.
 * @param {String} code.redirectUri redirect URI associated with the authorization code.
 * @param {String} code.scope authorized scope of the authorization code.
 * @param {Object} code.client client associated with the authorization code.
 * @param {String} code.client.id unique string identifying the client.
 * @param {Object} code.user user associated with the authorization code.
 * @param {Function} done callback to invoke on success or failure
 * @return {Boolen} revoked return true if the revocation was successful 
 *                           or false if the authorization code could 
 *                           not be found.
 * @see  {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#revokeauthorizationcode-code-callback}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
exports.revokeAuthorizationCode =
  function revokeAuthorizationCode(code, done) {
    done(null, {});
  };


/**
 * @module express-oauth
 * @name validateScope
 * @function validateScope
 * @description invoked to check if the requested scope is valid for 
 *              a particular client/user combination.
 * @param {Object} user associated user.
 * @param {Object} client associated client.
 * @param {String} client.id unique string identifying the client.
 * @param {String} scope scopes to validate.
 * @param {Function} done callback to invoke on success or failure
 * @return {String|Undefined} valid validated scopes to be used or a falsy 
 *                              value to reject the requested scopes.
 * @see  {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#validatescope-user-client-scope-callback}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
exports.validateScope =
  function validateScope(user, client, scope, done) {
    done(null, {});
  };


/**
 * @module express-oauth
 * @name verifyScope
 * @function verifyScope
 * @description invoked during request authentication to check if the 
 *              provided access token was authorized the requested scopes.
 * @param {Object} token access token to test against.
 * @param {String} token.accessToken access token.
 * @param {Date} token.accessTokenExpiresAt expiry time of the access token.
 * @param {String} token.scope authorized scope of the access token.
 * @param {Object} token.client client associated with the access token.
 * @param {String} token.client.id unique string identifying the client.
 * @param {Object} token.user user associated with the access token.
 * @param {String} scope required scopes.
 * @param {Function} done callback to invoke on success or failure
 * @return {Boolean} verified returns true if the access token passes, 
 *                            false otherwise.
 * @see  {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#verifyscope-accesstoken-scope-callback}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
exports.verifyScope =
  function verifyScope(token, scope, done) {
    done(null, {});
  };