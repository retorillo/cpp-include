# cpp-include

[![Build Status](https://travis-ci.org/retorillo/cpp-include.svg?branch=master)](https://travis-ci.org/retorillo/cpp-include)
[![Coverage Status](https://coveralls.io/repos/github/retorillo/cpp-include/badge.svg?branch=master)](https://coveralls.io/github/retorillo/cpp-include?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/retorillo/cpp-include.svg)](https://gemnasium.com/github.com/retorillo/cpp-include)
[![NPM](https://img.shields.io/npm/v/cpp-include.svg)](https://www.npmjs.com/package/cpp-include)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Collect path of `#include` directive on C/C++ source code.

```javascript
const cppInclude = require('cpp-include');

cppInclude.getIncludeFiles("myapp.cpp");
/* [
  { path: "myapp.h", local: true },
]*/
cppInclude.getIncludeFiles("myapp.h");
/* [
  { path: "iostream", local: false },
  { path: "mylib.h", local: true },
]*/
```

`local` represents whether include directive is quoted-form (`local: true`) or
angle-bracket form (`local: false`)

If want to input source code string rather than path, use `getIncludeFilesFromString`

```javascript
var src = "#include <iostream>\n#include \"mylib.h\"";
cppInclude.getIncludeFilesFromString(src);
/* [
  { path: "iostream", local: false },
  { path: "mylib.h", local: true },
]*/
```

## Find the actual full path of include file

Return items of `getIncludeFiles` and `getIncludeFilesFromString` has
two additional members: `find`, `origin`.

- `origin` represents the path of the C/C++ source code that was passed to `getIncludeFiles`.
  - This value can be changed at any time, changing it affects the `find` method.
- `find` is the method to accuire the actual location on the machine.
  - When `local` is `true`, this method try to find from the following directories:
    - `origin`
    - 1st argument of this method (Array type)
    - `CPATH` (Linux/Mac) or `INCLUDE` (Windows)
  - Otherwise (`local` is `false`)
    - 1st argument of this method (Array type)
    - `CPATH` (Linux/Mac) or `INCLUDE` (Windows) 

```javascript
cppInclude.getIncludeFile("myapp.cpp")
  .filter(f => { return f.path == "iostream" })[0]
  .find();
// C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\include\iostream

cppInclude.getIncludeFile("myapp.cpp")
  .filer(f => { return f.path == "mylib.h" })[0]
  .find("C:\\Users\\retorillo\\include");
// C:\Users\retorillo\include\mylib.h
```

## License

Distirubted under the MIT license

Copyright (C) 2017 Retorillo
