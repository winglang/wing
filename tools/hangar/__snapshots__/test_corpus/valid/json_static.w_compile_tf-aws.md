# [json_static.w](../../../../../examples/tests/valid/json_static.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $jj, $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const ss = ((args) => { return JSON.stringify(args[0], null, args[1]) })([$jj]);
      {((cond) => {if (!cond) throw new Error("assertion failed: ss == \"{\\\"a\\\":123,\\\"b\\\":{\\\"c\\\":456,\\\"d\\\":789}}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(ss,"{\"a\":123,\"b\":{\"c\":456,\"d\":789}}")))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $std_Json }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const hasCheck = ({"a": "hello","b": "wing"});
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.has(hasCheck, \"a\") == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return args[0].hasOwnProperty(args[1]); })([hasCheck,"a"]),true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.has(hasCheck, \"c\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return args[0].hasOwnProperty(args[1]); })([hasCheck,"c"]),false)))};
    }
  }
  return $Closure2;
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
        "undefined": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/undefined/Default/test:Access Json static inflight\",\"${aws_lambda_function.undefined_testAccessJsonstaticinflight_Handler_66620F02.arn}\"],[\"root/undefined/Default/test:has key or not\",\"${aws_lambda_function.undefined_testhaskeyornot_Handler_48CB1E54.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testAccessJsonstaticinflight_Handler_IamRole_919A3632": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Access Json static inflight/Handler/IamRole",
            "uniqueId": "undefined_testAccessJsonstaticinflight_Handler_IamRole_919A3632"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testhaskeyornot_Handler_IamRole_E6382DCC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:has key or not/Handler/IamRole",
            "uniqueId": "undefined_testhaskeyornot_Handler_IamRole_E6382DCC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testAccessJsonstaticinflight_Handler_IamRolePolicy_981AF9CC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Access Json static inflight/Handler/IamRolePolicy",
            "uniqueId": "undefined_testAccessJsonstaticinflight_Handler_IamRolePolicy_981AF9CC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testAccessJsonstaticinflight_Handler_IamRole_919A3632.name}"
      },
      "undefined_testhaskeyornot_Handler_IamRolePolicy_14653529": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:has key or not/Handler/IamRolePolicy",
            "uniqueId": "undefined_testhaskeyornot_Handler_IamRolePolicy_14653529"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testhaskeyornot_Handler_IamRole_E6382DCC.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testAccessJsonstaticinflight_Handler_IamRolePolicyAttachment_B853FF3B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Access Json static inflight/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testAccessJsonstaticinflight_Handler_IamRolePolicyAttachment_B853FF3B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testAccessJsonstaticinflight_Handler_IamRole_919A3632.name}"
      },
      "undefined_testhaskeyornot_Handler_IamRolePolicyAttachment_39A6515D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:has key or not/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testhaskeyornot_Handler_IamRolePolicyAttachment_39A6515D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testhaskeyornot_Handler_IamRole_E6382DCC.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testAccessJsonstaticinflight_Handler_66620F02": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Access Json static inflight/Handler/Default",
            "uniqueId": "undefined_testAccessJsonstaticinflight_Handler_66620F02"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c811ca4e",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c811ca4e",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testAccessJsonstaticinflight_Handler_IamRole_919A3632.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testAccessJsonstaticinflight_Handler_S3Object_849B74F7.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testhaskeyornot_Handler_48CB1E54": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:has key or not/Handler/Default",
            "uniqueId": "undefined_testhaskeyornot_Handler_48CB1E54"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c82b9200",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c82b9200",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testhaskeyornot_Handler_IamRole_E6382DCC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testhaskeyornot_Handler_S3Object_9B1170DE.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "undefined_Code_6226BB4A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Code",
            "uniqueId": "undefined_Code_6226BB4A"
          }
        },
        "bucket_prefix": "code-c818e3de-"
      }
    },
    "aws_s3_object": {
      "undefined_testAccessJsonstaticinflight_Handler_S3Object_849B74F7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Access Json static inflight/Handler/S3Object",
            "uniqueId": "undefined_testAccessJsonstaticinflight_Handler_S3Object_849B74F7"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testhaskeyornot_Handler_S3Object_9B1170DE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:has key or not/Handler/S3Object",
            "uniqueId": "undefined_testhaskeyornot_Handler_S3Object_9B1170DE"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
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
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $jj: ${context._lift(jj)},
            $std_Json: ${context._lift(std.Json)},
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
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(jj, host, []);
        }
        super._registerBind(host, ops);
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
          require("./inflight.$Closure2.js")({
            $std_Json: ${context._lift(std.Json)},
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
    }
    const x = ({"a": 123,"b": ({"c": 456,"d": 789})});
    const k = (Object.keys(x));
    {((cond) => {if (!cond) throw new Error("assertion failed: k.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(k.length,2)))};
    const v = (Object.values(x));
    {((cond) => {if (!cond) throw new Error("assertion failed: v.at(0) == 123")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((v.at(0)),123)))};
    const m = (JSON.parse(JSON.stringify(x)));
    ((obj, args) => { obj[args[0]] = args[1]; })(m, ["a",321]);
    {((cond) => {if (!cond) throw new Error("assertion failed: m.get(\"a\") == 321")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((m)["a"],321)))};
    const n = JSON.parse(JSON.stringify(m));
    {((cond) => {if (!cond) throw new Error("assertion failed: m != n")})((m !== n))};
    let k2 = (Object.keys(m));
    {((cond) => {if (!cond) throw new Error("assertion failed: k2.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(k2.length,2)))};
    ((args) => { delete (args[0])[args[1]]; })([m,"b"]);
    k2 = (Object.keys(m));
    {((cond) => {if (!cond) throw new Error("assertion failed: k2.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(k2.length,1)))};
    const s = "{\"a\": 123, \"b\": {\"c\": 456, \"d\": 789}}";
    const j = (JSON.parse(s));
    {((cond) => {if (!cond) throw new Error("assertion failed: Json.keys(j).length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((Object.keys(j)).length,2)))};
    const invalidJson = "invalid";
    const tryParsed = (((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })(invalidJson) ?? ({"key": "value"}));
    {((cond) => {if (!cond) throw new Error("assertion failed: tryParsed.get(\"key\") == \"value\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((tryParsed)["key"],"value")))};
    const jj = ({"a": 123,"b": ({"c": 456,"d": 789})});
    const ss = ((args) => { return JSON.stringify(args[0], null, args[1]) })([jj]);
    {((cond) => {if (!cond) throw new Error("assertion failed: ss == \"{\\\"a\\\":123,\\\"b\\\":{\\\"c\\\":456,\\\"d\\\":789}}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(ss,"{\"a\":123,\"b\":{\"c\":456,\"d\":789}}")))};
    const ss2 = ((args) => { return JSON.stringify(args[0], null, args[1]) })([jj,2]);
    {((cond) => {if (!cond) throw new Error("assertion failed: ss2 == \"{\\n  \\\"a\\\": 123,\\n  \\\"b\\\": {\\n    \\\"c\\\": 456,\\n    \\\"d\\\": 789\\n  }\\n}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(ss2,"{\n  \"a\": 123,\n  \"b\": {\n    \"c\": 456,\n    \"d\": 789\n  }\n}")))};
    const jsonOfMany = ({"a": 123,"b": "hello","c": true});
    {((cond) => {if (!cond) throw new Error("assertion failed: str.fromJson(jsonOfMany.get(\"b\")) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((jsonOfMany)["b"]),"hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: num.fromJson(jsonOfMany.get(\"a\")) == 123")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (typeof args !== "number") {throw new Error("unable to parse " + typeof args + " " + args + " as a number")}; return JSON.parse(JSON.stringify(args)) })((jsonOfMany)["a"]),123)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: bool.fromJson(jsonOfMany.get(\"c\"))")})((std.Boolean.fromJson((jsonOfMany)["c"])))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:Access Json static inflight",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:has key or not",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "json_static", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

