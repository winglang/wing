# [bring_local.test.w](../../../../../examples/tests/valid/bring_local.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
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
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.$Closure1-3.js
```js
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
//# sourceMappingURL=inflight.$Closure1-3.js.map
```

## inflight.Q-2.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Q {
    constructor({  }) {
    }
    static async greet(name) {
      return (require("../../../subdir/util.js")["greet"])(name)
    }
  }
  return Q;
}
//# sourceMappingURL=inflight.Q-2.js.map
```

## inflight.Store-1.js
```js
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
//# sourceMappingURL=inflight.Store-1.js.map
```

## inflight.Triangle-3.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Triangle {
    constructor({  }) {
    }
  }
  return Triangle;
}
//# sourceMappingURL=inflight.Triangle-3.js.map
```

## inflight.Util-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Util {
    constructor({  }) {
    }
  }
  return Util;
}
//# sourceMappingURL=inflight.Util-1.js.map
```

## inflight.Util-3.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Util {
    constructor({  }) {
    }
  }
  return Util;
}
//# sourceMappingURL=inflight.Util-3.js.map
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
  "data": {
    "aws_lambda_invocation": {
      "file1Store_cloudOnDeploy_Invocation_0E6A2A64": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/file1.Store/cloud.OnDeploy/Invocation",
            "uniqueId": "file1Store_cloudOnDeploy_Invocation_0E6A2A64"
          }
        },
        "depends_on": [],
        "function_name": "${aws_lambda_function.file1Store_cloudOnDeploy_Function_9539541F.function_name}",
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
      "file1Store_cloudOnDeploy_Function_CloudwatchLogGroup_624FDE3C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/file1.Store/cloud.OnDeploy/Function/CloudwatchLogGroup",
            "uniqueId": "file1Store_cloudOnDeploy_Function_CloudwatchLogGroup_624FDE3C"
          }
        },
        "name": "/aws/lambda/Function-c8b7b48c",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "file1Store_cloudOnDeploy_Function_IamRole_233573CC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/file1.Store/cloud.OnDeploy/Function/IamRole",
            "uniqueId": "file1Store_cloudOnDeploy_Function_IamRole_233573CC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "file1Store_cloudOnDeploy_Function_IamRolePolicy_8C128884": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/file1.Store/cloud.OnDeploy/Function/IamRolePolicy",
            "uniqueId": "file1Store_cloudOnDeploy_Function_IamRolePolicy_8C128884"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.file1Store_cloudBucket_86CE87B1.arn}\",\"${aws_s3_bucket.file1Store_cloudBucket_86CE87B1.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.file1Store_cloudOnDeploy_Function_IamRole_233573CC.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "file1Store_cloudOnDeploy_Function_IamRolePolicyAttachment_20F1BD40": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/file1.Store/cloud.OnDeploy/Function/IamRolePolicyAttachment",
            "uniqueId": "file1Store_cloudOnDeploy_Function_IamRolePolicyAttachment_20F1BD40"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.file1Store_cloudOnDeploy_Function_IamRole_233573CC.name}"
      }
    },
    "aws_lambda_function": {
      "file1Store_cloudOnDeploy_Function_9539541F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/file1.Store/cloud.OnDeploy/Function/Default",
            "uniqueId": "file1Store_cloudOnDeploy_Function_9539541F"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_94dc4b3e": "${aws_s3_bucket.file1Store_cloudBucket_86CE87B1.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Function-c8b7b48c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Function-c8b7b48c",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.file1Store_cloudOnDeploy_Function_IamRole_233573CC.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.file1Store_cloudOnDeploy_Function_S3Object_CBBF816B.key}",
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
      "file1Store_cloudBucket_86CE87B1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/file1.Store/cloud.Bucket/Default",
            "uniqueId": "file1Store_cloudBucket_86CE87B1"
          }
        },
        "bucket_prefix": "cloud-bucket-c8b6ef02-",
        "force_destroy": false
      }
    },
    "aws_s3_object": {
      "file1Store_cloudOnDeploy_Function_S3Object_CBBF816B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/file1.Store/cloud.OnDeploy/Function/S3Object",
            "uniqueId": "file1Store_cloudOnDeploy_Function_S3Object_CBBF816B"
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

## preflight.empty-1.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
module.exports = {  };
//# sourceMappingURL=preflight.empty-1.js.map
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
const file1 = require("./preflight.store-2.js");
const file2 = require("./preflight.subfile-3.js");
const file3 = require("./preflight.empty-1.js");
const math = $stdlib.math;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-3.js")({
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
          require("${$helpers.normalPath(__dirname)}/inflight.Triangle-3.js")({
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
          require("${$helpers.normalPath(__dirname)}/inflight.Util-3.js")({
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
    const store = new file1.Store(this, "file1.Store");
    const q = new file2.Q(this, "file2.Q");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:add data to store", new $Closure1(this, "$Closure1"));
    const s = ({"x": 1, "y": 2});
    const c = file1.Color.BLUE;
    $helpers.assert($helpers.neq(c, file1.Color.RED), "c != file1.Color.RED");
    const t = new Triangle(this, "Triangle");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "bring_local.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

## preflight.store-2.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const file3 = require("./preflight.empty-1.js");
const math = $stdlib.math;
const cloud = $stdlib.cloud;
const Color =
  (function (tmp) {
    tmp[tmp["RED"] = 0] = ",RED";
    tmp[tmp["GREEN"] = 1] = ",GREEN";
    tmp[tmp["BLUE"] = 2] = ",BLUE";
    return tmp;
  })({})
;
class Util extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Util-1.js")({
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
    this.b = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
    const __parent_this_1 = this;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.js")({
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
          ],
        });
      }
    }
    const prefill = this.node.root.new("@winglang/sdk.cloud.OnDeploy", cloud.OnDeploy, this, "cloud.OnDeploy", new $Closure1(this, "$Closure1"));
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Store-1.js")({
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
module.exports = { Util, Store, Color };
//# sourceMappingURL=preflight.store-2.js.map
```

## preflight.subfile-3.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const math = $stdlib.math;
class Q extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Q-2.js")({
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
module.exports = { Q };
//# sourceMappingURL=preflight.subfile-3.js.map
```

