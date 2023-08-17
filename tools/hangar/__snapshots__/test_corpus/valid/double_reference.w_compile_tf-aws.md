# [double_reference.w](../../../../../examples/tests/valid/double_reference.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $bar, $bar_foo, $initCount }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $bar.callFoo());
      (await $bar_foo.method());
      {((cond) => {if (!cond) throw new Error("assertion failed: initCount.peek() == /*1*/ 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $initCount.peek()),2)))};
    }
  }
  return $Closure1;
}

```

## inflight.Bar-1.js
```js
module.exports = function({  }) {
  class Bar {
    constructor({ $this_foo }) {
      this.$this_foo = $this_foo;
    }
    async callFoo() {
      (await this.$this_foo.method());
    }
  }
  return Bar;
}

```

## inflight.Foo-1.js
```js
module.exports = function({ $initCount }) {
  class Foo {
    constructor({  }) {
    }
    async method() {
    }
    async $inflight_init() {
      (await $initCount.inc());
    }
  }
  return Foo;
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
      "value": "[[\"root/Default/Default/test:hello\",\"${aws_lambda_function.testhello_Handler_549C38EE.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "cloudCounter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "cloudCounter"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-cloud.Counter-c866f225"
      }
    },
    "aws_iam_role": {
      "testhello_Handler_IamRole_84258FE3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:hello/Handler/IamRole",
            "uniqueId": "testhello_Handler_IamRole_84258FE3"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testhello_Handler_IamRolePolicy_152A5EC1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:hello/Handler/IamRolePolicy",
            "uniqueId": "testhello_Handler_IamRolePolicy_152A5EC1"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testhello_Handler_IamRole_84258FE3.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testhello_Handler_IamRolePolicyAttachment_7372FC74": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:hello/Handler/IamRolePolicyAttachment",
            "uniqueId": "testhello_Handler_IamRolePolicyAttachment_7372FC74"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testhello_Handler_IamRole_84258FE3.name}"
      }
    },
    "aws_lambda_function": {
      "testhello_Handler_549C38EE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:hello/Handler/Default",
            "uniqueId": "testhello_Handler_549C38EE"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "Handler-c85df1b4",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c85df1b4",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testhello_Handler_IamRole_84258FE3.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testhello_Handler_S3Object_CD1BAB13.key}",
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
      "testhello_Handler_S3Object_CD1BAB13": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:hello/Handler/S3Object",
            "uniqueId": "testhello_Handler_S3Object_CD1BAB13"
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
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("method", "$inflight_init");
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Foo-1.js")({
            $initCount: ${context._lift(initCount)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this)};
            const client = new FooClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Foo._registerBindObject(initCount, host, ["inc"]);
        }
        super._registerBind(host, ops);
      }
    }
    class Bar extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("callFoo", "$inflight_init");
        this.foo = new Foo(this,"Foo");
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Bar-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BarClient = ${Bar._toInflightType(this)};
            const client = new BarClient({
              $this_foo: ${this._lift(this.foo)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Bar._registerBindObject(this.foo, host, []);
        }
        if (ops.includes("callFoo")) {
          Bar._registerBindObject(this.foo, host, ["method"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $bar: ${context._lift(bar)},
            $bar_foo: ${context._lift(bar.foo)},
            $initCount: ${context._lift(initCount)},
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
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(bar, host, ["callFoo"]);
          $Closure1._registerBindObject(bar.foo, host, ["method"]);
          $Closure1._registerBindObject(initCount, host, ["peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    const initCount = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    const bar = new Bar(this,"Bar");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:hello",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "double_reference", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

