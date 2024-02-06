# [resource_captures_globals.test.w](../../../../../examples/tests/valid/resource_captures_globals.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $res }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $res.myPut());
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.$Closure2-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Another }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq((await $Another.myStaticMethod()), 0), "Another.myStaticMethod() == 0");
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.js.map
```

## inflight.Another-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $globalCounter }) {
  class Another {
    constructor({  }) {
    }
    async myMethod() {
      (await $globalCounter.inc());
      return (await $globalCounter.peek());
    }
    static async myStaticMethod() {
      return (await $globalCounter.peek());
    }
    async $inflight_init() {
      $helpers.assert($helpers.eq((await $globalCounter.peek()), 0), "globalCounter.peek() == 0");
    }
  }
  return Another;
}
//# sourceMappingURL=inflight.Another-1.js.map
```

## inflight.First-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class First {
    constructor({  }) {
    }
  }
  return First;
}
//# sourceMappingURL=inflight.First-1.js.map
```

## inflight.MyResource-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Another, $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______globalArrayOfStr__0_, $__obj__key_______if____key_in_obj___throw_new_Error__Map_does_not_contain_key_____key______return_obj_key______globalMapOfNum___a__, $_globalSetOfStr_has__a___, $globalAnother, $globalAnother_first_myResource, $globalAnother_myField, $globalBool, $globalBucket, $globalNum, $globalStr }) {
  class MyResource {
    constructor({ $this_localTopic }) {
      this.$this_localTopic = $this_localTopic;
    }
    async myPut() {
      (await this.$this_localTopic.publish("hello"));
      (await $globalBucket.put("key", "value"));
      $helpers.assert($helpers.eq($globalStr, "hello"), "globalStr == \"hello\"");
      $helpers.assert($helpers.eq($globalBool, true), "globalBool == true");
      $helpers.assert($helpers.eq($globalNum, 42), "globalNum == 42");
      $helpers.assert($helpers.eq($__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______globalArrayOfStr__0_, "hello"), "globalArrayOfStr.at(0) == \"hello\"");
      $helpers.assert($helpers.eq($__obj__key_______if____key_in_obj___throw_new_Error__Map_does_not_contain_key_____key______return_obj_key______globalMapOfNum___a__, (-5)), "globalMapOfNum.get(\"a\") == -5");
      $helpers.assert($_globalSetOfStr_has__a___, "globalSetOfStr.has(\"a\")");
      $helpers.assert($helpers.eq($globalAnother_myField, "hello!"), "globalAnother.myField == \"hello!\"");
      (await $globalAnother_first_myResource.put("key", "value"));
      $helpers.assert(((await $globalAnother.myMethod()) > 0), "globalAnother.myMethod() > 0");
      $helpers.assert(((await $Another.myStaticMethod()) > 0), "Another.myStaticMethod() > 0");
    }
  }
  return MyResource;
}
//# sourceMappingURL=inflight.MyResource-1.js.map
```

## inflight.R-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $_parentThis_localCounter, $globalCounter }) {
  class R {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $globalCounter.inc());
      (await $_parentThis_localCounter.inc());
    }
  }
  return R;
}
//# sourceMappingURL=inflight.R-1.js.map
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
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudwatch_log_group": {
      "MyResource_cloudTopic-OnMessage0_CloudwatchLogGroup_51183C3F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage0/CloudwatchLogGroup",
            "uniqueId": "MyResource_cloudTopic-OnMessage0_CloudwatchLogGroup_51183C3F"
          }
        },
        "name": "/aws/lambda/cloud-Topic-OnMessage0-c8316e5b",
        "retention_in_days": 30
      }
    },
    "aws_dynamodb_table": {
      "MyResource_cloudCounter_0782991D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Counter/Default",
            "uniqueId": "MyResource_cloudCounter_0782991D"
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
        "name": "wing-counter-cloud.Counter-c87187fa"
      },
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
      "MyResource_cloudTopic-OnMessage0_IamRole_961468EB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage0/IamRole",
            "uniqueId": "MyResource_cloudTopic-OnMessage0_IamRole_961468EB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "MyResource_cloudTopic-OnMessage0_IamRolePolicy_FFC9A778": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage0/IamRolePolicy",
            "uniqueId": "MyResource_cloudTopic-OnMessage0_IamRolePolicy_FFC9A778"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.MyResource_cloudCounter_0782991D.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.MyResource_cloudTopic-OnMessage0_IamRole_961468EB.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "MyResource_cloudTopic-OnMessage0_IamRolePolicyAttachment_26007303": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage0/IamRolePolicyAttachment",
            "uniqueId": "MyResource_cloudTopic-OnMessage0_IamRolePolicyAttachment_26007303"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.MyResource_cloudTopic-OnMessage0_IamRole_961468EB.name}"
      }
    },
    "aws_lambda_function": {
      "MyResource_cloudTopic-OnMessage0_F8F986EA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage0/Default",
            "uniqueId": "MyResource_cloudTopic-OnMessage0_F8F986EA"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_5afed199": "${aws_dynamodb_table.MyResource_cloudCounter_0782991D.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage0-c8316e5b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage0-c8316e5b",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.MyResource_cloudTopic-OnMessage0_IamRole_961468EB.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.MyResource_cloudTopic-OnMessage0_S3Object_720C2491.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "MyResource_cloudTopic-OnMessage0_InvokePermission-c8f2c43e88c72aa87b4192974983c81bf653de52bf_913E405C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage0/InvokePermission-c8f2c43e88c72aa87b4192974983c81bf653de52bf",
            "uniqueId": "MyResource_cloudTopic-OnMessage0_InvokePermission-c8f2c43e88c72aa87b4192974983c81bf653de52bf_913E405C"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.MyResource_cloudTopic-OnMessage0_F8F986EA.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.MyResource_cloudTopic_1F3310C3.arn}"
      }
    },
    "aws_s3_bucket": {
      "Another_First_cloudBucket_DB822B7C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Another/First/cloud.Bucket/Default",
            "uniqueId": "Another_First_cloudBucket_DB822B7C"
          }
        },
        "bucket_prefix": "cloud-bucket-c84d72a1-",
        "force_destroy": false
      },
      "Code": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "Code"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      },
      "cloudBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_s3_object": {
      "MyResource_cloudTopic-OnMessage0_S3Object_720C2491": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage0/S3Object",
            "uniqueId": "MyResource_cloudTopic-OnMessage0_S3Object_720C2491"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "MyResource_cloudTopic_1F3310C3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic/Default",
            "uniqueId": "MyResource_cloudTopic_1F3310C3"
          }
        },
        "name": "cloud-Topic-c8f2c43e"
      }
    },
    "aws_sns_topic_subscription": {
      "MyResource_cloudTopic_TopicSubscription0_4C261870": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic/TopicSubscription0",
            "uniqueId": "MyResource_cloudTopic_TopicSubscription0_4C261870"
          }
        },
        "endpoint": "${aws_lambda_function.MyResource_cloudTopic-OnMessage0_F8F986EA.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.MyResource_cloudTopic_1F3310C3.arn}"
      }
    }
  }
}
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
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class First extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.myResource = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.First-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FirstClient = ${First._toInflightType()};
            const client = new FirstClient({
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
    class Another extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.myField = "hello!";
        this.first = new First(this, "First");
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Another-1.js")({
            $globalCounter: ${$stdlib.core.liftObject(globalCounter)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const AnotherClient = ${Another._toInflightType()};
            const client = new AnotherClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "myMethod": [
            [globalCounter, ["inc", "peek"]],
          ],
          "$inflight_init": [
            [globalCounter, ["peek"]],
          ],
        });
      }
      static get _liftTypeMap() {
        return ({
          "myStaticMethod": [
            [globalCounter, ["peek"]],
          ],
        });
      }
    }
    class MyResource extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.localTopic = this.node.root.new("@winglang/sdk.cloud.Topic", cloud.Topic, this, "cloud.Topic");
        this.localCounter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "cloud.Counter");
        const $parentThis = this;
        class R extends $stdlib.std.Resource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.R-1.js")({
                $_parentThis_localCounter: ${$stdlib.core.liftObject($parentThis.localCounter)},
                $globalCounter: ${$stdlib.core.liftObject(globalCounter)},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const RClient = ${R._toInflightType()};
                const client = new RClient({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          get _liftMap() {
            return ({
              "handle": [
                [$parentThis.localCounter, ["inc"]],
                [globalCounter, ["inc"]],
              ],
              "$inflight_init": [
              ],
            });
          }
        }
        (this.localTopic.onMessage(new R(this, "R")));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.MyResource-1.js")({
            $Another: ${$stdlib.core.liftObject(Another)},
            $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______globalArrayOfStr__0_: ${$stdlib.core.liftObject(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(globalArrayOfStr, 0))},
            $__obj__key_______if____key_in_obj___throw_new_Error__Map_does_not_contain_key_____key______return_obj_key______globalMapOfNum___a__: ${$stdlib.core.liftObject(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(globalMapOfNum, "a"))},
            $_globalSetOfStr_has__a___: ${$stdlib.core.liftObject((globalSetOfStr.has("a")))},
            $globalAnother: ${$stdlib.core.liftObject(globalAnother)},
            $globalAnother_first_myResource: ${$stdlib.core.liftObject(globalAnother.first.myResource)},
            $globalAnother_myField: ${$stdlib.core.liftObject(globalAnother.myField)},
            $globalBool: ${$stdlib.core.liftObject(globalBool)},
            $globalBucket: ${$stdlib.core.liftObject(globalBucket)},
            $globalNum: ${$stdlib.core.liftObject(globalNum)},
            $globalStr: ${$stdlib.core.liftObject(globalStr)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const MyResourceClient = ${MyResource._toInflightType()};
            const client = new MyResourceClient({
              $this_localTopic: ${$stdlib.core.liftObject(this.localTopic)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "myPut": [
            [((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(globalArrayOfStr, 0), []],
            [((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(globalMapOfNum, "a"), []],
            [(globalSetOfStr.has("a")), []],
            [Another, ["myStaticMethod"]],
            [globalAnother, ["myMethod"]],
            [globalAnother.first.myResource, ["put"]],
            [globalAnother.myField, []],
            [globalBool, []],
            [globalBucket, ["put"]],
            [globalNum, []],
            [globalStr, []],
            [this.localTopic, ["publish"]],
          ],
          "$inflight_init": [
            [this.localTopic, []],
          ],
        });
      }
    }
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.js")({
            $res: ${$stdlib.core.liftObject(res)},
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
            [res, ["myPut"]],
          ],
          "$inflight_init": [
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.js")({
            $Another: ${$stdlib.core.liftObject(Another)},
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
            [Another, ["myStaticMethod"]],
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    const globalBucket = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
    const globalCounter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "cloud.Counter");
    const globalStr = "hello";
    const globalBool = true;
    const globalNum = 42;
    const globalArrayOfStr = ["hello", "world"];
    const globalMapOfNum = ({["a"]: (-5), ["b"]: 2});
    const globalSetOfStr = new Set(["a", "b"]);
    const globalAnother = new Another(this, "Another");
    const res = new MyResource(this, "MyResource");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:test", new $Closure1(this, "$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:access cloud resource through static methods only", new $Closure2(this, "$Closure2"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "resource_captures_globals.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

