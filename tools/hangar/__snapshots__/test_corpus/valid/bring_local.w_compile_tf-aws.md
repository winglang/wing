# [bring_local.w](../../../../../examples/tests/valid/bring_local.w) | compile | tf-aws

## inflight.$Closure1.js
```js
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

```

## inflight.Q.js
```js
module.exports = function({  }) {
  class Q {
    constructor({  }) {
    }
  }
  return Q;
}

```

## inflight.Store.js
```js
module.exports = function({  }) {
  class Store {
    constructor({ $this_b }) {
      this.$this_b = $this_b;
    }
    async store(data) {
      (await this.$this_b.put("data.txt",data));
    }
  }
  return Store;
}

```

## inflight.Triangle.js
```js
module.exports = function({  }) {
  class Triangle {
    constructor({  }) {
    }
  }
  return Triangle;
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
      "value": "[[\"root/Default/Default/test:add data to store\",\"${aws_lambda_function.testadddatatostore_Handler_19066842.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testadddatatostore_Handler_IamRole_D112FE1A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:add data to store/Handler/IamRole",
            "uniqueId": "testadddatatostore_Handler_IamRole_D112FE1A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testadddatatostore_Handler_IamRolePolicy_2759864D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:add data to store/Handler/IamRolePolicy",
            "uniqueId": "testadddatatostore_Handler_IamRolePolicy_2759864D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.file1Store_cloudBucket_86CE87B1.arn}\",\"${aws_s3_bucket.file1Store_cloudBucket_86CE87B1.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testadddatatostore_Handler_IamRole_D112FE1A.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testadddatatostore_Handler_IamRolePolicyAttachment_1100277D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:add data to store/Handler/IamRolePolicyAttachment",
            "uniqueId": "testadddatatostore_Handler_IamRolePolicyAttachment_1100277D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testadddatatostore_Handler_IamRole_D112FE1A.name}"
      }
    },
    "aws_lambda_function": {
      "testadddatatostore_Handler_19066842": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:add data to store/Handler/Default",
            "uniqueId": "testadddatatostore_Handler_19066842"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_94dc4b3e": "${aws_s3_bucket.file1Store_cloudBucket_86CE87B1.bucket}",
            "WING_FUNCTION_NAME": "Handler-c8157444",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8157444",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testadddatatostore_Handler_IamRole_D112FE1A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testadddatatostore_Handler_S3Object_6CF2BC7E.key}",
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
    "aws_s3_bucket_public_access_block": {
      "file1Store_cloudBucket_PublicAccessBlock_542A96A5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/file1.Store/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "file1Store_cloudBucket_PublicAccessBlock_542A96A5"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.file1Store_cloudBucket_86CE87B1.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "file1Store_cloudBucket_Encryption_387D9114": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/file1.Store/cloud.Bucket/Encryption",
            "uniqueId": "file1Store_cloudBucket_Encryption_387D9114"
          }
        },
        "bucket": "${aws_s3_bucket.file1Store_cloudBucket_86CE87B1.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      }
    },
    "aws_s3_object": {
      "testadddatatostore_Handler_S3Object_6CF2BC7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:add data to store/Handler/S3Object",
            "uniqueId": "testadddatatostore_Handler_S3Object_6CF2BC7E"
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
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
            $store: ${context._lift(store)},
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
          $Closure1._registerBindObject(store, host, ["store"]);
        }
        super._registerBind(host, ops);
      }
    }
    class Triangle extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
      }
      area() {
        return 1;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Triangle.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const TriangleClient = ${Triangle._toInflightType(this).text};
            const client = new TriangleClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    const file1 = (() => {
      const cloud = require('@winglang/sdk').cloud;
      class Store extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          this._addInflightOps("store", "$inflight_init");
          this.b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
        }
        static _toInflightType(context) {
          return $stdlib.core.NodeJsCode.fromInline(`
            require("./inflight.Store.js")({
            })
          `);
        }
        _toInflight() {
          return $stdlib.core.NodeJsCode.fromInline(`
            (await (async () => {
              const StoreClient = ${Store._toInflightType(this).text};
              const client = new StoreClient({
                $this_b: ${this._lift(this.b)},
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `);
        }
        _registerBind(host, ops) {
          if (ops.includes("$inflight_init")) {
            Store._registerBindObject(this.b, host, []);
          }
          if (ops.includes("store")) {
            Store._registerBindObject(this.b, host, ["put"]);
          }
          super._registerBind(host, ops);
        }
      }
      const Color = 
        Object.freeze((function (tmp) {
          tmp[tmp["RED"] = 0] = "RED";
          tmp[tmp["GREEN"] = 1] = "GREEN";
          tmp[tmp["BLUE"] = 2] = "BLUE";
          return tmp;
        })({}))
      ;
      return { Store, Color };
    })();
    const file2 = (() => {
      class Q extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          this._addInflightOps("$inflight_init");
        }
        static _toInflightType(context) {
          return $stdlib.core.NodeJsCode.fromInline(`
            require("./inflight.Q.js")({
            })
          `);
        }
        _toInflight() {
          return $stdlib.core.NodeJsCode.fromInline(`
            (await (async () => {
              const QClient = ${Q._toInflightType(this).text};
              const client = new QClient({
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `);
        }
      }
      return { Q };
    })();
    const file3 = (() => {
      return {  };
    })();
    const store = new file1.Store(this,"file1.Store");
    const q = new file2.Q(this,"file2.Q");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:add data to store",new $Closure1(this,"$Closure1"));
    const s = {
    "x": 1,
    "y": 2,}
    ;
    const c = file1.Color.BLUE;
    {((cond) => {if (!cond) throw new Error("assertion failed: c != file1.Color.RED")})((c !== file1.Color.RED))};
    const t = new Triangle(this,"Triangle");
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "bring_local", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, sourceDir: process.env['WING_SOURCE_DIR'] }).synth();

```

