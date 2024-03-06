# [inflight_handler_singleton.test.w](../../../../../examples/tests/valid/inflight_handler_singleton.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $foo }) {
  class $Closure1 {
    constructor({  }) {
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
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.$Closure2-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $foo }) {
  class $Closure2 {
    constructor({  }) {
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
//# sourceMappingURL=inflight.$Closure2-1.js.map
```

## inflight.$Closure3-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $expect_Util, $fn, $fn2 }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const x = (await $fn.invoke(""));
      const y = (await $fn.invoke(""));
      const z = (await $fn2.invoke(""));
      (await $expect_Util.equal(x, "100"));
      (await $expect_Util.equal(z, "100-fn2"));
      $helpers.assert(($helpers.eq(y, "100") || $helpers.eq(y, "101")), "y == \"100\" || y == \"101\"");
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.js.map
```

## inflight.$Closure4-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $foo, $std_Duration, $util_Util }) {
  class $Closure4 {
    constructor({  }) {
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
//# sourceMappingURL=inflight.$Closure4-1.js.map
```

## inflight.$Closure5-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $incAndCheck, $std_Duration, $util_Util }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $incAndCheck.invokeAsync());
      (await $util_Util.sleep((await $std_Duration.fromSeconds(1))));
      (await $incAndCheck.invoke());
    }
  }
  return $Closure5;
}
//# sourceMappingURL=inflight.$Closure5-1.js.map
```

## inflight.Foo-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
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
//# sourceMappingURL=inflight.Foo-1.js.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
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
      "cloudFunction_CloudwatchLogGroup_7399B890": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/CloudwatchLogGroup",
            "uniqueId": "cloudFunction_CloudwatchLogGroup_7399B890"
          }
        },
        "name": "/aws/lambda/cloud-Function-c8d2eca1",
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
      "incAndCheck_CloudwatchLogGroup_01665AEE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/incAndCheck/CloudwatchLogGroup",
            "uniqueId": "incAndCheck_CloudwatchLogGroup_01665AEE"
          }
        },
        "name": "/aws/lambda/incAndCheck-c8164d4e",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudFunction_IamRole_5A4430DC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRole",
            "uniqueId": "cloudFunction_IamRole_5A4430DC"
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
      "incAndCheck_IamRole_67B3672C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/incAndCheck/IamRole",
            "uniqueId": "incAndCheck_IamRole_67B3672C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudFunction_IamRolePolicy_618BF987": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicy",
            "uniqueId": "cloudFunction_IamRolePolicy_618BF987"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.name}"
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
      "incAndCheck_IamRolePolicy_6D4DA8EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/incAndCheck/IamRolePolicy",
            "uniqueId": "incAndCheck_IamRolePolicy_6D4DA8EC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.incAndCheck_IamRole_67B3672C.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudFunction_IamRolePolicyAttachment_288B9653": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "cloudFunction_IamRolePolicyAttachment_288B9653"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.name}"
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
      "incAndCheck_IamRolePolicyAttachment_D8077C87": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/incAndCheck/IamRolePolicyAttachment",
            "uniqueId": "incAndCheck_IamRolePolicyAttachment_D8077C87"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.incAndCheck_IamRole_67B3672C.name}"
      }
    },
    "aws_lambda_function": {
      "cloudFunction": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/Default",
            "uniqueId": "cloudFunction"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Function-c8d2eca1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8d2eca1",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudFunction_S3Object_71908BAD.key}",
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
      "incAndCheck": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/incAndCheck/Default",
            "uniqueId": "incAndCheck"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "incAndCheck-c8164d4e",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "incAndCheck-c8164d4e",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.incAndCheck_IamRole_67B3672C.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.incAndCheck_S3Object_C6E37371.key}",
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
      "cloudFunction_S3Object_71908BAD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/S3Object",
            "uniqueId": "cloudFunction_S3Object_71908BAD"
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
      "incAndCheck_S3Object_C6E37371": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/incAndCheck/S3Object",
            "uniqueId": "incAndCheck_S3Object_C6E37371"
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

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
const expect = $stdlib.expect;
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooClient = ${Foo._toInflightType()};
            const client = new FooClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.js")({
            $foo: ${$stdlib.core.liftObject(foo)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType()};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.js")({
            $foo: ${$stdlib.core.liftObject(foo)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType()};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-1.js")({
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $fn: ${$stdlib.core.liftObject(fn)},
            $fn2: ${$stdlib.core.liftObject(fn2)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType()};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [fn, ["invoke"]],
            [fn2, ["invoke"]],
          ],
          "$inflight_init": [
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-1.js")({
            $foo: ${$stdlib.core.liftObject(foo)},
            $std_Duration: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Duration, "@winglang/sdk/std", "Duration"))},
            $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType()};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [foo, ["get", "inc"]],
          ],
          "$inflight_init": [
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure5-1.js")({
            $incAndCheck: ${$stdlib.core.liftObject(incAndCheck)},
            $std_Duration: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Duration, "@winglang/sdk/std", "Duration"))},
            $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure5Client = ${$Closure5._toInflightType()};
            const client = new $Closure5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [incAndCheck, ["invoke", "invokeAsync"]],
          ],
          "$inflight_init": [
            [incAndCheck, []],
          ],
        });
      }
    }
    const foo = new Foo(this, "Foo");
    const fn = this.node.root.new("@winglang/sdk.cloud.Function", cloud.Function, this, "cloud.Function", new $Closure1(this, "$Closure1"));
    const fn2 = this.node.root.new("@winglang/sdk.cloud.Function", cloud.Function, this, "fn2", new $Closure2(this, "$Closure2"));
    const sim = $helpers.eq((util.Util.env("WING_TARGET")), "sim");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:single instance of Foo", new $Closure3(this, "$Closure3"));
    const incAndCheck = this.node.root.new("@winglang/sdk.cloud.Function", cloud.Function, this, "incAndCheck", new $Closure4(this, "$Closure4"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:Foo state is not shared between concurrent function invocations", new $Closure5(this, "$Closure5"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight_handler_singleton.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

