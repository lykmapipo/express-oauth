'use strict';


/* dependencies */
const path = require('path');
const request = require('supertest');
const { expect } = require('chai');
const {
  Client,
  Token,
  tokenRouter,
  app,
} = require(path.join(__dirname, '..', '..'));


/* declarations */
let client = Client.fake();
let token = Token.fake();

describe('Token HTTP Router', function () {

  before(function (done) {
    Token.remove(done);
  });

  before(function (done) {
    Client.remove(done);
  });

  before(function (done) {
    client
      .post(function (error, created) {
        client = created;
        token.client = client;
        done(error, created);
      });
  });

  after(function (done) {
    Token.remove(done);
  });

  after(function (done) {
    Client.remove(done);
  });

  it('should handle HTTP POST on /tokens', function (done) {

    request(app)
      .post(`/v${tokenRouter.apiVersion}/tokens`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(token)
      .expect(201)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const created = response.body;

        expect(created._id).to.exist;
        // expect(created.user).to.exist;
        expect(created.client).to.exist;
        expect(created.type).to.exist;
        expect(created.scope).to.exist;
        expect(created.token).to.exist;
        expect(created.redirectUri).to.exist;
        expect(created.expiredAt).to.exist;
        expect(created.createdAt).to.exist;
        expect(created.updatedAt).to.exist;

        token = created;
        done(error, response);

      });

  });

  it('should handle HTTP GET on /tokens', function (done) {

    request(app)
      .get(`/v${tokenRouter.apiVersion}/tokens`)
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

  it('should handle HTTP GET on /tokens/id:', function (done) {

    request(app)
      .get(`/v${tokenRouter.apiVersion}/tokens/${token._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const found = response.body;

        expect(found._id).to.exist;
        // expect(found.user).to.exist;
        expect(found.client).to.exist;
        expect(found.type).to.exist;
        expect(found.scope).to.exist;
        expect(found.token).to.exist;
        expect(found.redirectUri).to.exist;
        expect(found.expiredAt).to.exist;
        expect(found.createdAt).to.exist;
        expect(found.updatedAt).to.exist;

        done(error, response);

      });

  });

  it('should handle HTTP PATCH on /tokens/id:', function (done) {

    const patch = {
      name: 'Web Client v2'
    };

    request(app)
      .patch(`/v${tokenRouter.apiVersion}/tokens/${token._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(patch)
      .expect(200)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const patched = response.body;

        expect(patched._id).to.exist;
        // expect(patched.user).to.exist;
        expect(patched.client).to.exist;
        expect(patched.type).to.exist;
        expect(patched.scope).to.exist;
        expect(patched.token).to.exist;
        expect(patched.redirectUri).to.exist;
        expect(patched.expiredAt).to.exist;
        expect(patched.createdAt).to.exist;
        expect(patched.updatedAt).to.exist;

        token = patched;
        done(error, response);

      });

  });

  it('should handle HTTP PUT on /tokens/id:', function (done) {

    const put = {
      name: 'Web Client v3'
    };

    request(app)
      .put(`/v${tokenRouter.apiVersion}/tokens/${token._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(put)
      .expect(200)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const puted = response.body;

        expect(puted._id).to.exist;
        // expect(puted.user).to.exist;
        expect(puted.client).to.exist;
        expect(puted.type).to.exist;
        expect(puted.scope).to.exist;
        expect(puted.token).to.exist;
        expect(puted.redirectUri).to.exist;
        expect(puted.expiredAt).to.exist;
        expect(puted.createdAt).to.exist;
        expect(puted.updatedAt).to.exist;

        token = puted;
        done(error, response);

      });

  });

  it('should handle HTTP DELETE on /tokens/:id', function (done) {

    request(app)
      .delete(`/v${tokenRouter.apiVersion}/tokens/${token._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const deleted = response.body;

        expect(deleted._id).to.exist;
        // expect(deleted.user).to.exist;
        expect(deleted.client).to.exist;
        expect(deleted.type).to.exist;
        expect(deleted.scope).to.exist;
        expect(deleted.token).to.exist;
        expect(deleted.redirectUri).to.exist;
        expect(deleted.expiredAt).to.exist;
        expect(deleted.createdAt).to.exist;
        expect(deleted.updatedAt).to.exist;

        token = deleted;
        done(error, response);

      });

  });

});