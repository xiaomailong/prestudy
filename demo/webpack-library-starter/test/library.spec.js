import chai from 'chai';
import WaterBolik from '../lib/waterbolik.js';

chai.expect();

const expect = chai.expect;

var lib;

describe('Given an instance of my library', function () {
  before(function () {
    lib = new WaterBolik();
  });
  describe('when I need the name', function () {
    it('should return the name', () => {
      expect(lib.name).to.be.equal('WaterBolik');
    });
  });
});
