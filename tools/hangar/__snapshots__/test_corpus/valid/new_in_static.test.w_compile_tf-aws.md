# [new_in_static.test.w](../../../../../tests/valid/new_in_static.test.w) | compile | tf-aws

## inflight.$Closure1-2.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $bucket, $bucket3 }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq((await $bucket.list()).length, 0), "bucket.list().length == 0");
      $helpers.assert($helpers.eq((await $bucket3.list()).length, 0), "bucket3.list().length == 0");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-2.cjs.map
```

## inflight.Foo-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Foo {
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-1.cjs.map
```

## inflight.Foo-2.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $FooParent }) {
  class Foo extends $FooParent {
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-2.cjs.map
```

## inflight.FooParent-2.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class FooParent {
  }
  return FooParent;
}
//# sourceMappingURL=inflight.FooParent-2.cjs.map
```

## inflight.LibClass-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class LibClass {
  }
  return LibClass;
}
//# sourceMappingURL=inflight.LibClass-1.cjs.map
```

## inflight.MyClass-2.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class MyClass {
  }
  return MyClass;
}
//# sourceMappingURL=inflight.MyClass-2.cjs.map
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
      "Construct_Bucket_2C7B19D9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Construct/Bucket/Default",
            "uniqueId": "Construct_Bucket_2C7B19D9"
          }
        },
        "bucket_prefix": "bucket-c8186214-",
        "force_destroy": false
      },
      "Construct_MyClass_implicit-scope-bucket_177A1CDF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Construct/MyClass/implicit-scope-bucket/Default",
            "uniqueId": "Construct_MyClass_implicit-scope-bucket_177A1CDF"
          }
        },
        "bucket_prefix": "implicit-scope-bucket-c8ebd2a7-",
        "force_destroy": false
      },
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
      "implicit-scope-bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/implicit-scope-bucket/Default",
            "uniqueId": "implicit-scope-bucket"
          }
        },
        "bucket_prefix": "implicit-scope-bucket-c811b94a-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_cors_configuration": {
      "Construct_Bucket_CorsConfiguration-5f65e65b_CF886C7D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Construct/Bucket/CorsConfiguration-5f65e65b",
            "uniqueId": "Construct_Bucket_CorsConfiguration-5f65e65b_CF886C7D"
          }
        },
        "bucket": "${aws_s3_bucket.Construct_Bucket_2C7B19D9.id}",
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
      "Construct_MyClass_implicit-scope-bucket_CorsConfiguration-cb540331_1C8206C8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Construct/MyClass/implicit-scope-bucket/CorsConfiguration-cb540331",
            "uniqueId": "Construct_MyClass_implicit-scope-bucket_CorsConfiguration-cb540331_1C8206C8"
          }
        },
        "bucket": "${aws_s3_bucket.Construct_MyClass_implicit-scope-bucket_177A1CDF.id}",
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
      "implicit-scope-bucket_CorsConfiguration-71756df9_DC767D65": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/implicit-scope-bucket/CorsConfiguration-71756df9",
            "uniqueId": "implicit-scope-bucket_CorsConfiguration-71756df9_DC767D65"
          }
        },
        "bucket": "${aws_s3_bucket.implicit-scope-bucket.id}",
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
    const c = require("constructs");
    const jsii_fixture = require("jsii-fixture");
    const new_in_static_lib = $helpers.bringJs(`${__dirname}/preflight.newinstaticlib-1.cjs`, $preflightTypesMap);
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class MyClass extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static createBucket($scope, scope) {
        return globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, scope, "Bucket");
      }
      static createMyClass($scope, scope) {
        return new MyClass(scope, "MyClass");
      }
      static createMyClassWithImplicitScope($scope, id) {
        return new MyClass($scope, String.raw({ raw: ["implicit-scope-myclass-", ""] }, id));
      }
      static createBucketWithImplicitScope($scope) {
        return globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, $scope, "implicit-scope-bucket");
      }
      instanceMethod() {
        const my = (MyClass.createMyClassWithImplicitScope(this, "from-instance-method"));
        const bucket = (MyClass.createBucketWithImplicitScope(this));
      }
      static staticMehtodThatCallsAnotherStaticMethod($scope) {
        return (MyClass.createMyClassWithImplicitScope($scope, "from-outer-static-method"));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.MyClass-2.cjs")({
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
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-2.cjs")({
            $bucket: ${$stdlib.core.liftObject(bucket)},
            $bucket3: ${$stdlib.core.liftObject(bucket3)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [bucket, ["list"]],
            [bucket3, ["list"]],
          ],
          "$inflight_init": [
            [bucket, []],
            [bucket3, []],
          ],
        });
      }
    }
    class FooParent extends $stdlib.std.Resource {
      constructor($scope, $id, myclass) {
        super($scope, $id);
        this.field = myclass;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.FooParent-2.cjs")({
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
    class Foo extends FooParent {
      constructor($scope, $id, ) {
        super($scope, $id, undefined);
        (MyClass.createMyClassWithImplicitScope(this, "from-ctor"));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-2.cjs")({
            $FooParent: ${$stdlib.core.liftObject(FooParent)},
          })
        `;
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    const createBucket = (() => {
      globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "b1");
    });
    if (true) {
      globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "b2");
    }
    const scope = globalThis.$ClassFactory.new("constructs.Construct", c.Construct, this, "Construct");
    const bucket = (MyClass.createBucket(this, scope));
    const bucket2 = (createBucket());
    const my = (MyClass.createMyClass(this, scope));
    const my2 = (MyClass.createMyClassWithImplicitScope(this, "from-root"));
    const bucket3 = (MyClass.createBucketWithImplicitScope(this));
    const my3 = (MyClass.staticMehtodThatCallsAnotherStaticMethod(this));
    (my.instanceMethod());
    $helpers.assert($helpers.eq((jsii_fixture.JsiiClass.staticMethod("foo")), "Got foo"), "jsii_fixture.JsiiClass.staticMethod(\"foo\") == \"Got foo\"");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:play with buckets", new $Closure1(this, "$Closure1"));
    const f = new Foo(this, "Foo");
    const lib_f = (new_in_static_lib.LibClass.createFoo(this, "lib-foo"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "new_in_static.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

## preflight.newinstaticlib-1.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $types = require("./types.cjs");
let $preflightTypesMap = {};
class Foo extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.cjs")({
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
class LibClass extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static createFoo($scope, id) {
    return globalThis.$ClassFactory.new("examples-valid.Foo", Foo, $scope, id);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.LibClass-1.cjs")({
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
module.exports = { $preflightTypesMap, Foo, LibClass };
//# sourceMappingURL=preflight.newinstaticlib-1.cjs.map
```

