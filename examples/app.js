'use strict';

//ensure mongo uri
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/express-oauth');

//dependencies
const path = require('path');
const mongoose = require('mongoose');
const { app, info } = require(path.join(__dirname, '..'));

//connect to mongoose
mongoose.connect(process.env.MONGODB_URI);

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