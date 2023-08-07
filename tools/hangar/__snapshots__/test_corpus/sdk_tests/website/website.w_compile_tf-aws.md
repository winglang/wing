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
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "data": {
    "aws_iam_policy_document": {
      "cloudWebsite_AllowDistributionReadOnly_89DC4FD0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/AllowDistributionReadOnly",
            "uniqueId": "cloudWebsite_AllowDistributionReadOnly_89DC4FD0"
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
                  "${aws_cloudfront_distribution.cloudWebsite_Distribution_083B5AF9.arn}"
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
              "${aws_s3_bucket.cloudWebsite_WebsiteBucket_EB03D355.arn}/*"
            ]
          }
        ]
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/Default/Default/test:access files on the website\",\"${aws_lambda_function.testaccessfilesonthewebsite_Handler_B4D12109.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudfront_distribution": {
      "cloudWebsite_Distribution_083B5AF9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/Distribution",
            "uniqueId": "cloudWebsite_Distribution_083B5AF9"
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
            "domain_name": "${aws_s3_bucket.cloudWebsite_WebsiteBucket_EB03D355.bucket_regional_domain_name}",
            "origin_access_control_id": "${aws_cloudfront_origin_access_control.cloudWebsite_CloudfrontOac_C956968B.id}",
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
      "cloudWebsite_CloudfrontOac_C956968B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/CloudfrontOac",
            "uniqueId": "cloudWebsite_CloudfrontOac_C956968B"
          }
        },
        "name": "cloudfront-oac",
        "origin_access_control_origin_type": "s3",
        "signing_behavior": "always",
        "signing_protocol": "sigv4"
      }
    },
    "aws_iam_role": {
      "testaccessfilesonthewebsite_Handler_IamRole_1A1B55D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access files on the website/Handler/IamRole",
            "uniqueId": "testaccessfilesonthewebsite_Handler_IamRole_1A1B55D7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testaccessfilesonthewebsite_Handler_IamRolePolicy_D3277813": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access files on the website/Handler/IamRolePolicy",
            "uniqueId": "testaccessfilesonthewebsite_Handler_IamRolePolicy_D3277813"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testaccessfilesonthewebsite_Handler_IamRole_1A1B55D7.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testaccessfilesonthewebsite_Handler_IamRolePolicyAttachment_15B88AC9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access files on the website/Handler/IamRolePolicyAttachment",
            "uniqueId": "testaccessfilesonthewebsite_Handler_IamRolePolicyAttachment_15B88AC9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testaccessfilesonthewebsite_Handler_IamRole_1A1B55D7.name}"
      }
    },
    "aws_lambda_function": {
      "testaccessfilesonthewebsite_Handler_B4D12109": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access files on the website/Handler/Default",
            "uniqueId": "testaccessfilesonthewebsite_Handler_B4D12109"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c867c4e0",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_14": "${jsonencode(aws_cloudfront_distribution.cloudWebsite_Distribution_083B5AF9.domain_name)}"
          }
        },
        "function_name": "Handler-c867c4e0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testaccessfilesonthewebsite_Handler_IamRole_1A1B55D7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testaccessfilesonthewebsite_Handler_S3Object_BD206D0E.key}",
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
      "cloudWebsite_WebsiteBucket_EB03D355": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/WebsiteBucket",
            "uniqueId": "cloudWebsite_WebsiteBucket_EB03D355"
          }
        },
        "bucket_prefix": "cloud-website-c8e58765-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_policy": {
      "cloudWebsite_DistributionS3BucketPolicy_32B029AE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/DistributionS3BucketPolicy",
            "uniqueId": "cloudWebsite_DistributionS3BucketPolicy_32B029AE"
          }
        },
        "bucket": "${aws_s3_bucket.cloudWebsite_WebsiteBucket_EB03D355.id}",
        "policy": "${data.aws_iam_policy_document.cloudWebsite_AllowDistributionReadOnly_89DC4FD0.json}"
      }
    },
    "aws_s3_bucket_public_access_block": {
      "cloudWebsite_PublicAccessBlock_18A70311": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/PublicAccessBlock",
            "uniqueId": "cloudWebsite_PublicAccessBlock_18A70311"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.cloudWebsite_WebsiteBucket_EB03D355.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "cloudWebsite_Encryption_6A8A4E29": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/Encryption",
            "uniqueId": "cloudWebsite_Encryption_6A8A4E29"
          }
        },
        "bucket": "${aws_s3_bucket.cloudWebsite_WebsiteBucket_EB03D355.bucket}",
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
      "cloudWebsite_BucketWebsiteConfiguration_920E8E41": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/BucketWebsiteConfiguration",
            "uniqueId": "cloudWebsite_BucketWebsiteConfiguration_920E8E41"
          }
        },
        "bucket": "${aws_s3_bucket.cloudWebsite_WebsiteBucket_EB03D355.bucket}",
        "index_document": {
          "suffix": "index.html"
        }
      }
    },
    "aws_s3_object": {
      "cloudWebsite_File--indexhtml_2A2AE13C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/File--index.html",
            "uniqueId": "cloudWebsite_File--indexhtml_2A2AE13C"
          }
        },
        "bucket": "${aws_s3_bucket.cloudWebsite_WebsiteBucket_EB03D355.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.cloudWebsite_WebsiteBucket_EB03D355"
        ],
        "key": "/index.html",
        "source": "<SOURCE>"
      },
      "cloudWebsite_File--inner-folder--otherhtml_72DA631C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/File--inner-folder--other.html",
            "uniqueId": "cloudWebsite_File--inner-folder--otherhtml_72DA631C"
          }
        },
        "bucket": "${aws_s3_bucket.cloudWebsite_WebsiteBucket_EB03D355.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.cloudWebsite_WebsiteBucket_EB03D355"
        ],
        "key": "/inner-folder/other.html",
        "source": "<SOURCE>"
      },
      "cloudWebsite_File-configjson_591A81BA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/File-config.json",
            "uniqueId": "cloudWebsite_File-configjson_591A81BA"
          }
        },
        "bucket": "${aws_s3_bucket.cloudWebsite_WebsiteBucket_EB03D355.bucket}",
        "content": "{\"json\":1}",
        "content_type": "application/json",
        "depends_on": [
          "aws_s3_bucket.cloudWebsite_WebsiteBucket_EB03D355"
        ],
        "key": "config.json"
      },
      "testaccessfilesonthewebsite_Handler_S3Object_BD206D0E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access files on the website/Handler/S3Object",
            "uniqueId": "testaccessfilesonthewebsite_Handler_S3Object_BD206D0E"
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
new $App({ outdir: $outdir, name: "website", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

