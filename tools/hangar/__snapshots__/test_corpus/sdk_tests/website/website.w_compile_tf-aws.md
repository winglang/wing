# [website.w](../../../../../../examples/tests/sdk_tests/website/website.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ w, indexFile, otherFile, config, std_Json, Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(((args) => { return JSON.stringify(args[0], null, args[1]) })([((await Util.http(w.url)))["body"]]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([indexFile]))'`)})((((args) => { return JSON.stringify(args[0], null, args[1]) })([((await Util.http(w.url)))["body"]]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([indexFile])))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(((args) => { return JSON.stringify(args[0], null, args[1]) })([((await Util.http((w.url + "/inner-folder/other.html"))))["body"]]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([otherFile]))'`)})((((args) => { return JSON.stringify(args[0], null, args[1]) })([((await Util.http((w.url + "/inner-folder/other.html"))))["body"]]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([otherFile])))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(((args) => { return JSON.stringify(args[0], null, args[1]) })([((await Util.http((w.url + "/config.json"))))["body"]]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([((args) => { return JSON.stringify(args[0], null, args[1]) })([config])]))'`)})((((args) => { return JSON.stringify(args[0], null, args[1]) })([((await Util.http((w.url + "/config.json"))))["body"]]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([((args) => { return JSON.stringify(args[0], null, args[1]) })([config])])))};
    }
  }
  return $Closure1;
}

```

## inflight.Util.js
```js
module.exports = function({  }) {
  class Util {
    constructor({  }) {
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
    static async http(url)  {
      return (require("<ABSOLUTE_PATH>/http.js")["http"])(url)
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
      "version": "0.15.2"
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
      "value": "[[\"root/Default/Default/test:access files on the website\",\"${aws_lambda_function.root_testaccessfilesonthewebsite_Handler_C97B2B6F.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudfront_distribution": {
      "root_cloudWebsite_Distribution_6BC863F8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/Distribution",
            "uniqueId": "root_cloudWebsite_Distribution_6BC863F8"
          }
        },
        "default_cache_behavior": {
          "allowed_methods": [
            "GET",
            "HEAD"
          ],
          "cached_methods": [
            "GET",
            "HEAD"
          ],
          "compress": true,
          "default_ttl": 3600,
          "forwarded_values": {
            "cookies": {
              "forward": "none"
            },
            "query_string": false
          },
          "max_ttl": 86400,
          "min_ttl": 0,
          "target_origin_id": "s3Origin",
          "viewer_protocol_policy": "redirect-to-https"
        },
        "default_root_object": "index.html",
        "enabled": true,
        "origin": [
          {
            "domain_name": "${aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE.bucket_regional_domain_name}",
            "origin_id": "s3Origin"
          }
        ],
        "price_class": "PriceClass_100",
        "restrictions": {
          "geo_restriction": {
            "locations": [],
            "restriction_type": "none"
          }
        },
        "viewer_certificate": {
          "cloudfront_default_certificate": true
        }
      }
    },
    "aws_iam_role": {
      "root_testaccessfilesonthewebsite_Handler_IamRole_359FBA18": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access files on the website/Handler/IamRole",
            "uniqueId": "root_testaccessfilesonthewebsite_Handler_IamRole_359FBA18"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testaccessfilesonthewebsite_Handler_IamRolePolicy_2BFFD84E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access files on the website/Handler/IamRolePolicy",
            "uniqueId": "root_testaccessfilesonthewebsite_Handler_IamRolePolicy_2BFFD84E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testaccessfilesonthewebsite_Handler_IamRole_359FBA18.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testaccessfilesonthewebsite_Handler_IamRolePolicyAttachment_2FF11015": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access files on the website/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testaccessfilesonthewebsite_Handler_IamRolePolicyAttachment_2FF11015"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testaccessfilesonthewebsite_Handler_IamRole_359FBA18.name}"
      }
    },
    "aws_lambda_function": {
      "root_testaccessfilesonthewebsite_Handler_C97B2B6F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access files on the website/Handler/Default",
            "uniqueId": "root_testaccessfilesonthewebsite_Handler_C97B2B6F"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c867c4e0",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_11": "${jsonencode(aws_cloudfront_distribution.root_cloudWebsite_Distribution_6BC863F8.domain_name)}"
          }
        },
        "function_name": "Handler-c867c4e0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testaccessfilesonthewebsite_Handler_IamRole_359FBA18.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testaccessfilesonthewebsite_Handler_S3Object_63750589.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "root_Code_02F3C603": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "root_Code_02F3C603"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      },
      "root_cloudWebsite_WebsiteBucket_E28E35CE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/WebsiteBucket",
            "uniqueId": "root_cloudWebsite_WebsiteBucket_E28E35CE"
          }
        },
        "bucket_prefix": "cloud-website-c8e58765-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_policy": {
      "root_cloudWebsite_PublicPolicy_2884A0C6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/PublicPolicy",
            "uniqueId": "root_cloudWebsite_PublicPolicy_2884A0C6"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE.bucket}",
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":[\"s3:GetObject\"],\"Resource\":[\"${aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE.arn}/*\"]}]}"
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_cloudWebsite_PublicAccessBlock_89CD01D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/PublicAccessBlock",
            "uniqueId": "root_cloudWebsite_PublicAccessBlock_89CD01D0"
          }
        },
        "block_public_acls": false,
        "block_public_policy": false,
        "bucket": "${aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE.bucket}",
        "ignore_public_acls": false,
        "restrict_public_buckets": false
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_cloudWebsite_Encryption_8B168696": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/Encryption",
            "uniqueId": "root_cloudWebsite_Encryption_8B168696"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      }
    },
    "aws_s3_bucket_website_configuration": {
      "root_cloudWebsite_BucketWebsiteConfiguration_DEE39F09": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/BucketWebsiteConfiguration",
            "uniqueId": "root_cloudWebsite_BucketWebsiteConfiguration_DEE39F09"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE.bucket}",
        "index_document": {
          "suffix": "index.html"
        }
      }
    },
    "aws_s3_object": {
      "root_cloudWebsite_Fileconfigjson_366296B1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/File-config.json",
            "uniqueId": "root_cloudWebsite_Fileconfigjson_366296B1"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE.bucket}",
        "content": "{\"json\":1}",
        "content_type": "application/json",
        "depends_on": [
          "aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE"
        ],
        "key": "config.json"
      },
      "root_cloudWebsite_Fileindexhtml_A07B6D26": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/File--index.html",
            "uniqueId": "root_cloudWebsite_Fileindexhtml_A07B6D26"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE"
        ],
        "key": "/index.html",
        "source": "<SOURCE>"
      },
      "root_cloudWebsite_Fileinnerfolderotherhtml_28F0E842": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/File--inner-folder--other.html",
            "uniqueId": "root_cloudWebsite_Fileinnerfolderotherhtml_28F0E842"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE"
        ],
        "key": "/inner-folder/other.html",
        "source": "<SOURCE>"
      },
      "root_testaccessfilesonthewebsite_Handler_S3Object_63750589": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access files on the website/Handler/S3Object",
            "uniqueId": "root_testaccessfilesonthewebsite_Handler_S3Object_63750589"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
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
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Util extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("http");
        const __parent_this = this;
      }
      static readFile(path)  {
        return (require("<ABSOLUTE_PATH>/fs.js")["readFile"])(path)
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Util.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        if (ops.includes("http")) {
        }
        super._registerTypeBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const w_client = context._lift(w);
        const indexFile_client = context._lift(indexFile);
        const otherFile_client = context._lift(otherFile);
        const config_client = context._lift(config);
        const std_JsonClient = std.Json._toInflightType(context);
        const UtilClient = Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            w: ${w_client},
            indexFile: ${indexFile_client},
            otherFile: ${otherFile_client},
            config: ${config_client},
            std_Json: ${std_JsonClient.text},
            Util: ${UtilClient.text},
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
        if (ops.includes("$inflight_init")) {
          $Closure1._registerBindObject(config, host, []);
          $Closure1._registerBindObject(indexFile, host, []);
          $Closure1._registerBindObject(otherFile, host, []);
          $Closure1._registerBindObject(w, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(Util, host, ["http"]);
          $Closure1._registerBindObject(config, host, []);
          $Closure1._registerBindObject(indexFile, host, []);
          $Closure1._registerBindObject(otherFile, host, []);
          $Closure1._registerBindObject(w.url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const w = this.node.root.newAbstract("@winglang/sdk.cloud.Website",this,"cloud.Website",{ path: "./website" });
    const config = Object.freeze({"json":1});
    const indexFile = (Util.readFile("./website/website/index.html"));
    const otherFile = (Util.readFile("./website/website/inner-folder/other.html"));
    (w.addJson("config.json",config));
    {((cond) => {if (!cond) throw new Error(`assertion failed: 'w.path.endsWith("sdk_tests/website/website")'`)})(w.path.endsWith("sdk_tests/website/website"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:access files on the website",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "website", plugins: $plugins, isTestEnvironment: $wing_is_test });
    if ($wing_is_test) {
      new $Root(this, "env0");
      const $test_runner = this.testRunner;
      const $tests = $test_runner.findTests();
      for (let $i = 1; $i < $tests.length; $i++) {
        new $Root(this, "env" + $i);
      }
    } else {
      new $Root(this, "Default");
    }
  }
}
new $App().synth();

```

