'use strict';


/* dependencies */
const path = require('path');
const request = require('supertest');
const { expect } = require('chai');
const {
  Client,
  clientRouter,
  app,
} = require(path.join(__dirname, '..', '..'));


/* declarations */
let client = Client.fake();

describe('Client HTTP Router', function () {

  before(function (done) {
    Client.remove(done);
  });

  after(function (done) {
    Client.remove(done);
  });

  it('should handle HTTP POST on /clients', function (done) {

    request(app)
      .post(`/v${clientRouter.apiVersion}/clients`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(client)
      .expect(201)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const created = response.body;

        expect(created._id).to.exist;
        expect(created.type).to.exist;
        expect(created.grants).to.exist;
        expect(created.redirectUris).to.exist;
        expect(created.refreshTokenLifetime).to.exist;
        expect(created.accessTokenLifetime).to.exist;
        expect(created.authorizationCodeLifetime).to.exist;
        expect(created.name).to.exist;
        expect(created.secret).to.exist;
        expect(created.createdAt).to.exist;
        expect(created.updatedAt).to.exist;

        client = created;
        done(error, response);

      });

  });

  it('should handle HTTP GET on /clients', function (done) {

    request(app)
      .get(`/v${clientRouter.apiVersion}/clients`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const result = response.body;

        expect(result.data).to.exist;
        expect(result.total).to.exist;
        expect(result.limit).to.exist;
        expect(result.skip).to.exist;
        expect(result.page).to.exist;
        expect(result.pages).to.exist;

        done(error, response);

      });

  });

  it('should handle HTTP GET on /clients/id:', function (done) {

    request(app)
      .get(`/v${clientRouter.apiVersion}/clients/${client._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const found = response.body;

        expect(found._id).to.exist;
        expect(found._id).to.be.equal(client._id);
        expect(found.type).to.exist;
        expect(found.grants).to.exist;
        expect(found.redirectUris).to.exist;
        expect(found.refreshTokenLifetime).to.exist;
        expect(found.accessTokenLifetime).to.exist;
        expect(found.authorizationCodeLifetime).to.exist;
        expect(found.name).to.exist;
        expect(found.secret).to.exist;
        expect(found.createdAt).to.exist;
        expect(found.updatedAt).to.exist;

        done(error, response);

      });

  });

  it('should handle HTTP PATCH on /clients/id:', function (done) {

    const patch = {
      name: 'Web Client v2'
    };

    request(app)
      .patch(`/v${clientRouter.apiVersion}/clients/${client._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(patch)
      .expect(200)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const patched = response.body;

        expect(patched._id).to.exist;
        expect(patched._id).to.be.equal(client._id);
        expect(patched.type).to.exist;
        expect(patched.grants).to.exist;
        expect(patched.redirectUris).to.exist;
        expect(patched.refreshTokenLifetime).to.exist;
        expect(patched.accessTokenLifetime).to.exist;
        expect(patched.authorizationCodeLifetime).to.exist;
        expect(patched.name).to.exist;
        expect(patched.name).to.be.equal(patch.name);
        expect(patched.secret).to.exist;
        expect(patched.createdAt).to.exist;
        expect(patched.updatedAt).to.exist;

        client = patched;
        done(error, response);

      });

  });

  it('should handle HTTP PUT on /clients/id:', function (done) {

    const put = {
      name: 'Web Client v3'
    };

    request(app)
      .put(`/v${clientRouter.apiVersion}/clients/${client._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(put)
      .expect(200)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const puted = response.body;

        expect(puted._id).to.exist;
        expect(puted._id).to.be.equal(client._id);
        expect(puted.type).to.exist;
        expect(puted.grants).to.exist;
        expect(puted.redirectUris).to.exist;
        expect(puted.refreshTokenLifetime).to.exist;
        expect(puted.accessTokenLifetime).to.exist;
        expect(puted.authorizationCodeLifetime).to.exist;
        expect(puted.name).to.exist;
        expect(puted.name).to.be.equal(put.name);
        expect(puted.secret).to.exist;
        expect(puted.createdAt).to.exist;
        expect(puted.updatedAt).to.exist;

        client = puted;
        done(error, response);

      });

  });

  it('should handle HTTP DELETE on /clients/:id', function (done) {

    request(app)
      .delete(`/v${clientRouter.apiVersion}/clients/${client._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const deleted = response.body;

        expect(deleted._id).to.exist;
        expect(deleted._id).to.be.equal(client._id);
        expect(deleted.type).to.exist;
        expect(deleted.grants).to.exist;
        expect(deleted.redirectUris).to.exist;
        expect(deleted.refreshTokenLifetime).to.exist;
        expect(deleted.accessTokenLifetime).to.exist;
        expect(deleted.authorizationCodeLifetime).to.exist;
        expect(deleted.name).to.exist;
        expect(deleted.secret).to.exist;
        expect(deleted.createdAt).to.exist;
        expect(deleted.updatedAt).to.exist;

        client = deleted;
        done(error, response);

      });

  });

});