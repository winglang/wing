# [structs.w](../../../../../examples/tests/valid/structs.w) | compile | tf-aws

## A.Struct.js
```js
module.exports = function(stdStruct, fromInline) {
  class A {
    static jsonSchema() {
      return {
        id: "/A",
        type: "object",
        properties: {
          field0: { type: "string" },
        },
        required: [
          "field0",
        ],
        $defs: {
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return fromInline(`require("./A.Struct.js")(${ context._lift(stdStruct) })`);
    }
  }
  return A;
};

```

## B.Struct.js
```js
module.exports = function(stdStruct, fromInline) {
  class B {
    static jsonSchema() {
      return {
        id: "/B",
        type: "object",
        properties: {
          ...require("./A.Struct.js")().jsonSchema().properties,
          field1: { type: "number" },
          field2: { type: "string" },
          field3: { "$ref": "#/$defs/A" },
        },
        required: [
          "field1",
          "field2",
          "field3",
          ...require("./A.Struct.js")().jsonSchema().required,
        ],
        $defs: {
          "A": { type: "object", "properties": require("./A.Struct.js")().jsonSchema().properties },
          ...require("./A.Struct.js")().jsonSchema().$defs,
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return fromInline(`require("./B.Struct.js")(${ context._lift(stdStruct) })`);
    }
  }
  return B;
};

```

## Dazzle.Struct.js
```js
module.exports = function(stdStruct, fromInline) {
  class Dazzle {
    static jsonSchema() {
      return {
        id: "/Dazzle",
        type: "object",
        properties: {
          a: { type: "string" },
        },
        required: [
          "a",
        ],
        $defs: {
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return fromInline(`require("./Dazzle.Struct.js")(${ context._lift(stdStruct) })`);
    }
  }
  return Dazzle;
};

```

## Razzle.Struct.js
```js
module.exports = function(stdStruct, fromInline) {
  class Razzle {
    static jsonSchema() {
      return {
        id: "/Razzle",
        type: "object",
        properties: {
          a: { type: "string" },
        },
        required: [
          "a",
        ],
        $defs: {
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return fromInline(`require("./Razzle.Struct.js")(${ context._lift(stdStruct) })`);
    }
  }
  return Razzle;
};

```

## Showtime.Struct.js
```js
module.exports = function(stdStruct, fromInline) {
  class Showtime {
    static jsonSchema() {
      return {
        id: "/Showtime",
        type: "object",
        properties: {
          ...require("./Razzle.Struct.js")().jsonSchema().properties,
          ...require("./Dazzle.Struct.js")().jsonSchema().properties,
        },
        required: [
          ...require("./Razzle.Struct.js")().jsonSchema().required,
          ...require("./Dazzle.Struct.js")().jsonSchema().required,
        ],
        $defs: {
          ...require("./Razzle.Struct.js")().jsonSchema().$defs,
          ...require("./Dazzle.Struct.js")().jsonSchema().$defs,
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return fromInline(`require("./Showtime.Struct.js")(${ context._lift(stdStruct) })`);
    }
  }
  return Showtime;
};

```

## inflight.$Closure1-1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const s2 = ({"a": "foo"});
      {((cond) => {if (!cond) throw new Error("assertion failed: s2.a == \"foo\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s2.a,"foo")))};
    }
  }
  return $Closure1;
}

```

## inflight.Foo-1.js
```js
module.exports = function({  }) {
  class Foo {
    constructor({ $this_data_field0 }) {
      this.$this_data_field0 = $this_data_field0;
    }
    async getStuff() {
      return this.$this_data_field0;
    }
  }
  return Foo;
}

```

## lotsOfTypes.Struct.js
```js
module.exports = function(stdStruct, fromInline) {
  class lotsOfTypes {
    static jsonSchema() {
      return {
        id: "/lotsOfTypes",
        type: "object",
        properties: {
          a: { type: "string" },
          b: { type: "number" },
          c: { type: "array",  items: { type: "string" } },
          d: { type: "object", patternProperties: { ".*": { type: "string" } } },
          e: { type: "object" },
          f: { type: "boolean" },
          g: { type: "string" },
          h: { type: "array",  items: { type: "object", patternProperties: { ".*": { type: "number" } } } },
        },
        required: [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "h",
        ],
        $defs: {
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return fromInline(`require("./lotsOfTypes.Struct.js")(${ context._lift(stdStruct) })`);
    }
  }
  return lotsOfTypes;
};

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
      "value": "[[\"root/Default/Default/test:struct definitions are phase independant\",\"${aws_lambda_function.teststructdefinitionsarephaseindependant_Handler_F8CACE9E.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "teststructdefinitionsarephaseindependant_Handler_IamRole_4609E5D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:struct definitions are phase independant/Handler/IamRole",
            "uniqueId": "teststructdefinitionsarephaseindependant_Handler_IamRole_4609E5D7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "teststructdefinitionsarephaseindependant_Handler_IamRolePolicy_25856004": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:struct definitions are phase independant/Handler/IamRolePolicy",
            "uniqueId": "teststructdefinitionsarephaseindependant_Handler_IamRolePolicy_25856004"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.teststructdefinitionsarephaseindependant_Handler_IamRole_4609E5D7.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "teststructdefinitionsarephaseindependant_Handler_IamRolePolicyAttachment_E9A6A66B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:struct definitions are phase independant/Handler/IamRolePolicyAttachment",
            "uniqueId": "teststructdefinitionsarephaseindependant_Handler_IamRolePolicyAttachment_E9A6A66B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.teststructdefinitionsarephaseindependant_Handler_IamRole_4609E5D7.name}"
      }
    },
    "aws_lambda_function": {
      "teststructdefinitionsarephaseindependant_Handler_F8CACE9E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:struct definitions are phase independant/Handler/Default",
            "uniqueId": "teststructdefinitionsarephaseindependant_Handler_F8CACE9E"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8158c42",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8158c42",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.teststructdefinitionsarephaseindependant_Handler_IamRole_4609E5D7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.teststructdefinitionsarephaseindependant_Handler_S3Object_9394B2A7.key}",
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
      "teststructdefinitionsarephaseindependant_Handler_S3Object_9394B2A7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:struct definitions are phase independant/Handler/S3Object",
            "uniqueId": "teststructdefinitionsarephaseindependant_Handler_S3Object_9394B2A7"
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
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, b) {
        super(scope, id);
        this._addInflightOps("getStuff", "$inflight_init");
        this.data = b;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Foo-1.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this).text};
            const client = new FooClient({
              $this_data_field0: ${this._lift(this.data.field0)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Foo._registerBindObject(this.data.field0, host, []);
        }
        if (ops.includes("getStuff")) {
          Foo._registerBindObject(this.data.field0, host, []);
        }
        super._registerBind(host, ops);
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
          require("./inflight.$Closure1-1.js")({
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
    const A = require("./A.Struct.js")($stdlib.std.Struct, $stdlib.core.NodeJsCode.fromInline);
    const B = require("./B.Struct.js")($stdlib.std.Struct, $stdlib.core.NodeJsCode.fromInline);
    const x = ({"field0": "Sup"});
    const y = ({"field0": "hello","field1": 1,"field2": "world","field3": ({"field0": "foo"})});
    {((cond) => {if (!cond) throw new Error("assertion failed: x.field0 == \"Sup\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(x.field0,"Sup")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: y.field1 == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(y.field1,1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: y.field3.field0 == \"foo\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(y.field3.field0,"foo")))};
    const lotsOfTypes = require("./lotsOfTypes.Struct.js")($stdlib.std.Struct, $stdlib.core.NodeJsCode.fromInline);
    const Razzle = require("./Razzle.Struct.js")($stdlib.std.Struct, $stdlib.core.NodeJsCode.fromInline);
    const Dazzle = require("./Dazzle.Struct.js")($stdlib.std.Struct, $stdlib.core.NodeJsCode.fromInline);
    const Showtime = require("./Showtime.Struct.js")($stdlib.std.Struct, $stdlib.core.NodeJsCode.fromInline);
    const s = ({"a": "Boom baby"});
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:struct definitions are phase independant",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "structs", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

