var cppInclude = require('../');
var CSON = require('cson');
var should = require('should');
var path = require('path');

describe('getIncludeFiles', function() {
  it('from file', function() {
    var files = cppInclude.getIncludeFiles(path.join(__dirname, 'test1.cpp'));
    files.forEach(f => { delete f.find; delete f.origin; });
    should(files).eql(CSON.load(path.join(__dirname, 'expect1.cson')));
  });
  it('with find', function() {
    var files = cppInclude.getIncludeFiles(path.join(__dirname, 'test2.cpp'));
    var found = {};
    files.forEach(f => { found[f.path] = f.find() != undefined; });
    should(found).eql(CSON.load(path.join(__dirname, 'expect2.cson')));
  });
});



