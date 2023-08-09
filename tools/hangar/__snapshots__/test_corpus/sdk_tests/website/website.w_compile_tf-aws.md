# [website.w](../../../../../../examples/tests/sdk_tests/website/website.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $config, $http_Util, $indexFile, $otherFile, $std_Json, $w_url }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      let url = $w_url;
      if ((!url.startsWith("http"))) {
        url = ("http://" + url);
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: http.get(url).body == indexFile")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $http_Util.get(url)).body,$indexFile)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: http.get(url + \"/inner-folder/other.html\").body == otherFile")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $http_Util.get((url + "/inner-folder/other.html"))).body,$otherFile)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: http.get(url + \"/config.json\").body == Json.stringify(config)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $http_Util.get((url + "/config.json"))).body,((args) => { return JSON.stringify(args[0], null, args[1]) })([$config]))))};
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
        "undefined": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "data": {
    "aws_iam_policy_document": {
      "undefined_cloudWebsite_AllowDistributionReadOnly_77DF4812": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/AllowDistributionReadOnly",
            "uniqueId": "undefined_cloudWebsite_AllowDistributionReadOnly_77DF4812"
          }
        },
        "statement": [
          {
            "actions": [
              "s3:GetObject"
            ],
            "condition": [
              {
                "test": "StringEquals",
                "values": [
                  "${aws_cloudfront_distribution.undefined_cloudWebsite_Distribution_1CA30B8E.arn}"
                ],
                "variable": "AWS:SourceArn"
              }
            ],
            "principals": [
              {
                "identifiers": [
                  "cloudfront.amazonaws.com"
                ],
                "type": "Service"
              }
            ],
            "resources": [
              "${aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691.arn}/*"
            ]
          }
        ]
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/undefined/Default/test:access files on the website\",\"${aws_lambda_function.undefined_testaccessfilesonthewebsite_Handler_793E12A8.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudfront_distribution": {
      "undefined_cloudWebsite_Distribution_1CA30B8E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/Distribution",
            "uniqueId": "undefined_cloudWebsite_Distribution_1CA30B8E"
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
            "domain_name": "${aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691.bucket_regional_domain_name}",
            "origin_access_control_id": "${aws_cloudfront_origin_access_control.undefined_cloudWebsite_CloudfrontOac_59E8E5A1.id}",
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
    "aws_cloudfront_origin_access_control": {
      "undefined_cloudWebsite_CloudfrontOac_59E8E5A1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/CloudfrontOac",
            "uniqueId": "undefined_cloudWebsite_CloudfrontOac_59E8E5A1"
          }
        },
        "name": "cloudfront-oac",
        "origin_access_control_origin_type": "s3",
        "signing_behavior": "always",
        "signing_protocol": "sigv4"
      }
    },
    "aws_iam_role": {
      "undefined_testaccessfilesonthewebsite_Handler_IamRole_CFE9BFEE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access files on the website/Handler/IamRole",
            "uniqueId": "undefined_testaccessfilesonthewebsite_Handler_IamRole_CFE9BFEE"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testaccessfilesonthewebsite_Handler_IamRolePolicy_D19A1E86": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access files on the website/Handler/IamRolePolicy",
            "uniqueId": "undefined_testaccessfilesonthewebsite_Handler_IamRolePolicy_D19A1E86"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testaccessfilesonthewebsite_Handler_IamRole_CFE9BFEE.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testaccessfilesonthewebsite_Handler_IamRolePolicyAttachment_1E80BD14": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access files on the website/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testaccessfilesonthewebsite_Handler_IamRolePolicyAttachment_1E80BD14"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testaccessfilesonthewebsite_Handler_IamRole_CFE9BFEE.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testaccessfilesonthewebsite_Handler_793E12A8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access files on the website/Handler/Default",
            "uniqueId": "undefined_testaccessfilesonthewebsite_Handler_793E12A8"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8b4ee30",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_14": "${jsonencode(aws_cloudfront_distribution.undefined_cloudWebsite_Distribution_1CA30B8E.domain_name)}"
          }
        },
        "function_name": "Handler-c8b4ee30",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testaccessfilesonthewebsite_Handler_IamRole_CFE9BFEE.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testaccessfilesonthewebsite_Handler_S3Object_F291F3F9.key}",
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
      },
      "undefined_cloudWebsite_WebsiteBucket_6AF09691": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/WebsiteBucket",
            "uniqueId": "undefined_cloudWebsite_WebsiteBucket_6AF09691"
          }
        },
        "bucket_prefix": "cloud-website-c8a0a3b5-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_policy": {
      "undefined_cloudWebsite_DistributionS3BucketPolicy_63A56202": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/DistributionS3BucketPolicy",
            "uniqueId": "undefined_cloudWebsite_DistributionS3BucketPolicy_63A56202"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691.id}",
        "policy": "${data.aws_iam_policy_document.undefined_cloudWebsite_AllowDistributionReadOnly_77DF4812.json}"
      }
    },
    "aws_s3_bucket_public_access_block": {
      "undefined_cloudWebsite_PublicAccessBlock_FEA8B01D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/PublicAccessBlock",
            "uniqueId": "undefined_cloudWebsite_PublicAccessBlock_FEA8B01D"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "undefined_cloudWebsite_Encryption_D10D0AD9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/Encryption",
            "uniqueId": "undefined_cloudWebsite_Encryption_D10D0AD9"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691.bucket}",
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
      "undefined_cloudWebsite_BucketWebsiteConfiguration_5EFCE1BD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/BucketWebsiteConfiguration",
            "uniqueId": "undefined_cloudWebsite_BucketWebsiteConfiguration_5EFCE1BD"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691.bucket}",
        "index_document": {
          "suffix": "index.html"
        }
      }
    },
    "aws_s3_object": {
      "undefined_cloudWebsite_File--indexhtml_D4B858B4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/File--index.html",
            "uniqueId": "undefined_cloudWebsite_File--indexhtml_D4B858B4"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691"
        ],
        "key": "/index.html",
        "source": "<SOURCE>"
      },
      "undefined_cloudWebsite_File--inner-folder--otherhtml_0A0323E6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/File--inner-folder--other.html",
            "uniqueId": "undefined_cloudWebsite_File--inner-folder--otherhtml_0A0323E6"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691"
        ],
        "key": "/inner-folder/other.html",
        "source": "<SOURCE>"
      },
      "undefined_cloudWebsite_File-configjson_AD240E0F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/File-config.json",
            "uniqueId": "undefined_cloudWebsite_File-configjson_AD240E0F"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691.bucket}",
        "content": "{\"json\":1}",
        "content_type": "application/json",
        "depends_on": [
          "aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691"
        ],
        "key": "config.json"
      },
      "undefined_testaccessfilesonthewebsite_Handler_S3Object_F291F3F9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access files on the website/Handler/S3Object",
            "uniqueId": "undefined_testaccessfilesonthewebsite_Handler_S3Object_F291F3F9"
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
const http = $stdlib.http;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Util extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
      }
      static readFile(path) {
        return (require("<ABSOLUTE_PATH>/fs.js")["readFile"])(path)
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Util.js")({
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
          require("./inflight.$Closure1.js")({
            $config: ${context._lift(config)},
            $http_Util: ${context._lift(http.Util)},
            $indexFile: ${context._lift(indexFile)},
            $otherFile: ${context._lift(otherFile)},
            $std_Json: ${context._lift(std.Json)},
            $w_url: ${context._lift(w.url)},
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
          $Closure1._registerBindObject(config, host, []);
          $Closure1._registerBindObject(indexFile, host, []);
          $Closure1._registerBindObject(otherFile, host, []);
          $Closure1._registerBindObject(w.url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const w = this.node.root.newAbstract("@winglang/sdk.cloud.Website",this,"cloud.Website",{ path: "./website" });
    const config = ({"json": 1});
    const indexFile = (Util.readFile("./website/website/index.html"));
    const otherFile = (Util.readFile("./website/website/inner-folder/other.html"));
    (w.addJson("config.json",config));
    {((cond) => {if (!cond) throw new Error("assertion failed: w.path.endsWith(\"sdk_tests/website/website\") || w.path.endsWith(\"sdk_tests\\\\website\\\\website\")")})((w.path.endsWith("sdk_tests/website/website") || w.path.endsWith("sdk_tests\\website\\website")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:access files on the website",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "website", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

