# [bring_local.test.w](../../../../../examples/tests/valid/bring_local.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $__parent_this_1_b }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $__parent_this_1_b.put("data.txt", "<empty>"));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.$Closure1-3.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $store }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $store.store("foo"));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-3.cjs.map
```

## inflight.$Closure2-3.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $expect_Util, $file2_Q }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $expect_Util.equal((await $file2_Q.greet("bar")), "Hello bar"));
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-3.cjs.map
```

## inflight.Q-2.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Q {
    constructor({  }) {
    }
    static async greet(name) {
      return (require("../../../subdir/util.ts")["greet"])(name)
    }
  }
  return Q;
}
//# sourceMappingURL=inflight.Q-2.cjs.map
```

## inflight.Store-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Store {
    constructor({ $this_b }) {
      this.$this_b = $this_b;
    }
    async store(data) {
      (await this.$this_b.put("data.txt", data));
    }
  }
  return Store;
}
//# sourceMappingURL=inflight.Store-1.cjs.map
```

## inflight.Triangle-3.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Triangle {
    constructor({  }) {
    }
  }
  return Triangle;
}
//# sourceMappingURL=inflight.Triangle-3.cjs.map
```

## inflight.Util-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Util {
    constructor({  }) {
    }
  }
  return Util;
}
//# sourceMappingURL=inflight.Util-1.cjs.map
```

## inflight.Util-3.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Util {
    constructor({  }) {
    }
  }
  return Util;
}
//# sourceMappingURL=inflight.Util-3.cjs.map
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
  "data": {
    "aws_lambda_invocation": {
      "Store_OnDeploy_Invocation_E9660D82": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Store/OnDeploy/Invocation",
            "uniqueId": "Store_OnDeploy_Invocation_E9660D82"
          }
        },
        "depends_on": [],
        "function_name": "${aws_lambda_function.Store_OnDeploy_Function_6D11EEE6.function_name}",
        "input": "{}"
      }
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudwatch_log_group": {
      "Store_OnDeploy_Function_CloudwatchLogGroup_74529587": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Store/OnDeploy/Function/CloudwatchLogGroup",
            "uniqueId": "Store_OnDeploy_Function_CloudwatchLogGroup_74529587"
          }
        },
        "name": "/aws/lambda/Function-c81a83fe",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "Store_OnDeploy_Function_IamRole_CD090388": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Store/OnDeploy/Function/IamRole",
            "uniqueId": "Store_OnDeploy_Function_IamRole_CD090388"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Store_OnDeploy_Function_IamRolePolicy_C32885AE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Store/OnDeploy/Function/IamRolePolicy",
            "uniqueId": "Store_OnDeploy_Function_IamRolePolicy_C32885AE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.Store_Bucket_42A4CEFB.arn}\",\"${aws_s3_bucket.Store_Bucket_42A4CEFB.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Store_OnDeploy_Function_IamRole_CD090388.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Store_OnDeploy_Function_IamRolePolicyAttachment_0AFCF1E8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Store/OnDeploy/Function/IamRolePolicyAttachment",
            "uniqueId": "Store_OnDeploy_Function_IamRolePolicyAttachment_0AFCF1E8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Store_OnDeploy_Function_IamRole_CD090388.name}"
      }
    },
    "aws_lambda_function": {
      "Store_OnDeploy_Function_6D11EEE6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Store/OnDeploy/Function/Default",
            "uniqueId": "Store_OnDeploy_Function_6D11EEE6"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_af11ee62": "${aws_s3_bucket.Store_Bucket_42A4CEFB.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Function-c81a83fe",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Function-c81a83fe",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Store_OnDeploy_Function_IamRole_CD090388.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Store_OnDeploy_Function_S3Object_95484A56.key}",
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
      },
      "Store_Bucket_42A4CEFB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Store/Bucket/Default",
            "uniqueId": "Store_Bucket_42A4CEFB"
          }
        },
        "bucket_prefix": "bucket-c843dbb0-",
        "force_destroy": false
      }
    },
    "aws_s3_object": {
      "Store_OnDeploy_Function_S3Object_95484A56": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Store/OnDeploy/Function/S3Object",
            "uniqueId": "Store_OnDeploy_Function_S3Object_95484A56"
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
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
if (globalThis.$ClassFactory !== undefined) { throw new Error("$ClassFactory already defined"); }
globalThis.$ClassFactory = $PlatformManager.createClassFactory();
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const file1 = $helpers.bringJs(`${__dirname}/preflight.store-2.cjs`, $preflightTypesMap);
    const file2 = $helpers.bringJs(`${__dirname}/preflight.subfile-3.cjs`, $preflightTypesMap);
    const file3 = $helpers.bringJs(`${__dirname}/preflight.empty-1.cjs`, $preflightTypesMap);
    const math = $stdlib.math;
    const expect = $stdlib.expect;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-3.cjs")({
            $store: ${$stdlib.core.liftObject(store)},
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
            [store, ["store"]],
          ],
          "$inflight_init": [
            [store, []],
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-3.cjs")({
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $file2_Q: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(file2.Q, "", "Q"))},
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
            [$stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"), ["equal"]],
            [$stdlib.core.toLiftableModuleType(file2.Q, "", "Q"), ["greet"]],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"), []],
            [$stdlib.core.toLiftableModuleType(file2.Q, "", "Q"), []],
          ],
        });
      }
    }
    class Triangle extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      area() {
        return 1;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Triangle-3.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const TriangleClient = ${Triangle._toInflightType()};
            const client = new TriangleClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    class Util extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Util-3.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const UtilClient = ${Util._toInflightType()};
            const client = new UtilClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    const store = new file1.Store(this, "Store");
    const q = new file2.Q(this, "Q");
    (expect.Util.equal((file2.Q.preflightGreet("foo")), "Hello foo"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:add data to store", new $Closure1(this, "$Closure1"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:greet", new $Closure2(this, "$Closure2"));
    const s = ({"x": 1, "y": 2});
    const c = file1.Color.BLUE;
    $helpers.assert($helpers.neq(c, file1.Color.RED), "c != file1.Color.RED");
    const t = new Triangle(this, "Triangle");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "bring_local.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'], classFactory: globalThis.$ClassFactory });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

## preflight.empty-1.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
let $preflightTypesMap = {};
module.exports = { $preflightTypesMap,  };
//# sourceMappingURL=preflight.empty-1.cjs.map
```

## preflight.store-2.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
let $preflightTypesMap = {};
const file3 = $helpers.bringJs(`${__dirname}/preflight.empty-1.cjs`, $preflightTypesMap);
const math = $stdlib.math;
const cloud = $stdlib.cloud;
const Color =
  (function (tmp) {
    tmp["RED"] = "RED";
    tmp["GREEN"] = "GREEN";
    tmp["BLUE"] = "BLUE";
    return tmp;
  })({})
;
class Util extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Util-1.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const UtilClient = ${Util._toInflightType()};
        const client = new UtilClient({
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return ({
      "$inflight_init": [
      ],
    });
  }
}
class Store extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
    this.b = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
    const __parent_this_1 = this;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $__parent_this_1_b: ${$stdlib.core.liftObject(__parent_this_1.b)},
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
            [__parent_this_1.b, ["put"]],
          ],
          "$inflight_init": [
            [__parent_this_1.b, []],
          ],
        });
      }
    }
    const prefill = globalThis.$ClassFactory.new("@winglang/sdk.cloud.OnDeploy", cloud.OnDeploy, this, "OnDeploy", new $Closure1(this, "$Closure1"));
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Store-1.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const StoreClient = ${Store._toInflightType()};
        const client = new StoreClient({
          $this_b: ${$stdlib.core.liftObject(this.b)},
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return ({
      "store": [
        [this.b, ["put"]],
      ],
      "$inflight_init": [
        [this.b, []],
      ],
    });
  }
}
module.exports = { $preflightTypesMap, Util, Store, Color };
//# sourceMappingURL=preflight.store-2.cjs.map
```

## preflight.subfile-3.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
let $preflightTypesMap = {};
const math = $stdlib.math;
class Q extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static preflightGreet(name) {
    return ($extern("../../../subdir/util.ts")["preflightGreet"])(name)
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Q-2.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const QClient = ${Q._toInflightType()};
        const client = new QClient({
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return ({
      "$inflight_init": [
      ],
    });
  }
  static get _liftTypeMap() {
    return ({
      "greet": [
      ],
    });
  }
}
module.exports = { $preflightTypesMap, Q };
//# sourceMappingURL=preflight.subfile-3.cjs.map
```

