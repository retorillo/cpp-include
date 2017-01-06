const fs = require('fs');
const os = require('os');
const join = require('path').join;
const dirname = require('path').dirname;
const normalize = require('path').normalize;

function getIncludeFiles(path) {
  return getIncludeFilesFromString(fs.readFileSync(path).toString(), { origin: path, });
}

function getIncludeFilesFromString(str, opt) {
  var m, files = [];
  var r = /^\s*#include\s*(?:"([^"]+)"|<([^>]+)>)/mg;
  var opt = opt || {};
  var origin = opt.origin || "";
  while ((m = r.exec(str)) != null)
    files.push({ path: m[1] || m[2],
        local: m[1] ? true : false,
        find: find,
        origin: origin })
  return files;
}

function ENV(env) {
  return (process.env[env] || "").split(os.platform() != 'win32' ? /:/g : /;/g).
    filter(p => p.length > 0);
}
function INCLUDE() {
  return ENV(os.platform() != 'win32' ? "CPATH" : "INCLUDE");
}

function findpath(path, dirs) {
  for (var d of dirs) {
    var full = normalize(join(d, path));
    try {
      fs.accessSync(full);
      return full;
    }
    catch (e) {
      continue;
    }
  }
}

function find(dirs) {
  dirs = (dirs || []).concat(INCLUDE());
  if (!this.local)
    return findpath(this.path, dirs);
  else
    return findpath(this.path, [dirname(this.origin)]) ||
      findpath(this.path, dirs);
}

module.exports = {
  getIncludeFiles: getIncludeFiles,
  getIncludeFilesFromString: getIncludeFilesFromString,
}
