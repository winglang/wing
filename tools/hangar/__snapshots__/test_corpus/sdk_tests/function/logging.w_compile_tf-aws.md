# [logging.w](../../../../../../examples/tests/sdk_tests/function/logging.w) | compile | tf-aws

## inflight.$Closure1-9984c212.js
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

## inflight.$Closure2-9984c212.js
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

## inflight.$Closure3-9984c212.js
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

## inflight.Util-9984c212.js
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
      "value": "[[\"root/Default/Default/test:logging\",\"${aws_lambda_function.testlogging_Handler_2002EF98.arn}\"]]"
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
      },
      "testlogging_Handler_IamRole_68ABF7AD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:logging/Handler/IamRole",
            "uniqueId": "testlogging_Handler_IamRole_68ABF7AD"
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
      },
      "testlogging_Handler_IamRolePolicy_8CFCB9C2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:logging/Handler/IamRolePolicy",
            "uniqueId": "testlogging_Handler_IamRolePolicy_8CFCB9C2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.f2.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testlogging_Handler_IamRole_68ABF7AD.name}"
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
      "testlogging_Handler_IamRolePolicyAttachment_9E5DEC2E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:logging/Handler/IamRolePolicyAttachment",
            "uniqueId": "testlogging_Handler_IamRolePolicyAttachment_9E5DEC2E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testlogging_Handler_IamRole_68ABF7AD.name}"
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
      },
      "testlogging_Handler_2002EF98": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:logging/Handler/Default",
            "uniqueId": "testlogging_Handler_2002EF98"
          }
        },
        "environment": {
          "variables": {
            "FUNCTION_NAME_0300817a": "${aws_lambda_function.f2.arn}",
            "WING_FUNCTION_NAME": "Handler-c886ec8e",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c886ec8e",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testlogging_Handler_IamRole_68ABF7AD.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testlogging_Handler_S3Object_335C77BA.key}",
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
      },
      "testlogging_Handler_S3Object_335C77BA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:logging/Handler/S3Object",
            "uniqueId": "testlogging_Handler_S3Object_335C77BA"
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
        this._addInflightOps("logging", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Util-9984c212.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const UtilClient = ${Util._toInflightType(this).text};
            const client = new UtilClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1-9984c212.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this).text};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2-9984c212.js")({
            $f1: ${context._lift(f1)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this).text};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
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
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure3-9984c212.js")({
            $Util: ${context._lift(Util)},
            $f2: ${context._lift(f2)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this).text};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
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
new $App({ outdir: $outdir, name: "logging", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

