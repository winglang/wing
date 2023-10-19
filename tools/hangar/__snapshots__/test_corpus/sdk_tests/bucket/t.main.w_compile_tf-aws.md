# [t.main.w](../../../../../../examples/tests/sdk_tests/bucket/t.main.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $b1 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $b1.put("b","2"));
      (await $b1.putJson("json",({"b": 2})));
      (await $b1.put("total",(await (await $b1.list()).join("\n"))));
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({ $b1 }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $b1.put("get b",(await $b1.get("b"))));
      (await $b1.putJson("get json",(await $b1.getJson("json"))));
      (await $b1.put("try get x",((await $b1.tryGet("x")) ?? "no x")));
      (await $b1.putJson("try get json x",((await $b1.tryGetJson("x")) ?? ({"res": "no x"}))));
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
"use strict";
module.exports = function({ $b1, $b2 }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $b2.put("key","val"));
      (await $b1.put("publicUrl",(await $b2.publicUrl("key"))));
      (await $b1.put("non exists",String.raw({ raw: ["", ""] }, (await $b1.exists("x")))));
      (await $b1.put("exists",String.raw({ raw: ["", ""] }, (await $b1.exists("b")))));
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-1.js
```js
"use strict";
module.exports = function({ $b1, $b2 }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $b2.put("tryDelete",String.raw({ raw: ["", ""] }, (await $b1.tryDelete("x")))));
      for (const item of (await $b1.list())) {
        (await $b1.delete(item));
      }
    }
  }
  return $Closure4;
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
    "aws_cloudwatch_log_group": {
      "deletetryDelete4_CloudwatchLogGroup_8D021333": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/delete, tryDelete 4/CloudwatchLogGroup",
            "uniqueId": "deletetryDelete4_CloudwatchLogGroup_8D021333"
          }
        },
        "name": "/aws/lambda/delete-tryDelete-4-c88b835e",
        "retention_in_days": 30
      },
      "existssignedUrlpublicUrl3_CloudwatchLogGroup_35B0729E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/exists, signedUrl, publicUrl 3/CloudwatchLogGroup",
            "uniqueId": "existssignedUrlpublicUrl3_CloudwatchLogGroup_35B0729E"
          }
        },
        "name": "/aws/lambda/exists-signedUrl-publicUrl-3-c802a0a5",
        "retention_in_days": 30
      },
      "getgetJsontryGettryGetJson2_CloudwatchLogGroup_B3E6FB43": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/get, getJson, tryGet, tryGetJson 2/CloudwatchLogGroup",
            "uniqueId": "getgetJsontryGettryGetJson2_CloudwatchLogGroup_B3E6FB43"
          }
        },
        "name": "/aws/lambda/get-getJson-tryGet-tryGetJson-2-c8d43b44",
        "retention_in_days": 30
      },
      "putputJsonlist1_CloudwatchLogGroup_8CA329D6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/put, putJson, list 1/CloudwatchLogGroup",
            "uniqueId": "putputJsonlist1_CloudwatchLogGroup_8CA329D6"
          }
        },
        "name": "/aws/lambda/put-putJson-list-1-c8c2e9bb",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "deletetryDelete4_IamRole_FB5B3E03": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/delete, tryDelete 4/IamRole",
            "uniqueId": "deletetryDelete4_IamRole_FB5B3E03"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "existssignedUrlpublicUrl3_IamRole_24F1FF96": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/exists, signedUrl, publicUrl 3/IamRole",
            "uniqueId": "existssignedUrlpublicUrl3_IamRole_24F1FF96"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "getgetJsontryGettryGetJson2_IamRole_CBEF1300": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/get, getJson, tryGet, tryGetJson 2/IamRole",
            "uniqueId": "getgetJsontryGettryGetJson2_IamRole_CBEF1300"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "putputJsonlist1_IamRole_B6A78852": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/put, putJson, list 1/IamRole",
            "uniqueId": "putputJsonlist1_IamRole_B6A78852"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "deletetryDelete4_IamRolePolicy_2F8AD6E3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/delete, tryDelete 4/IamRolePolicy",
            "uniqueId": "deletetryDelete4_IamRolePolicy_2F8AD6E3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.b1.arn}\",\"${aws_s3_bucket.b1.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.public.arn}\",\"${aws_s3_bucket.public.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.deletetryDelete4_IamRole_FB5B3E03.name}"
      },
      "existssignedUrlpublicUrl3_IamRolePolicy_C769747A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/exists, signedUrl, publicUrl 3/IamRolePolicy",
            "uniqueId": "existssignedUrlpublicUrl3_IamRolePolicy_C769747A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.b1.arn}\",\"${aws_s3_bucket.b1.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\"],\"Resource\":[\"${aws_s3_bucket.public.arn}\",\"${aws_s3_bucket.public.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.existssignedUrlpublicUrl3_IamRole_24F1FF96.name}"
      },
      "getgetJsontryGettryGetJson2_IamRolePolicy_521DC0B6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/get, getJson, tryGet, tryGetJson 2/IamRolePolicy",
            "uniqueId": "getgetJsontryGettryGetJson2_IamRolePolicy_521DC0B6"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.b1.arn}\",\"${aws_s3_bucket.b1.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.getgetJsontryGettryGetJson2_IamRole_CBEF1300.name}"
      },
      "putputJsonlist1_IamRolePolicy_8F4CA5C7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/put, putJson, list 1/IamRolePolicy",
            "uniqueId": "putputJsonlist1_IamRolePolicy_8F4CA5C7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.b1.arn}\",\"${aws_s3_bucket.b1.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.putputJsonlist1_IamRole_B6A78852.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "deletetryDelete4_IamRolePolicyAttachment_E0050000": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/delete, tryDelete 4/IamRolePolicyAttachment",
            "uniqueId": "deletetryDelete4_IamRolePolicyAttachment_E0050000"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.deletetryDelete4_IamRole_FB5B3E03.name}"
      },
      "existssignedUrlpublicUrl3_IamRolePolicyAttachment_2EBFA529": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/exists, signedUrl, publicUrl 3/IamRolePolicyAttachment",
            "uniqueId": "existssignedUrlpublicUrl3_IamRolePolicyAttachment_2EBFA529"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.existssignedUrlpublicUrl3_IamRole_24F1FF96.name}"
      },
      "getgetJsontryGettryGetJson2_IamRolePolicyAttachment_149A5FF3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/get, getJson, tryGet, tryGetJson 2/IamRolePolicyAttachment",
            "uniqueId": "getgetJsontryGettryGetJson2_IamRolePolicyAttachment_149A5FF3"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.getgetJsontryGettryGetJson2_IamRole_CBEF1300.name}"
      },
      "putputJsonlist1_IamRolePolicyAttachment_30CECA9C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/put, putJson, list 1/IamRolePolicyAttachment",
            "uniqueId": "putputJsonlist1_IamRolePolicyAttachment_30CECA9C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.putputJsonlist1_IamRole_B6A78852.name}"
      }
    },
    "aws_lambda_function": {
      "deletetryDelete4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/delete, tryDelete 4/Default",
            "uniqueId": "deletetryDelete4"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_12a95bb8": "${aws_s3_bucket.b1.bucket}",
            "BUCKET_NAME_89470fa2": "${aws_s3_bucket.public.bucket}",
            "WING_FUNCTION_NAME": "delete-tryDelete-4-c88b835e",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "delete-tryDelete-4-c88b835e",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.deletetryDelete4_IamRole_FB5B3E03.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.deletetryDelete4_S3Object_5D318CE6.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "existssignedUrlpublicUrl3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/exists, signedUrl, publicUrl 3/Default",
            "uniqueId": "existssignedUrlpublicUrl3"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_12a95bb8": "${aws_s3_bucket.b1.bucket}",
            "BUCKET_NAME_89470fa2": "${aws_s3_bucket.public.bucket}",
            "WING_FUNCTION_NAME": "exists-signedUrl-publicUrl-3-c802a0a5",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "exists-signedUrl-publicUrl-3-c802a0a5",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.existssignedUrlpublicUrl3_IamRole_24F1FF96.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.existssignedUrlpublicUrl3_S3Object_1F5D4DAE.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "getgetJsontryGettryGetJson2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/get, getJson, tryGet, tryGetJson 2/Default",
            "uniqueId": "getgetJsontryGettryGetJson2"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_12a95bb8": "${aws_s3_bucket.b1.bucket}",
            "WING_FUNCTION_NAME": "get-getJson-tryGet-tryGetJson-2-c8d43b44",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get-getJson-tryGet-tryGetJson-2-c8d43b44",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.getgetJsontryGettryGetJson2_IamRole_CBEF1300.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.getgetJsontryGettryGetJson2_S3Object_5A6352B0.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "putputJsonlist1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/put, putJson, list 1/Default",
            "uniqueId": "putputJsonlist1"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_12a95bb8": "${aws_s3_bucket.b1.bucket}",
            "WING_FUNCTION_NAME": "put-putJson-list-1-c8c2e9bb",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "put-putJson-list-1-c8c2e9bb",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.putputJsonlist1_IamRole_B6A78852.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.putputJsonlist1_S3Object_9F50B740.key}",
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
      "public": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/public/Default",
            "uniqueId": "public"
          }
        },
        "bucket_prefix": "public-c8968422-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_policy": {
      "public_PublicPolicy_BB451CC9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/public/PublicPolicy",
            "uniqueId": "public_PublicPolicy_BB451CC9"
          }
        },
        "bucket": "${aws_s3_bucket.public.bucket}",
        "depends_on": [
          "aws_s3_bucket_public_access_block.public_PublicAccessBlock_3018041B"
        ],
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":[\"s3:GetObject\"],\"Resource\":[\"${aws_s3_bucket.public.arn}/*\"]}]}"
      }
    },
    "aws_s3_bucket_public_access_block": {
      "public_PublicAccessBlock_3018041B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/public/PublicAccessBlock",
            "uniqueId": "public_PublicAccessBlock_3018041B"
          }
        },
        "block_public_acls": false,
        "block_public_policy": false,
        "bucket": "${aws_s3_bucket.public.bucket}",
        "ignore_public_acls": false,
        "restrict_public_buckets": false
      }
    },
    "aws_s3_object": {
      "b1_S3Object-a_4670B03B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b1/S3Object-a",
            "uniqueId": "b1_S3Object-a_4670B03B"
          }
        },
        "bucket": "${aws_s3_bucket.b1.bucket}",
        "content": "1",
        "key": "a"
      },
      "b1_S3Object-b_F5DC9F4B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b1/S3Object-b",
            "uniqueId": "b1_S3Object-b_F5DC9F4B"
          }
        },
        "bucket": "${aws_s3_bucket.b1.bucket}",
        "content": "bring cloud;\n\nlet b = new cloud.Bucket();\n\ntest \"put\" {\n  b.put(\"test1.txt\", \"Foo\");\n  b.put(\"test2.txt\", \"Bar\");\n\n  let first = b.get(\"test1.txt\");\n  let second = b.get(\"test2.txt\");\n  \n  assert(first == \"Foo\");\n  assert(second == \"Bar\");\n\n  b.delete(\"test1.txt\");\n  let files = b.list();\n  \n  assert(files.contains(\"test1.txt\") == false);\n  assert(files.contains(\"test2.txt\") == true);\n\n  b.put(\"test2.txt\", \"Baz\");\n\n  let third = b.get(\"test2.txt\");\n  assert(third == \"Baz\");\n}",
        "key": "b"
      },
      "deletetryDelete4_S3Object_5D318CE6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/delete, tryDelete 4/S3Object",
            "uniqueId": "deletetryDelete4_S3Object_5D318CE6"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "existssignedUrlpublicUrl3_S3Object_1F5D4DAE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/exists, signedUrl, publicUrl 3/S3Object",
            "uniqueId": "existssignedUrlpublicUrl3_S3Object_1F5D4DAE"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "getgetJsontryGettryGetJson2_S3Object_5A6352B0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/get, getJson, tryGet, tryGetJson 2/S3Object",
            "uniqueId": "getgetJsontryGettryGetJson2_S3Object_5A6352B0"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "putputJsonlist1_S3Object_9F50B740": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/put, putJson, list 1/S3Object",
            "uniqueId": "putputJsonlist1_S3Object_9F50B740"
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
            $b1: ${context._lift(b1)},
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
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(b1, host, ["list", "put", "putJson"]);
        }
        super._registerBind(host, ops);
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
            $b1: ${context._lift(b1)},
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
          $Closure2._registerBindObject(b1, host, ["get", "getJson", "put", "putJson", "tryGet", "tryGetJson"]);
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
            $b1: ${context._lift(b1)},
            $b2: ${context._lift(b2)},
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
          $Closure3._registerBindObject(b1, host, ["exists", "put"]);
          $Closure3._registerBindObject(b2, host, ["publicUrl", "put"]);
        }
        super._registerBind(host, ops);
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
            $b1: ${context._lift(b1)},
            $b2: ${context._lift(b2)},
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
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure4._registerBindObject(b1, host, ["delete", "list", "tryDelete"]);
          $Closure4._registerBindObject(b2, host, ["put"]);
        }
        super._registerBind(host, ops);
      }
    }
    const b1 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"b1");
    const b2 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"public",{ public: true });
    (b1.addObject("a","1"));
    (b1.addFile("b","./put.test.w"));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"put, putJson, list 1",new $Closure1(this,"$Closure1"));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"get, getJson, tryGet, tryGetJson 2",new $Closure2(this,"$Closure2"));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"exists, signedUrl, publicUrl 3",new $Closure3(this,"$Closure3"));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"delete, tryDelete 4",new $Closure4(this,"$Closure4"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "t.main", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

