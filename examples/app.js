'use strict';

//ensure mongo uri
process.env.MONGO_URI =
  (process.env.MONGO_URI || 'mongodb://localhost/express-oauth');

//dependencies
const path = require('path');
const mongoose = require('mongoose');
const oauth = require(path.join(__dirname, '..'));

//connect to mongoose
mongoose.connect(process.env.MONGO_URI);

//fire the app
oauth.app.start(function (error, env) {
  console.log(`visit http://0.0.0.0:${env.PORT}/v1.0.0/clients`);
});