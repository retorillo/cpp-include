var cppInclude = require('../');
var CSON = require('cson');
var should = require('should');
var path = require('path');

describe('getIncludeFiles', function() {
  it('test1', function() {
    should(cppInclude.getIncludeFiles(path.join(__dirname, 'test1.cpp')))
      .eql(CSON.load(path.join(__dirname, 'expect1.cson')));
  });
});



