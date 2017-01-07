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

describe('find', function() {
  // NOTE: Generally `origin` MUST represents file rather than directory name.
  // See `ensureDirname` to learn why the below test is correctly passing.
  var pkg = {
    path: "package.json",
    local: true,
    find: cppInclude._.find,
    origin: __dirname
  }
  it ('without argument', function() {
    should(pkg.find()).eql(undefined);
  });
  it ('with string', function() {
    should(pkg.find("../")).match(/package.json$/);
  });
  it ('with Array', function() {
    should(pkg.find(["../"])).match(/package.json$/);
  });
});

describe('ensureArray', function() {
  it ('with undefined', function() {
    should(cppInclude._.ensureArray(undefined)).eql([]);
  });
  it ('with Array', function() {
    should(cppInclude._.ensureArray([])).eql([]);
  });
  it ('with non-Array', function() {
    should(cppInclude._.ensureArray('')).eql(['']);
  });
});
describe('ensureDirname', function() {
  it ('with undefined', function() {
    should(cppInclude._.ensureDirname(undefined)).eql(".");
  });
  it ('with existing file', function() {
    should(cppInclude._.ensureDirname(path.join(__dirname, "test.js"))).eql(__dirname);
  });
  it ('with existing directory', function() {
    should(cppInclude._.ensureDirname(__dirname)).eql( __dirname);
  });
  it ('with unexsiting path', function() {
    should(cppInclude._.ensureDirname(path.join(__dirname, "__unkown"))).eql(__dirname);
  });
});
