# [logging.test.w](../../../../../../examples/tests/sdk_tests/function/logging.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(input) {
      {console.log("log inside f1")};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({ $f1 }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(input) {
      (await $f1.invoke(""));
      {console.log("log inside f2")};
      (await $f1.invoke(""));
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
module.exports = function({ $Util, $f2 }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $Util.logging());
      (await $f2.invoke(""));
      (await $Util.logging());
      (await $f2.invoke(""));
    }
  }
  return $Closure3;
}

```

## inflight.Util-1.js
```js
module.exports = function({  }) {
  class Util {
    constructor({  }) {
    }
    static async logging() {
      return (require("<ABSOLUTE_PATH>/logging.js")["logging"])()
    }
  }
  return Util;
}

```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.17.0"
    },
    "outputs": {
      "root": {
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
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
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.f1_IamRole_FD68C58F.name}"
      },
      "f2_IamRolePolicy_4B68F2E2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f2/IamRolePolicy",
            "uniqueId": "f2_IamRolePolicy_4B68F2E2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.f1.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.f2_IamRole_B66911B2.name}"
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
            "WING_FUNCTION_NAME": "f1-c8545025",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "f1-c8545025",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.f1_IamRole_FD68C58F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.f1_S3Object_9A84AD47.key}",
        "timeout": 30,
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
            "FUNCTION_NAME_09b8c606": "${aws_lambda_function.f1.arn}",
            "WING_FUNCTION_NAME": "f2-c812cd39",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "f2-c812cd39",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.f2_IamRole_B66911B2.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.f2_S3Object_ABE842D7.key}",
        "timeout": 30,
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
      }
    }
  }
}
```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Util extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Util-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const UtilClient = ${Util._toInflightType(this)};
            const client = new UtilClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["logging", "$inflight_init"];
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $f1: ${context._lift(f1)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this)};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(f1, host, ["invoke"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
            $Util: ${context._lift(Util)},
            $f2: ${context._lift(f2)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this)};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerBindObject(Util, host, ["logging"]);
          $Closure3._registerBindObject(f2, host, ["invoke"]);
        }
        super._registerBind(host, ops);
      }
    }
    const f1 = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"f1",new $Closure1(this,"$Closure1"));
    const f2 = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"f2",new $Closure2(this,"$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:logging",new $Closure3(this,"$Closure3"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "logging.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

