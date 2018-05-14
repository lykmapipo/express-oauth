'use strict';

/* force environment to be test */
process.env.NODE_ENV = 'test';


/* dependencies */
const async = require('async');
require('chai').use(require('sinon-chai'));
require('sinon');
require('sinon-mongoose');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


function wipe(done) {
  const cleanups = mongoose.modelNames()
    .map(function (modelName) {
      //grab mongoose model
      return mongoose.model(modelName);
    })
    .map(function (Model) {
      //drop model collection
      return function (next) {
        Model.collection.drop(next);
      };
    });

  //run all clean ups parallel
  async.parallel(cleanups, function (error) {
    if (error && error.message !== 'ns not found') {
      done(error);
    } else {
      done();
    }
  });
}


//setup database
before(function (done) {
  mongoose.connect('mongodb://localhost/express-oauth', done);
});


// clear previous states
before(function (done) {
  wipe(done);
});


// restore initial environment
after(function (done) {
  wipe(done);
});