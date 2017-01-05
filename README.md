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
  { path: "stdio", local: false },
  { path: "mylib.h", local: true },
]*/
```

`local` represents whether include directive is quoted-form (`local: true`) or
angle-bracket form (`local: false`)

If want to input source code string rather than path, use `getIncludeFilesFromString`

```
var src = "#include <stdio.h>\n#include \"mylib.h\"";
cppInclude.getIncludeFilesFromString(src);
/* [
  { path: "stdio", local: false },
  { path: "mylib.h", local: true },
]*/
```

## License

Distirubted under the MIT license

Copyright (C) 2017 Retorillo
