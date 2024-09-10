# [explicit_lift_qualification.test.w](../../../../../tests/valid/explicit_lift_qualification.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $foo }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $foo.mehtod());
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $bucket1 }) {
  class $Closure2 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const b = $bucket1;
      {
        (await b.put("k3", "value3"));
      }
      $helpers.assert($helpers.eq((await $bucket1.get("k3")), "value3"), "bucket1.get(\"k3\") == \"value3\"");
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $inflight_closure }) {
  class $Closure3 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $inflight_closure());
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.cjs.map
```

## inflight.$Closure4-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $bar }) {
  class $Closure4 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const x = $bar;
      {
        $helpers.assert($helpers.eq((await x.method()), "ahoy there"), "x.method() == \"ahoy there\"");
      }
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-1.cjs.map
```

## inflight.Foo-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $bucket1, $bucket2, $bucket3, $maybe_bucket }) {
  class Foo {
    async mehtod() {
      {
        const b1 = $bucket1;
        (await b1.put("k2", "value2"));
        $helpers.assert($helpers.eq((await b1.list()), ["k", "k2"]), "b1.list() == [\"k\", \"k2\"]");
        (await b1.delete("k2"));
        const b2 = $bucket2;
        (await b2.put("k2", "value2"));
        const b3 = $bucket3;
        {
          (await b3.put("k3", "value3"));
        }
        {
          (await b3.list());
        }
      }
      $helpers.assert($helpers.eq((await $bucket1.tryGet("k2")), undefined), "bucket1.tryGet(\"k2\") == nil");
      $helpers.assert($helpers.eq((await $bucket2.get("k2")), "value2"), "bucket2.get(\"k2\") == \"value2\"");
      $helpers.assert($helpers.eq((await $bucket3.get("k3")), "value3"), "bucket3.get(\"k3\") == \"value3\"");
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-1.cjs.map
```

## inflight.PreflightClass-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class PreflightClass {
    async method() {
      return "ahoy there";
    }
  }
  return PreflightClass;
}
//# sourceMappingURL=inflight.PreflightClass-1.cjs.map
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
      "b1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b1/Default",
            "uniqueId": "b1"
          }
        },
        "bucket_prefix": "b1-c88fb896-",
        "force_destroy": false
      },
      "b2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b2/Default",
            "uniqueId": "b2"
          }
        },
        "bucket_prefix": "b2-c844cd88-",
        "force_destroy": false
      },
      "b3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b3/Default",
            "uniqueId": "b3"
          }
        },
        "bucket_prefix": "b3-c8a40138-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_cors_configuration": {
      "b1_CorsConfiguration-12a95bb8_084FCCA5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b1/CorsConfiguration-12a95bb8",
            "uniqueId": "b1_CorsConfiguration-12a95bb8_084FCCA5"
          }
        },
        "bucket": "${aws_s3_bucket.b1.id}",
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
      },
      "b2_CorsConfiguration-fa6445bb_E69581A6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b2/CorsConfiguration-fa6445bb",
            "uniqueId": "b2_CorsConfiguration-fa6445bb_E69581A6"
          }
        },
        "bucket": "${aws_s3_bucket.b2.id}",
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
      },
      "b3_CorsConfiguration-c50b642d_34B3271D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b3/CorsConfiguration-c50b642d",
            "uniqueId": "b3_CorsConfiguration-c50b642d_34B3271D"
          }
        },
        "bucket": "${aws_s3_bucket.b3.id}",
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
    },
    "aws_s3_object": {
      "b1_S3Object-k_80FB6BEF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b1/S3Object-k",
            "uniqueId": "b1_S3Object-k_80FB6BEF"
          }
        },
        "bucket": "${aws_s3_bucket.b1.bucket}",
        "content": "value",
        "key": "k"
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
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const cloud = $stdlib.cloud;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.cjs")({
            $bucket1: ${$stdlib.core.liftObject(bucket1)},
            $bucket2: ${$stdlib.core.liftObject(bucket2)},
            $bucket3: ${$stdlib.core.liftObject(bucket3)},
            $maybe_bucket: ${$stdlib.core.liftObject(maybe_bucket)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "mehtod": [
            [(maybe_bucket ?? bucket3), ["list"]],
            [bucket1, [].concat(["delete", "put", "list"], ["tryGet"])],
            [bucket2, [].concat(["put"], ["get"])],
            [bucket3, [].concat(["put"], ["get"])],
            [maybe_bucket, []],
          ],
          "$inflight_init": [
            [(maybe_bucket ?? bucket3), []],
            [bucket1, []],
            [bucket2, []],
            [bucket3, []],
            [maybe_bucket, []],
          ],
        });
      }
    }
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $foo: ${$stdlib.core.liftObject(foo)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [foo, ["mehtod"]],
          ],
          "$inflight_init": [
            [foo, []],
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.cjs")({
            $bucket1: ${$stdlib.core.liftObject(bucket1)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [bucket1, [].concat(["put"], ["get"])],
          ],
          "$inflight_init": [
            [bucket1, []],
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-1.cjs")({
            $inflight_closure: ${$stdlib.core.liftObject(inflight_closure)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [inflight_closure, ["handle"]],
          ],
          "$inflight_init": [
            [inflight_closure, []],
          ],
        });
      }
    }
    class PreflightClass extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.PreflightClass-1.cjs")({
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
    class $Closure4 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-1.cjs")({
            $bar: ${$stdlib.core.liftObject(bar)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [bar, ["method"]],
          ],
          "$inflight_init": [
            [bar, []],
          ],
        });
      }
    }
    const bucket1 = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "b1");
    (bucket1.addObject("k", "value"));
    const bucket2 = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "b2");
    const bucket3 = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "b3");
    const maybe_bucket = undefined;
    const foo = new Foo(this, "Foo");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:explicit method lift qualification", new $Closure1(this, "$Closure1"));
    const inflight_closure = new $Closure2(this, "$Closure2");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:explicit closure lift qualification", new $Closure3(this, "$Closure3"));
    const bar = new PreflightClass(this, "PreflightClass");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:explicit interface lift qualification", new $Closure4(this, "$Closure4"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "explicit_lift_qualification.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

