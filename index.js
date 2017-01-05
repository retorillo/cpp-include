const fs = require('fs');

function getIncludeFiles(path) {
  return getIncludeFilesFromString(fs.readFileSync(path).toString());
}

function getIncludeFilesFromString(str) {
  var m, files = [];
  var r = /^\s*#include\s*(?:"([^"]+)"|<([^>]+)>)/mg;
  while ((m = r.exec(str)) != null)
    files.push(m[1] ?
      { path: m[1], local: true  } :
      { path: m[2], local: false });
  return files;
}

module.exports = {
  getIncludeFiles: getIncludeFiles,
  getIncludeFilesFromString: getIncludeFilesFromString,
}
