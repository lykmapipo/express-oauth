'use strict';

/* ensure mongo uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/express-oauth');


/* dependencies */
const path = require('path');
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
const {
  User,
  Client,
  Token,
  app,
  info
} = require(path.join(__dirname, '..'));


/* connect to mongoose */
mongoose.connect(process.env.MONGODB_URI);


function boot() {

  async.waterfall([

    function clearTokens(next) {
      Token.remove(function ( /*error, results*/ ) {
        next();
      });
    },

    function clearClients(next) {
      Client.remove(function ( /*error, results*/ ) {
        next();
      });
    },

    function clearUsers(next) {
      User.remove(function ( /*error, results*/ ) {
        next();
      });
    },

    function seedUsers(next) {
      const user = User.fake();
      User.register(user, next);
    },

    function seedClients(user, next) {
      const client = Client.fake();
      client.post(function (error, created) {
        next(error, user, created);
      });
    },

    function seedTokens(user, client, next) {
      let tokens = Token.fake(20);
      tokens = _.map(tokens, function (token, index) {
        if (index % 2) {
          token.type = Token.TYPE_ACCESS;
        }
        if (index % 3) {
          token.type = Token.TYPE_REFRESH;
        }
        token.user = user;
        token.client = client;
        return function (cb) {
          token.post(cb);
        }
      });
      async.parallel(tokens, next);
    }

  ], function (error, results) {

    /* expose module info */
    app.get('/', function (request, response) {
      response.status(200);
      response.json(info);
    });


    /* fire the app */
    app.start(function (error, env) {
      console.log(
        `visit http://0.0.0.0:${env.PORT}/v${info.version}/clients`
      );
    });

  });

}


boot();