# [lift_inflight_closure_collection.test.w](../../../../../examples/tests/valid/lift_inflight_closure_collection.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $b1 }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq((await $b1.get("k")), "v1"), "b1.get(\"k\") == \"v1\"");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.$Closure10-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $f4 }) {
  class $Closure10 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $f4.invoke());
    }
  }
  return $Closure10;
}
//# sourceMappingURL=inflight.$Closure10-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $b2 }) {
  class $Closure2 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq((await $b2.get("k")), "v2"), "b2.get(\"k\") == \"v2\"");
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
module.exports = function({ $ar }) {
  class $Closure3 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      for (const c of $ar) {
        (await c());
      }
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
module.exports = function({ $f1 }) {
  class $Closure4 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $f1.invoke());
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
module.exports = function({ $map }) {
  class $Closure5 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      for (const c of $macros.__Map_values(false, $map, )) {
        (await c());
      }
    }
  }
  return $Closure5;
}
//# sourceMappingURL=inflight.$Closure5-1.cjs.map
```

## inflight.$Closure6-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $f2 }) {
  class $Closure6 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $f2.invoke());
    }
  }
  return $Closure6;
}
//# sourceMappingURL=inflight.$Closure6-1.cjs.map
```

## inflight.$Closure7-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $set }) {
  class $Closure7 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      for (const c of $set) {
        (await c());
      }
    }
  }
  return $Closure7;
}
//# sourceMappingURL=inflight.$Closure7-1.cjs.map
```

## inflight.$Closure8-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $f3 }) {
  class $Closure8 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $f3.invoke());
    }
  }
  return $Closure8;
}
//# sourceMappingURL=inflight.$Closure8-1.cjs.map
```

## inflight.$Closure9-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $complex }) {
  class $Closure9 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const i = 0;
      const k = "k1";
      for (const c of $macros.__Map_get(false, $macros.__Array_at(false, $complex, i), k)) {
        (await c());
      }
    }
  }
  return $Closure9;
}
//# sourceMappingURL=inflight.$Closure9-1.cjs.map
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
      "f1_CloudwatchLogGroup_9EB92E4A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f1/CloudwatchLogGroup",
            "uniqueId": "f1_CloudwatchLogGroup_9EB92E4A"
          }
        },
        "name": "/aws/lambda/f1-c8545025",
        "retention_in_days": 30
      },
      "f2_CloudwatchLogGroup_D231AE41": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f2/CloudwatchLogGroup",
            "uniqueId": "f2_CloudwatchLogGroup_D231AE41"
          }
        },
        "name": "/aws/lambda/f2-c812cd39",
        "retention_in_days": 30
      },
      "f3_CloudwatchLogGroup_6427B63E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f3/CloudwatchLogGroup",
            "uniqueId": "f3_CloudwatchLogGroup_6427B63E"
          }
        },
        "name": "/aws/lambda/f3-c8555a7c",
        "retention_in_days": 30
      },
      "f4_CloudwatchLogGroup_666851B0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f4/CloudwatchLogGroup",
            "uniqueId": "f4_CloudwatchLogGroup_666851B0"
          }
        },
        "name": "/aws/lambda/f4-c8745b6f",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "f1_IamRole_FD68C58F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f1/IamRole",
            "uniqueId": "f1_IamRole_FD68C58F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "f2_IamRole_B66911B2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f2/IamRole",
            "uniqueId": "f2_IamRole_B66911B2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "f3_IamRole_72675FA1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f3/IamRole",
            "uniqueId": "f3_IamRole_72675FA1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "f4_IamRole_E4904831": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f4/IamRole",
            "uniqueId": "f4_IamRole_E4904831"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "f1_IamRolePolicy_DAEEDBF2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f1/IamRolePolicy",
            "uniqueId": "f1_IamRolePolicy_DAEEDBF2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.b1.arn}\",\"${aws_s3_bucket.b1.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.b2.arn}\",\"${aws_s3_bucket.b2.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.f1_IamRole_FD68C58F.name}"
      },
      "f2_IamRolePolicy_4B68F2E2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f2/IamRolePolicy",
            "uniqueId": "f2_IamRolePolicy_4B68F2E2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.b1.arn}\",\"${aws_s3_bucket.b1.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.b2.arn}\",\"${aws_s3_bucket.b2.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.f2_IamRole_B66911B2.name}"
      },
      "f3_IamRolePolicy_92FF1F39": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f3/IamRolePolicy",
            "uniqueId": "f3_IamRolePolicy_92FF1F39"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.b1.arn}\",\"${aws_s3_bucket.b1.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.b2.arn}\",\"${aws_s3_bucket.b2.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.f3_IamRole_72675FA1.name}"
      },
      "f4_IamRolePolicy_089B6AE7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f4/IamRolePolicy",
            "uniqueId": "f4_IamRolePolicy_089B6AE7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.b1.arn}\",\"${aws_s3_bucket.b1.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.b2.arn}\",\"${aws_s3_bucket.b2.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.f4_IamRole_E4904831.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "f1_IamRolePolicyAttachment_39B6759B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f1/IamRolePolicyAttachment",
            "uniqueId": "f1_IamRolePolicyAttachment_39B6759B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.f1_IamRole_FD68C58F.name}"
      },
      "f2_IamRolePolicyAttachment_E65452F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f2/IamRolePolicyAttachment",
            "uniqueId": "f2_IamRolePolicyAttachment_E65452F9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.f2_IamRole_B66911B2.name}"
      },
      "f3_IamRolePolicyAttachment_1D6B7824": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f3/IamRolePolicyAttachment",
            "uniqueId": "f3_IamRolePolicyAttachment_1D6B7824"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.f3_IamRole_72675FA1.name}"
      },
      "f4_IamRolePolicyAttachment_B486D2A0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f4/IamRolePolicyAttachment",
            "uniqueId": "f4_IamRolePolicyAttachment_B486D2A0"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.f4_IamRole_E4904831.name}"
      }
    },
    "aws_lambda_function": {
      "f1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f1/Default",
            "uniqueId": "f1"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_12a95bb8": "${aws_s3_bucket.b1.bucket}",
            "BUCKET_NAME_fa6445bb": "${aws_s3_bucket.b2.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "f1-c8545025",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "f1-c8545025",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.f1_IamRole_FD68C58F.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.f1_S3Object_9A84AD47.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "f2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f2/Default",
            "uniqueId": "f2"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_12a95bb8": "${aws_s3_bucket.b1.bucket}",
            "BUCKET_NAME_fa6445bb": "${aws_s3_bucket.b2.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "f2-c812cd39",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "f2-c812cd39",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.f2_IamRole_B66911B2.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.f2_S3Object_ABE842D7.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "f3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f3/Default",
            "uniqueId": "f3"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_12a95bb8": "${aws_s3_bucket.b1.bucket}",
            "BUCKET_NAME_fa6445bb": "${aws_s3_bucket.b2.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "f3-c8555a7c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "f3-c8555a7c",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.f3_IamRole_72675FA1.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.f3_S3Object_ED65218A.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "f4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f4/Default",
            "uniqueId": "f4"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_12a95bb8": "${aws_s3_bucket.b1.bucket}",
            "BUCKET_NAME_fa6445bb": "${aws_s3_bucket.b2.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "f4-c8745b6f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "f4-c8745b6f",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.f4_IamRole_E4904831.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.f4_S3Object_E76D3595.key}",
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
        "content": "v1",
        "key": "k"
      },
      "b2_S3Object-k_9106862E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b2/S3Object-k",
            "uniqueId": "b2_S3Object-k_9106862E"
          }
        },
        "bucket": "${aws_s3_bucket.b2.bucket}",
        "content": "v2",
        "key": "k"
      },
      "f1_S3Object_9A84AD47": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f1/S3Object",
            "uniqueId": "f1_S3Object_9A84AD47"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "f2_S3Object_ABE842D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f2/S3Object",
            "uniqueId": "f2_S3Object_ABE842D7"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "f3_S3Object_ED65218A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f3/S3Object",
            "uniqueId": "f3_S3Object_ED65218A"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "f4_S3Object_E76D3595": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f4/S3Object",
            "uniqueId": "f4_S3Object_E76D3595"
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
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const cloud = $stdlib.cloud;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $b1: ${$stdlib.core.liftObject(b1)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [b1, ["get"]],
          ],
          "$inflight_init": [
            [b1, []],
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
            $b2: ${$stdlib.core.liftObject(b2)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [b2, ["get"]],
          ],
          "$inflight_init": [
            [b2, []],
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
            $ar: ${$stdlib.core.liftObject(ar)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [ar, []],
          ],
          "$inflight_init": [
            [ar, []],
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
            $f1: ${$stdlib.core.liftObject(f1)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [f1, ["invoke"]],
          ],
          "$inflight_init": [
            [f1, []],
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
            $map: ${$stdlib.core.liftObject(map)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [map, ["values"]],
          ],
          "$inflight_init": [
            [map, []],
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure6-1.cjs")({
            $f2: ${$stdlib.core.liftObject(f2)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [f2, ["invoke"]],
          ],
          "$inflight_init": [
            [f2, []],
          ],
        });
      }
    }
    class $Closure7 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure7-1.cjs")({
            $set: ${$stdlib.core.liftObject(set)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [set, []],
          ],
          "$inflight_init": [
            [set, []],
          ],
        });
      }
    }
    class $Closure8 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure8-1.cjs")({
            $f3: ${$stdlib.core.liftObject(f3)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [f3, ["invoke"]],
          ],
          "$inflight_init": [
            [f3, []],
          ],
        });
      }
    }
    class $Closure9 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure9-1.cjs")({
            $complex: ${$stdlib.core.liftObject(complex)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [complex, ["at"]],
          ],
          "$inflight_init": [
            [complex, []],
          ],
        });
      }
    }
    class $Closure10 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure10-1.cjs")({
            $f4: ${$stdlib.core.liftObject(f4)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [f4, ["invoke"]],
          ],
          "$inflight_init": [
            [f4, []],
          ],
        });
      }
    }
    const b1 = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "b1");
    (b1.addObject("k", "v1"));
    const b2 = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "b2");
    (b2.addObject("k", "v2"));
    const c1 = new $Closure1(this, "$Closure1");
    const c2 = new $Closure2(this, "$Closure2");
    const ar = [c1, c2];
    const f1 = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Function", cloud.Function, this, "f1", new $Closure3(this, "$Closure3"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:lift closure array", new $Closure4(this, "$Closure4"));
    const map = ({["k1"]: c1, ["k2"]: c2});
    const f2 = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Function", cloud.Function, this, "f2", new $Closure5(this, "$Closure5"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:lift closure map", new $Closure6(this, "$Closure6"));
    const set = new Set([c1, c2]);
    const f3 = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Function", cloud.Function, this, "f3", new $Closure7(this, "$Closure7"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:lift closure set", new $Closure8(this, "$Closure8"));
    const complex = [({["k1"]: new Set([c1, c2])})];
    const f4 = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Function", cloud.Function, this, "f4", new $Closure9(this, "$Closure9"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:lift closure in complex collection", new $Closure10(this, "$Closure10"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "lift_inflight_closure_collection.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

