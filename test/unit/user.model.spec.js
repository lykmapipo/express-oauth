'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');


/* declarations */
const { User } = require(path.join(__dirname, '..', '..'));


describe('User Model', function () {

  before(function (done) {
    User.remove(done);
  });

  after(function (done) {
    User.remove(done);
  });

  it('should have name field', function () {

    const name = User.schema.tree.name;
    const instance = User.schema.paths.name.instance;

    expect(instance).to.be.equal('String');
    expect(name).to.exist;
    expect(name).to.be.an('object');
    expect(name.type).to.be.a('function');
    expect(name.type.name).to.be.equal('String');
    expect(name.required).to.be.true;
    expect(name.trim).to.be.true;
    expect(name.index).to.be.true;
    expect(name.searchable).to.be.true;

  });

  it('should have avatar field', function () {

    const avatar = User.schema.tree.avatar;
    const instance = User.schema.paths.avatar.instance;

    expect(instance).to.be.equal('String');
    expect(avatar).to.exist;
    expect(avatar).to.be.an('object');
    expect(avatar.type).to.be.a('function');
    expect(avatar.type.name).to.be.equal('String');

  });

  it('should have phone field', function () {

    const phone = User.schema.tree.phone;
    const instance = User.schema.paths.phone.instance;

    expect(instance).to.be.equal('String');
    expect(phone).to.exist;
    expect(phone).to.be.an('object');
    expect(phone.type).to.be.a('function');
    expect(phone.type.name).to.be.equal('String');
    expect(phone.required).to.be.true;
    expect(phone.trim).to.be.true;
    expect(phone.unique).to.be.true;
    expect(phone.searchable).to.be.true;

  });

  //TODO add specs for irina added fields

});