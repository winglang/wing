# [json.w](../../../../../../examples/tests/sdk_tests/std/json.w) | compile | tf-aws

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
      const assertThrows = async (expected, block) => {
        let error = false;
        try {
          (await block());
        }
        catch ($error_actual) {
          const actual = $error_actual.message;
          {((cond) => {if (!cond) throw new Error("assertion failed: actual == expected")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(actual,expected)))};
          error = true;
        }
        {((cond) => {if (!cond) throw new Error("assertion failed: error")})(error)};
      }
      ;
      const JSON_PROPERTY_DOES_NOT_EXIST_ERROR = "Json property \"c\" does not exist";
      const obj = ({"a": 1,"b": 2});
      const mutObj = ({"a": 1,"b": 2});
      {((cond) => {if (!cond) throw new Error("assertion failed: obj.get(\"b\") == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(obj, "b"),2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutObj.get(\"b\") == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(mutObj, "b"),2)))};
      (await assertThrows(JSON_PROPERTY_DOES_NOT_EXIST_ERROR,async () => {
        ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(obj, "c");
      }
      ));
      (await assertThrows(JSON_PROPERTY_DOES_NOT_EXIST_ERROR,async () => {
        ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(mutObj, "c");
      }
      ));
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({  }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const assertThrows = async (expected, block) => {
        let error = false;
        try {
          (await block());
        }
        catch ($error_actual) {
          const actual = $error_actual.message;
          {((cond) => {if (!cond) throw new Error("assertion failed: actual == expected")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(actual,expected)))};
          error = true;
        }
        {((cond) => {if (!cond) throw new Error("assertion failed: error")})(error)};
      }
      ;
      const INDEX_OUT_OF_BOUNDS_ERROR = "Index out of bounds";
      const jsonArray = ["foo", "bar", "baz"];
      const mutJsonArray = [1, 2, 3];
      {((cond) => {if (!cond) throw new Error("assertion failed: jsonArray.getAt(2) == \"baz\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(jsonArray, 2),"baz")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutJsonArray.getAt(2) == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(mutJsonArray, 2),3)))};
      (await assertThrows(INDEX_OUT_OF_BOUNDS_ERROR,async () => {
        ((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(jsonArray, 3);
        ((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(mutJsonArray, 3);
      }
      ));
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
module.exports = function({  }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const mutObj = ({"x": 1,"y": 2});
      ((obj, args) => { obj[args[0]] = args[1]; })(mutObj, ["x",(-1)]);
      ((obj, args) => { obj[args[0]] = args[1]; })(mutObj, ["z",3]);
      {((cond) => {if (!cond) throw new Error("assertion failed: mutObj.get(\"x\") == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(mutObj, "x"),(-1))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutObj.get(\"z\") == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(mutObj, "z"),3)))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-1.js
```js
module.exports = function({  }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const mutJsonArray = [1, 2, 3];
      ((obj, args) => { obj[args[0]] = args[1]; })(mutJsonArray, [0,(-1)]);
      ((obj, args) => { obj[args[0]] = args[1]; })(mutJsonArray, [3,3]);
      {((cond) => {if (!cond) throw new Error("assertion failed: mutJsonArray.getAt(0) == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(mutJsonArray, 0),(-1))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutJsonArray.getAt(3) == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(mutJsonArray, 3),3)))};
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5-1.js
```js
module.exports = function({ $std_Json }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const obj = ({"a": 1,"b": 2});
      const stringified = ((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([obj]);
      const stringifiedIndent = ((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([obj,{ indent: 2 }]);
      {((cond) => {if (!cond) throw new Error("assertion failed: stringified == \"{\\\"a\\\":1,\\\"b\\\":2}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(stringified,"{\"a\":1,\"b\":2}")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: stringifiedIndent == \"{\\n  \\\"a\\\": 1,\\n  \\\"b\\\": 2\\n}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(stringifiedIndent,"{\n  \"a\": 1,\n  \"b\": 2\n}")))};
    }
  }
  return $Closure5;
}

```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.17.3"
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
      "value": "[[\"root/Default/Default/test:get()\",\"${aws_lambda_function.testget_Handler_A37EBFC3.arn}\"],[\"root/Default/Default/test:getAt()\",\"${aws_lambda_function.testgetAt_Handler_44D7BE7A.arn}\"],[\"root/Default/Default/test:set()\",\"${aws_lambda_function.testset_Handler_ADDF1A01.arn}\"],[\"root/Default/Default/test:setAt()\",\"${aws_lambda_function.testsetAt_Handler_51015029.arn}\"],[\"root/Default/Default/test:stringify()\",\"${aws_lambda_function.teststringify_Handler_2E93A8A7.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testgetAt_Handler_IamRole_915EA920": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:getAt()/Handler/IamRole",
            "uniqueId": "testgetAt_Handler_IamRole_915EA920"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testget_Handler_IamRole_7FCA766F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get()/Handler/IamRole",
            "uniqueId": "testget_Handler_IamRole_7FCA766F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testsetAt_Handler_IamRole_C36C780A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setAt()/Handler/IamRole",
            "uniqueId": "testsetAt_Handler_IamRole_C36C780A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testset_Handler_IamRole_B9B79227": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/IamRole",
            "uniqueId": "testset_Handler_IamRole_B9B79227"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "teststringify_Handler_IamRole_D79B403A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:stringify()/Handler/IamRole",
            "uniqueId": "teststringify_Handler_IamRole_D79B403A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testgetAt_Handler_IamRolePolicy_0F6A0772": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:getAt()/Handler/IamRolePolicy",
            "uniqueId": "testgetAt_Handler_IamRolePolicy_0F6A0772"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testgetAt_Handler_IamRole_915EA920.name}"
      },
      "testget_Handler_IamRolePolicy_B215A072": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get()/Handler/IamRolePolicy",
            "uniqueId": "testget_Handler_IamRolePolicy_B215A072"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testget_Handler_IamRole_7FCA766F.name}"
      },
      "testsetAt_Handler_IamRolePolicy_24EE9CC0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setAt()/Handler/IamRolePolicy",
            "uniqueId": "testsetAt_Handler_IamRolePolicy_24EE9CC0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testsetAt_Handler_IamRole_C36C780A.name}"
      },
      "testset_Handler_IamRolePolicy_ADE48415": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/IamRolePolicy",
            "uniqueId": "testset_Handler_IamRolePolicy_ADE48415"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testset_Handler_IamRole_B9B79227.name}"
      },
      "teststringify_Handler_IamRolePolicy_2C7E059D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:stringify()/Handler/IamRolePolicy",
            "uniqueId": "teststringify_Handler_IamRolePolicy_2C7E059D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.teststringify_Handler_IamRole_D79B403A.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testgetAt_Handler_IamRolePolicyAttachment_4D020DB9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:getAt()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testgetAt_Handler_IamRolePolicyAttachment_4D020DB9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testgetAt_Handler_IamRole_915EA920.name}"
      },
      "testget_Handler_IamRolePolicyAttachment_63E5FC9C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testget_Handler_IamRolePolicyAttachment_63E5FC9C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testget_Handler_IamRole_7FCA766F.name}"
      },
      "testsetAt_Handler_IamRolePolicyAttachment_764BF14B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setAt()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testsetAt_Handler_IamRolePolicyAttachment_764BF14B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testsetAt_Handler_IamRole_C36C780A.name}"
      },
      "testset_Handler_IamRolePolicyAttachment_58805670": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testset_Handler_IamRolePolicyAttachment_58805670"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testset_Handler_IamRole_B9B79227.name}"
      },
      "teststringify_Handler_IamRolePolicyAttachment_B6E5A35D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:stringify()/Handler/IamRolePolicyAttachment",
            "uniqueId": "teststringify_Handler_IamRolePolicyAttachment_B6E5A35D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.teststringify_Handler_IamRole_D79B403A.name}"
      }
    },
    "aws_lambda_function": {
      "testgetAt_Handler_44D7BE7A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:getAt()/Handler/Default",
            "uniqueId": "testgetAt_Handler_44D7BE7A"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8b9b051",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8b9b051",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testgetAt_Handler_IamRole_915EA920.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testgetAt_Handler_S3Object_AE45FDF0.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testget_Handler_A37EBFC3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get()/Handler/Default",
            "uniqueId": "testget_Handler_A37EBFC3"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8b799d4",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8b799d4",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testget_Handler_IamRole_7FCA766F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testget_Handler_S3Object_27E25F7F.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testsetAt_Handler_51015029": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setAt()/Handler/Default",
            "uniqueId": "testsetAt_Handler_51015029"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c841d86c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c841d86c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testsetAt_Handler_IamRole_C36C780A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testsetAt_Handler_S3Object_FE28177A.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testset_Handler_ADDF1A01": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/Default",
            "uniqueId": "testset_Handler_ADDF1A01"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8240bc7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8240bc7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testset_Handler_IamRole_B9B79227.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testset_Handler_S3Object_A8FBF518.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "teststringify_Handler_2E93A8A7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:stringify()/Handler/Default",
            "uniqueId": "teststringify_Handler_2E93A8A7"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c84b217d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c84b217d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.teststringify_Handler_IamRole_D79B403A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.teststringify_Handler_S3Object_938C4856.key}",
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
      "testgetAt_Handler_S3Object_AE45FDF0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:getAt()/Handler/S3Object",
            "uniqueId": "testgetAt_Handler_S3Object_AE45FDF0"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testget_Handler_S3Object_27E25F7F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get()/Handler/S3Object",
            "uniqueId": "testget_Handler_S3Object_27E25F7F"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testsetAt_Handler_S3Object_FE28177A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setAt()/Handler/S3Object",
            "uniqueId": "testsetAt_Handler_S3Object_FE28177A"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testset_Handler_S3Object_A8FBF518": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/S3Object",
            "uniqueId": "testset_Handler_S3Object_A8FBF518"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "teststringify_Handler_S3Object_938C4856": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:stringify()/Handler/S3Object",
            "uniqueId": "teststringify_Handler_S3Object_938C4856"
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
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
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
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure4-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this)};
            const client = new $Closure4Client({
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
    class $Closure5 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure5-1.js")({
            $std_Json: ${context._lift(std.Json)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure5Client = ${$Closure5._toInflightType(this)};
            const client = new $Closure5Client({
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
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:get()",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:getAt()",new $Closure2(this,"$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:set()",new $Closure3(this,"$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:setAt()",new $Closure4(this,"$Closure4"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:stringify()",new $Closure5(this,"$Closure5"));
    {((cond) => {if (!cond) throw new Error("assertion failed: Json.tryParse(nil) == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })(undefined),undefined)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: Json.tryParse(\"boom\") == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })("boom"),undefined)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: Json.tryParse(\"\") == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })(""),undefined)))};
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "json", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

