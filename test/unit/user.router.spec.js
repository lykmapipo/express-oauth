'use strict';


/* dependencies */
const path = require('path');
const request = require('supertest');
const faker = require('faker');
const { expect } = require('chai');
const {
  User,
  app,
  info
} = require(path.join(__dirname, '..', '..'));


/* declarations */
let user = User.fake();


describe('User HTTP Router', function () {

  before(function (done) {
    User.remove(done);
  });

  after(function (done) {
    User.remove(done);
  });

  it('should handle HTTP POST on /users', function (done) {

    request(app)
      .post(`/v${info.version}/users`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(user)
      .expect(201)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const created = response.body;

        expect(created._id).to.exist;
        expect(created.name).to.exist;
        expect(created.email).to.exist;
        expect(created.phone).to.exist;
        expect(created.createdAt).to.exist;
        expect(created.updatedAt).to.exist;

        user = created;
        done(error, response);

      });

  });

  it('should handle HTTP GET on /users', function (done) {

    request(app)
      .get(`/v${info.version}/users`)
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

  it('should handle HTTP GET on /users/id:', function (done) {

    request(app)
      .get(`/v${info.version}/users/${user._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const found = response.body;

        expect(found._id).to.exist;
        expect(found._id).to.exist;
        expect(found.name).to.exist;
        expect(found.email).to.exist;
        expect(found.phone).to.exist;
        expect(found.createdAt).to.exist;
        expect(found.updatedAt).to.exist;

        done(error, response);

      });

  });

  it('should handle HTTP PATCH on /users/id:', function (done) {

    const patch = {
      name: faker.name.findName()
    };

    request(app)
      .patch(`/v${info.version}/users/${user._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(patch)
      .expect(200)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const patched = response.body;

        expect(patched._id).to.exist;
        expect(patched.name).to.exist;
        expect(patched.email).to.exist;
        expect(patched.phone).to.exist;
        expect(patched.createdAt).to.exist;
        expect(patched.updatedAt).to.exist;

        user = patched;
        done(error, response);

      });

  });

  it('should handle HTTP PUT on /users/id:', function (done) {

    const put = {
      name: faker.name.findName()
    };

    request(app)
      .put(`/v${info.version}/users/${user._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(put)
      .expect(200)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const puted = response.body;

        expect(puted._id).to.exist;
        expect(puted.name).to.exist;
        expect(puted.email).to.exist;
        expect(puted.phone).to.exist;
        expect(puted.createdAt).to.exist;
        expect(puted.updatedAt).to.exist;

        user = puted;
        done(error, response);

      });

  });

  it('should handle HTTP DELETE on /users/:id', function (done) {

    request(app)
      .delete(`/v${info.version}/users/${user._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const deleted = response.body;

        expect(deleted._id).to.exist;
        expect(deleted.name).to.exist;
        expect(deleted.email).to.exist;
        expect(deleted.phone).to.exist;
        expect(deleted.createdAt).to.exist;
        expect(deleted.updatedAt).to.exist;

        user = deleted;
        done(error, response);

      });

  });

});