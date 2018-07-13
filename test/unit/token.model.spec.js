'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');


/* declarations */
const { Token } = require(path.join(__dirname, '..', '..'));


describe('Token Model', function () {

  it('should have user field', function () {

    const user = Token.schema.tree.user;
    const instance = Token.schema.paths.user.instance;

    expect(instance).to.be.equal('ObjectID');
    expect(user).to.exist;
    expect(user).to.be.an('object');
    expect(user.type).to.be.a('function');
    expect(user.type.name).to.be.equal('ObjectId');
    expect(user.index).to.be.true;
    expect(user.exists).to.be.true;
    expect(user.autoset).to.be.true;

  });

  it('should have client field', function () {

    const client = Token.schema.tree.client;
    const instance = Token.schema.paths.client.instance;

    expect(instance).to.be.equal('ObjectID');
    expect(client).to.exist;
    expect(client).to.be.an('object');
    expect(client.type).to.be.a('function');
    expect(client.type.name).to.be.equal('ObjectId');
    expect(client.index).to.be.true;
    expect(client.exists).to.be.true;
    expect(client.autoset).to.be.true;

  });

  it('should have type field', function () {

    const type = Token.schema.tree.type;
    const instance = Token.schema.paths.type.instance;

    expect(instance).to.be.equal('String');
    expect(type).to.exist;
    expect(type).to.be.an('object');
    expect(type.type).to.be.a('function');
    expect(type.type.name).to.be.equal('String');
    expect(type.trim).to.be.true;
    expect(type.lowercase).to.be.true;
    expect(type.index).to.be.true;
    expect(type.searchable).to.be.true;

  });


  it('should have scope field', function () {

    const scope = Token.schema.tree.scope;
    const instance = Token.schema.paths.scope.instance;

    expect(instance).to.be.equal('String');
    expect(scope).to.exist;
    expect(scope).to.be.an('object');
    expect(scope.type).to.be.a('function');
    expect(scope.type.name).to.be.equal('String');
    expect(scope.trim).to.be.true;
    expect(scope.searchable).to.be.true;
    expect(scope.index).to.be.true;

  });

  it('should have token field', function () {

    const token = Token.schema.tree.token;
    const instance = Token.schema.paths.token.instance;

    expect(instance).to.be.equal('String');
    expect(token).to.exist;
    expect(token).to.be.an('object');
    expect(token.type).to.be.a('function');
    expect(token.type.name).to.be.equal('String');
    expect(token.trim).to.be.true;
    expect(token.required).to.be.true;
    expect(token.searchable).to.not.exist;
    expect(token.index).to.be.true;

  });

  it('should have redirectUri field', function () {

    const redirectUri = Token.schema.tree.redirectUri;
    const instance = Token.schema.paths.redirectUri.instance;

    expect(instance).to.equal('String');
    expect(redirectUri).to.exist;
    expect(redirectUri).to.be.an('object');
    expect(redirectUri.type).to.be.a('function');
    expect(redirectUri.type.name).to.be.equal('String');
    expect(redirectUri.searchable).to.be.true;
    expect(redirectUri.trim).to.be.true;
    expect(redirectUri.searchable).to.be.true;
    expect(redirectUri.index).to.be.true;

  });


  it('should have expiredAt field', function () {

    const expiredAt = Token.schema.tree.expiredAt;
    const instance = Token.schema.paths.expiredAt.instance;

    expect(instance).to.equal('Date');
    expect(expiredAt).to.exist;
    expect(expiredAt).to.be.an('object');
    expect(expiredAt.type).to.be.a('function');
    expect(expiredAt.type.name).to.be.equal('Date');
    expect(expiredAt.index).to.be.true;

  });

});