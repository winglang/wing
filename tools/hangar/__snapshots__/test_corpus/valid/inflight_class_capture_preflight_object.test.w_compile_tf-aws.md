# [inflight_class_capture_preflight_object.test.w](../../../../../tests/valid/inflight_class_capture_preflight_object.test.w) | compile | tf-aws

## inflight.$Closure1-5.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $Foo }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const f = (await (async () => {const o = new $Foo(); await o.$inflight_init?.(); return o; })());
      (await f.uploadToBucket("hello.txt", "world"));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-5.cjs.map
```

## inflight.$Closure2-5.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $Foo }) {
  class $Closure2 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $Foo.fooStatic());
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-5.cjs.map
```

## inflight.$Closure3-5.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $Foo }) {
  class $Closure3 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      return (await (async () => {const o = new $Foo(); await o.$inflight_init?.(); return o; })());
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-5.cjs.map
```

## inflight.$Closure4-5.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $getFoo }) {
  class $Closure4 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const foo = (await $getFoo());
      (await foo.uploadToBucket("greetings.txt", "universe"));
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-5.cjs.map
```

## inflight.$Closure5-5.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $b }) {
  class $Closure5 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      class Foo2 {
        async uploadToBucket() {
          (await $b.put("x", "y"));
          $helpers.assert($helpers.eq((await $b.get("x")), "y"), "b.get(\"x\") == \"y\"");
        }
      }
      const f = (await (async () => {const o = new Foo2(); await o.$inflight_init?.(); return o; })());
      (await f.uploadToBucket());
    }
  }
  return $Closure5;
}
//# sourceMappingURL=inflight.$Closure5-5.cjs.map
```

## inflight.$Closure6-5.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $subdir_InflightClass }) {
  class $Closure6 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const x = (await (async () => {const o = new $subdir_InflightClass(); await o.$inflight_init?.(); return o; })());
      $helpers.assert($helpers.eq((await x.method()), "What did you expect?"), "x.method() == \"What did you expect?\"");
    }
  }
  return $Closure6;
}
//# sourceMappingURL=inflight.$Closure6-5.cjs.map
```

## inflight.Bar-3.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Bar {
  }
  return Bar;
}
//# sourceMappingURL=inflight.Bar-3.cjs.map
```

## inflight.Foo-2.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Foo {
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-2.cjs.map
```

## inflight.Foo-3.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Foo {
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-3.cjs.map
```

## inflight.Foo-5.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $b }) {
  class Foo {
    async uploadToBucket(k, value) {
      (await $b.put(k, value));
      $helpers.assert($helpers.eq((await $b.get(k)), value), "b.get(k) == value");
    }
    static async fooStatic() {
      (await $b.put("a", "b"));
      $helpers.assert($helpers.eq((await $b.list()), ["a"]), "b.list() == [\"a\"]");
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-5.cjs.map
```

## inflight.InflightClass-4.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class InflightClass {
    async method() {
      return "What did you expect?";
    }
  }
  return InflightClass;
}
//# sourceMappingURL=inflight.InflightClass-4.cjs.map
```

## inflight.Widget-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Widget {
  }
  return Widget;
}
//# sourceMappingURL=inflight.Widget-1.cjs.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root"
    },
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_s3_bucket": {
      "Bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/Default",
            "uniqueId": "Bucket"
          }
        },
        "bucket_prefix": "bucket-c88fdc5f-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_cors_configuration": {
      "Bucket_CorsConfiguration-1357ca3a_A4CCA40A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/CorsConfiguration-1357ca3a",
            "uniqueId": "Bucket_CorsConfiguration-1357ca3a_A4CCA40A"
          }
        },
        "bucket": "${aws_s3_bucket.Bucket.id}",
        "cors_rule": [
          {
            "allowed_headers": [
              "*"
            ],
            "allowed_methods": [
              "GET",
              "POST",
              "PUT",
              "DELETE",
              "HEAD"
            ],
            "allowed_origins": [
              "*"
            ],
            "expose_headers": [],
            "max_age_seconds": 0
          }
        ]
      }
    }
  }
}
```

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $types = require("./types.cjs");
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const cloud = $stdlib.cloud;
    const subdir = $helpers.bringJs(`${__dirname}/preflight.subdir2-6.cjs`, $preflightTypesMap);
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-5.cjs")({
            $b: ${$stdlib.core.liftObject(b)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "uploadToBucket": [
            [b, [].concat(["put"], ["get"])],
          ],
          "$inflight_init": [
            [b, []],
          ],
        });
      }
      static get _liftTypeMap() {
        return ({
          "fooStatic": [
            [b, [].concat(["put"], ["list"])],
          ],
        });
      }
    }
    if ($preflightTypesMap[6]) { throw new Error("Foo is already in type map"); }
    $preflightTypesMap[6] = Foo;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-5.cjs")({
            $Foo: ${$stdlib.core.liftObject(Foo)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [$helpers.preflightClassSingleton(this, 6), ["uploadToBucket"]],
            [Foo, []],
          ],
          "$inflight_init": [
            [$helpers.preflightClassSingleton(this, 6), []],
            [Foo, []],
          ],
        });
      }
    }
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-5.cjs")({
            $Foo: ${$stdlib.core.liftObject(Foo)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [Foo, ["fooStatic"]],
          ],
          "$inflight_init": [
            [Foo, []],
          ],
        });
      }
    }
    class $Closure3 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-5.cjs")({
            $Foo: ${$stdlib.core.liftObject(Foo)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [Foo, []],
          ],
          "$inflight_init": [
            [Foo, []],
          ],
        });
      }
    }
    class $Closure4 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-5.cjs")({
            $getFoo: ${$stdlib.core.liftObject(getFoo)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [$helpers.preflightClassSingleton(this, 6), ["uploadToBucket"]],
            [getFoo, ["handle"]],
          ],
          "$inflight_init": [
            [$helpers.preflightClassSingleton(this, 6), []],
            [getFoo, []],
          ],
        });
      }
    }
    class $Closure5 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure5-5.cjs")({
            $b: ${$stdlib.core.liftObject(b)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [b, [].concat(["put"], ["get"])],
          ],
          "$inflight_init": [
            [b, []],
          ],
        });
      }
    }
    class $Closure6 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure6-5.cjs")({
            $subdir_InflightClass: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("examples-valid.subdir2.InflightClass") ?? subdir.InflightClass, "", "InflightClass"))},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [$helpers.preflightClassSingleton(this, 5), ["method"]],
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("examples-valid.subdir2.InflightClass") ?? subdir.InflightClass, "", "InflightClass"), []],
          ],
          "$inflight_init": [
            [$helpers.preflightClassSingleton(this, 5), []],
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("examples-valid.subdir2.InflightClass") ?? subdir.InflightClass, "", "InflightClass"), []],
          ],
        });
      }
    }
    const b = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight class captures preflight resource", new $Closure1(this, "$Closure1"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight class type captures preflight resource", new $Closure2(this, "$Closure2"));
    const getFoo = new $Closure3(this, "$Closure3");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight class qualified without explicit reference", new $Closure4(this, "$Closure4"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight class defined inflight captures preflight object", new $Closure5(this, "$Closure5"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:bring inflight class from subdir", new $Closure6(this, "$Closure6"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight_class_capture_preflight_object.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

## preflight.file1-3.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $types = require("./types.cjs");
let $preflightTypesMap = {};
const blah = $helpers.bringJs(`${__dirname}/preflight.inner-2.cjs`, $preflightTypesMap);
const cloud = $stdlib.cloud;
const util = $stdlib.util;
class Foo extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  foo() {
    return "foo";
  }
  checkWidget(widget) {
    return ((widget.compute()) + (blah.Widget.staticCompute(this)));
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Foo-2.cjs")({
      })
    `;
  }
  get _liftMap() {
    return ({
      "$inflight_init": [
      ],
    });
  }
}
module.exports = { $preflightTypesMap, Foo };
//# sourceMappingURL=preflight.file1-3.cjs.map
```

## preflight.file2-4.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $types = require("./types.cjs");
let $preflightTypesMap = {};
const util = $stdlib.util;
class Bar extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  bar() {
    (util.Util.nanoid());
    return "bar";
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Bar-3.cjs")({
      })
    `;
  }
  get _liftMap() {
    return ({
      "$inflight_init": [
      ],
    });
  }
}
class Foo extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Foo-3.cjs")({
      })
    `;
  }
  get _liftMap() {
    return ({
      "$inflight_init": [
      ],
    });
  }
}
module.exports = { $preflightTypesMap, Bar };
//# sourceMappingURL=preflight.file2-4.cjs.map
```

## preflight.inflightclass-5.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $types = require("./types.cjs");
let $preflightTypesMap = {};
class InflightClass extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.InflightClass-4.cjs")({
      })
    `;
  }
  get _liftMap() {
    return ({
      "method": [
      ],
      "$inflight_init": [
      ],
    });
  }
}
if ($preflightTypesMap[5]) { throw new Error("InflightClass is already in type map"); }
$preflightTypesMap[5] = InflightClass;
module.exports = { $preflightTypesMap, InflightClass };
//# sourceMappingURL=preflight.inflightclass-5.cjs.map
```

## preflight.inner-2.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $types = require("./types.cjs");
const $preflightTypesMap = {};
Object.assign(module.exports, $helpers.bringJs(`${__dirname}/preflight.widget-1.cjs`, $preflightTypesMap));
module.exports = { ...module.exports, $preflightTypesMap };
//# sourceMappingURL=preflight.inner-2.cjs.map
```

## preflight.subdir2-6.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $types = require("./types.cjs");
const $preflightTypesMap = {};
Object.assign(module.exports, { get inner() { return $helpers.bringJs(`${__dirname}/preflight.inner-2.cjs`, $preflightTypesMap); } });
Object.assign(module.exports, $helpers.bringJs(`${__dirname}/preflight.inflightclass-5.cjs`, $preflightTypesMap));
Object.assign(module.exports, $helpers.bringJs(`${__dirname}/preflight.file2-4.cjs`, $preflightTypesMap));
Object.assign(module.exports, $helpers.bringJs(`${__dirname}/preflight.file1-3.cjs`, $preflightTypesMap));
module.exports = { ...module.exports, $preflightTypesMap };
//# sourceMappingURL=preflight.subdir2-6.cjs.map
```

## preflight.widget-1.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $types = require("./types.cjs");
let $preflightTypesMap = {};
class Widget extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  compute() {
    return 42;
  }
  static staticCompute($scope) {
    return 1337;
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Widget-1.cjs")({
      })
    `;
  }
  get _liftMap() {
    return ({
      "$inflight_init": [
      ],
    });
  }
}
module.exports = { $preflightTypesMap, Widget };
//# sourceMappingURL=preflight.widget-1.cjs.map
```

