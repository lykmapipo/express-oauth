'use strict';


//dependencies
const path = require('path');
const faker = require('faker');
const request = require('supertest');
const app = require('@lykmapipo/express-common');
const expect = require('chai').expect;
const router =
  require(path.join(__dirname, '..', '..', 'lib', 'routers', 'client'));
app.mount(router);


describe.only('Client', function () {

  describe('router', function () {

    it('should handle HTTP POSTS on /clients', function (done) {

      const client = {
        type: 'web',
        name: 'Web Client',
        secret: faker.random.uuid()
      };

      request(app)
        .post('/v1.0.0/clients')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(client)
        .expect(201)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;
          const created = response.body;
          console.log(created);
          done(error, response);
        });

    });

    it.skip('should handle HTTP GET on /clients', function (done) {
      request(app)
        .get('/v1.0.0/clients')
        .set('Accept', 'application/json')
        .expect(200)
        .end(done);
    });

    it.skip('should handle HTTP GET on /clients/id:', function (done) {
      request(app)
        .get('/v1.0.0/clients')
        .set('Accept', 'application/json')
        .expect(200)
        .end(done);
    });

    it.skip('should handle HTTP PATCH on /clients/id:', function (done) {
      request(app)
        .get('/v1.0.0/clients')
        .set('Accept', 'application/json')
        .expect(200)
        .end(done);
    });

    it.skip('should handle HTTP PUT on /clients/id:', function (done) {
      request(app)
        .get('/v1.0.0/clients')
        .set('Accept', 'application/json')
        .expect(200)
        .end(done);
    });

    it.skip('should handle HTTP DELETE on /clients/id:', function (done) {
      request(app)
        .get('/v1.0.0/clients')
        .set('Accept', 'application/json')
        .expect(200)
        .end(done);
    });

  });

});