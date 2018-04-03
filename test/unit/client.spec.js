'use strict';


//dependencies
const path = require('path');
const expect = require('chai').expect;
const Client =
  require(path.join(__dirname, '..', '..', 'lib', 'models', 'client'));


describe('Client', function () {

  describe('schema', function () {

    it('should have type field', function () {

      const type = Client.schema.tree.type;
      const instance = Client.schema.paths.type.instance;

      expect(instance).to.be.equal('String');
      expect(type).to.exist;
      expect(type).to.be.an('object');
      expect(type.type).to.be.a('function');
      expect(type.type.name).to.be.equal('String');
      expect(type.required).to.not.exist;
      expect(type.lowercase).to.be.true;
      expect(type.trim).to.be.true;
      expect(type.index).to.be.true;
      expect(type.searchable).to.be.true;

    });

    it('should have name field', function () {

      const name = Client.schema.tree.name;
      const instance = Client.schema.paths.name.instance;

      expect(instance).to.be.equal('String');
      expect(name).to.exist;
      expect(name).to.be.an('object');
      expect(name.type).to.be.a('function');
      expect(name.type.name).to.be.equal('String');
      expect(name.required).to.not.exist;
      expect(name.trim).to.be.true;
      expect(name.index).to.be.true;
      expect(name.searchable).to.be.true;

    });


    it('should have secret field', function () {

      const secret = Client.schema.tree.secret;
      const instance = Client.schema.paths.secret.instance;

      expect(instance).to.be.equal('String');
      expect(secret).to.exist;
      expect(secret).to.be.an('object');
      expect(secret.type).to.be.a('function');
      expect(secret.type.name).to.be.equal('String');
      expect(secret.required).to.be.true;
      expect(secret.trim).to.be.true;
      expect(secret.index).to.not.exist;
      expect(secret.searchable).to.not.exist;

    });


    it('should have grants field', function () {

      const grants = Client.schema.tree.grants;
      const instance = Client.schema.paths.grants.instance;

      expect(instance).to.equal('Array');
      expect(grants).to.exist;
      expect(grants).to.be.an('object');
      expect(grants.type[0]).to.be.a('function');
      expect(grants.type[0].name).to.be.equal('String');
      expect(grants.required).to.not.exist;
      expect(grants.default).to.be.eql([]);
      expect(grants.searchable).to.be.true;
      expect(grants.index).to.be.true;

    });

  });

});