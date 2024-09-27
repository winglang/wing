# [inflight_handler_singleton.test.w](../../../../../tests/valid/inflight_handler_singleton.test.w) | compile | tf-aws

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
      const n = (await $foo.inc());
      return String.raw({ raw: ["", ""] }, n);
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
module.exports = function({ $foo }) {
  class $Closure2 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const n = (await $foo.inc());
      return String.raw({ raw: ["", "-fn2"] }, n);
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
module.exports = function({ $expect_Util, $fn, $fn2 }) {
  class $Closure3 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const x = (await $fn.invoke(""));
      const y = (await $fn.invoke(""));
      const z = (await $fn2.invoke(""));
      (await $expect_Util.equal(x, "100"));
      if ($helpers.eq(process.env.WING_TARGET, "sim")) {
        (await $expect_Util.equal(y, "101"));
        console.log("client has been reused");
      }
      (await $expect_Util.equal(z, "100-fn2"));
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
module.exports = function({ $foo, $std_Duration, $util_Util }) {
  class $Closure4 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const n = (await $foo.inc());
      (await $util_Util.sleep((await $std_Duration.fromSeconds(3))));
      $helpers.assert($helpers.eq(n, (await $foo.get())), "n == foo.get()");
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-1.cjs.map
```

## inflight.$Closure5-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $fn3, $std_Duration, $util_Util }) {
  class $Closure5 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $fn3.invokeAsync(""));
      (await $util_Util.sleep((await $std_Duration.fromSeconds(1))));
      (await $fn3.invoke(""));
    }
  }
  return $Closure5;
}
//# sourceMappingURL=inflight.$Closure5-1.cjs.map
```

## inflight.Foo-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Foo {
    async inc() {
      this.n += 1;
      return this.n;
    }
    async get() {
      return this.n;
    }
    async $inflight_init() {
      this.n = 99;
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-1.cjs.map
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
    "aws_cloudwatch_log_group": {
      "Function_CloudwatchLogGroup_ABDCF4C4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/CloudwatchLogGroup",
            "uniqueId": "Function_CloudwatchLogGroup_ABDCF4C4"
          }
        },
        "name": "/aws/lambda/Function-c852aba6",
        "retention_in_days": 30
      },
      "fn2_CloudwatchLogGroup_CEBA055E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/fn2/CloudwatchLogGroup",
            "uniqueId": "fn2_CloudwatchLogGroup_CEBA055E"
          }
        },
        "name": "/aws/lambda/fn2-c892a4c6",
        "retention_in_days": 30
      },
      "fn3_CloudwatchLogGroup_C39A85FE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/fn3/CloudwatchLogGroup",
            "uniqueId": "fn3_CloudwatchLogGroup_C39A85FE"
          }
        },
        "name": "/aws/lambda/fn3-c856234e",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "Function_IamRole_678BE84C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/IamRole",
            "uniqueId": "Function_IamRole_678BE84C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "fn2_IamRole_DE8D96D2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/fn2/IamRole",
            "uniqueId": "fn2_IamRole_DE8D96D2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "fn3_IamRole_B0C65815": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/fn3/IamRole",
            "uniqueId": "fn3_IamRole_B0C65815"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Function_IamRolePolicy_E3B26607": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/IamRolePolicy",
            "uniqueId": "Function_IamRolePolicy_E3B26607"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Function_IamRole_678BE84C.name}"
      },
      "fn2_IamRolePolicy_3FE5A930": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/fn2/IamRolePolicy",
            "uniqueId": "fn2_IamRolePolicy_3FE5A930"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.fn2_IamRole_DE8D96D2.name}"
      },
      "fn3_IamRolePolicy_AE0DB40A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/fn3/IamRolePolicy",
            "uniqueId": "fn3_IamRolePolicy_AE0DB40A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.fn3_IamRole_B0C65815.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Function_IamRolePolicyAttachment_CACE1358": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/IamRolePolicyAttachment",
            "uniqueId": "Function_IamRolePolicyAttachment_CACE1358"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Function_IamRole_678BE84C.name}"
      },
      "fn2_IamRolePolicyAttachment_FC7F59A6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/fn2/IamRolePolicyAttachment",
            "uniqueId": "fn2_IamRolePolicyAttachment_FC7F59A6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.fn2_IamRole_DE8D96D2.name}"
      },
      "fn3_IamRolePolicyAttachment_9C4A07E9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/fn3/IamRolePolicyAttachment",
            "uniqueId": "fn3_IamRolePolicyAttachment_9C4A07E9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.fn3_IamRole_B0C65815.name}"
      }
    },
    "aws_lambda_function": {
      "Function": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/Default",
            "uniqueId": "Function"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Function-c852aba6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Function-c852aba6",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Function_IamRole_678BE84C.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Function_S3Object_C62A0C2D.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "fn2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/fn2/Default",
            "uniqueId": "fn2"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "fn2-c892a4c6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "fn2-c892a4c6",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.fn2_IamRole_DE8D96D2.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.fn2_S3Object_FA91A9FB.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "fn3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/fn3/Default",
            "uniqueId": "fn3"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "fn3-c856234e",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "fn3-c856234e",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.fn3_IamRole_B0C65815.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.fn3_S3Object_4E99C117.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "Code": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "Code"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      }
    },
    "aws_s3_object": {
      "Function_S3Object_C62A0C2D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/S3Object",
            "uniqueId": "Function_S3Object_C62A0C2D"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "fn2_S3Object_FA91A9FB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/fn2/S3Object",
            "uniqueId": "fn2_S3Object_FA91A9FB"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "fn3_S3Object_4E99C117": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/fn3/S3Object",
            "uniqueId": "fn3_S3Object_4E99C117"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
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
    const expect = $stdlib.expect;
    const util = $stdlib.util;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
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
          "inc": [
          ],
          "get": [
          ],
          "$inflight_init": [
          ],
          "n": [
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
            [foo, ["inc"]],
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
            $foo: ${$stdlib.core.liftObject(foo)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [foo, ["inc"]],
          ],
          "$inflight_init": [
            [foo, []],
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
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.expect.Util") ?? expect.Util, "@winglang/sdk/expect", "Util"))},
            $fn: ${$stdlib.core.liftObject(fn)},
            $fn2: ${$stdlib.core.liftObject(fn2)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.expect.Util") ?? expect.Util, "@winglang/sdk/expect", "Util"), ["equal"]],
            [fn, ["invoke"]],
            [fn2, ["invoke"]],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.expect.Util") ?? expect.Util, "@winglang/sdk/expect", "Util"), []],
            [fn, []],
            [fn2, []],
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
            $foo: ${$stdlib.core.liftObject(foo)},
            $std_Duration: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.Duration") ?? std.Duration, "@winglang/sdk/std", "Duration"))},
            $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.util.Util") ?? util.Util, "@winglang/sdk/util", "Util"))},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.Duration") ?? std.Duration, "@winglang/sdk/std", "Duration"), ["fromSeconds"]],
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.util.Util") ?? util.Util, "@winglang/sdk/util", "Util"), ["sleep"]],
            [foo, [].concat(["inc"], ["get"])],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.Duration") ?? std.Duration, "@winglang/sdk/std", "Duration"), []],
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.util.Util") ?? util.Util, "@winglang/sdk/util", "Util"), []],
            [foo, []],
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure5-1.cjs")({
            $fn3: ${$stdlib.core.liftObject(fn3)},
            $std_Duration: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.Duration") ?? std.Duration, "@winglang/sdk/std", "Duration"))},
            $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.util.Util") ?? util.Util, "@winglang/sdk/util", "Util"))},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.Duration") ?? std.Duration, "@winglang/sdk/std", "Duration"), ["fromSeconds"]],
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.util.Util") ?? util.Util, "@winglang/sdk/util", "Util"), ["sleep"]],
            [fn3, [].concat(["invokeAsync"], ["invoke"])],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.Duration") ?? std.Duration, "@winglang/sdk/std", "Duration"), []],
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.util.Util") ?? util.Util, "@winglang/sdk/util", "Util"), []],
            [fn3, []],
          ],
        });
      }
    }
    const foo = new Foo(this, "Foo");
    const fn = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Function", cloud.Function, this, "Function", new $Closure1(this, "$Closure1"));
    const fn2 = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Function", cloud.Function, this, "fn2", new $Closure2(this, "$Closure2"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:single instance of Foo", new $Closure3(this, "$Closure3"));
    const fn3 = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Function", cloud.Function, this, "fn3", new $Closure4(this, "$Closure4"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:Foo state is not shared between function invocations", new $Closure5(this, "$Closure5"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight_handler_singleton.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

