# [two_websites.w](../../../../../../examples/tests/sdk_tests/website/two_websites.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $http_Util, $w1_url, $w2_url }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: http.get(w1.url).ok")})((await $http_Util.get($w1_url)).ok)};
      {((cond) => {if (!cond) throw new Error("assertion failed: http.get(w2.url).ok")})((await $http_Util.get($w2_url)).ok)};
    }
  }
  return $Closure1;
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
      },
      "website-2_AllowDistributionReadOnly_994269D9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/website-2/AllowDistributionReadOnly",
            "uniqueId": "website-2_AllowDistributionReadOnly_994269D9"
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
                  "${aws_cloudfront_distribution.website-2_Distribution_F1FA4680.arn}"
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
              "${aws_s3_bucket.website-2_WebsiteBucket_59576A0C.arn}/*"
            ]
          }
        ]
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/Default/Default/test:deploying two websites\",\"${aws_lambda_function.testdeployingtwowebsites_Handler_DDBE7E21.arn}\"]]"
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
      },
      "website-2_Distribution_F1FA4680": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/website-2/Distribution",
            "uniqueId": "website-2_Distribution_F1FA4680"
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
            "domain_name": "${aws_s3_bucket.website-2_WebsiteBucket_59576A0C.bucket_regional_domain_name}",
            "origin_access_control_id": "${aws_cloudfront_origin_access_control.website-2_CloudfrontOac_04F69FBB.id}",
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
        "name": "cloud-We-c8e58765-cloudfront-oac",
        "origin_access_control_origin_type": "s3",
        "signing_behavior": "always",
        "signing_protocol": "sigv4"
      },
      "website-2_CloudfrontOac_04F69FBB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/website-2/CloudfrontOac",
            "uniqueId": "website-2_CloudfrontOac_04F69FBB"
          }
        },
        "name": "website--c82d3b0f-cloudfront-oac",
        "origin_access_control_origin_type": "s3",
        "signing_behavior": "always",
        "signing_protocol": "sigv4"
      }
    },
    "aws_iam_role": {
      "testdeployingtwowebsites_Handler_IamRole_C5BF60A5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:deploying two websites/Handler/IamRole",
            "uniqueId": "testdeployingtwowebsites_Handler_IamRole_C5BF60A5"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testdeployingtwowebsites_Handler_IamRolePolicy_E99ED47B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:deploying two websites/Handler/IamRolePolicy",
            "uniqueId": "testdeployingtwowebsites_Handler_IamRolePolicy_E99ED47B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testdeployingtwowebsites_Handler_IamRole_C5BF60A5.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testdeployingtwowebsites_Handler_IamRolePolicyAttachment_54B8671A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:deploying two websites/Handler/IamRolePolicyAttachment",
            "uniqueId": "testdeployingtwowebsites_Handler_IamRolePolicyAttachment_54B8671A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testdeployingtwowebsites_Handler_IamRole_C5BF60A5.name}"
      }
    },
    "aws_lambda_function": {
      "testdeployingtwowebsites_Handler_DDBE7E21": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:deploying two websites/Handler/Default",
            "uniqueId": "testdeployingtwowebsites_Handler_DDBE7E21"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8683851",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_HTTPS_TFTOKEN_TOKEN_15": "${jsonencode(\"https://${aws_cloudfront_distribution.cloudWebsite_Distribution_083B5AF9.domain_name}\")}",
            "WING_TOKEN_HTTPS_TFTOKEN_TOKEN_30": "${jsonencode(\"https://${aws_cloudfront_distribution.website-2_Distribution_F1FA4680.domain_name}\")}"
          }
        },
        "function_name": "Handler-c8683851",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testdeployingtwowebsites_Handler_IamRole_C5BF60A5.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testdeployingtwowebsites_Handler_S3Object_E54888BB.key}",
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
      },
      "website-2_WebsiteBucket_59576A0C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/website-2/WebsiteBucket",
            "uniqueId": "website-2_WebsiteBucket_59576A0C"
          }
        },
        "bucket_prefix": "website-2-c82d3b0f-",
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
      },
      "website-2_DistributionS3BucketPolicy_C89BC83B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/website-2/DistributionS3BucketPolicy",
            "uniqueId": "website-2_DistributionS3BucketPolicy_C89BC83B"
          }
        },
        "bucket": "${aws_s3_bucket.website-2_WebsiteBucket_59576A0C.id}",
        "policy": "${data.aws_iam_policy_document.website-2_AllowDistributionReadOnly_994269D9.json}"
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
      },
      "website-2_Encryption_A1B72094": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/website-2/Encryption",
            "uniqueId": "website-2_Encryption_A1B72094"
          }
        },
        "bucket": "${aws_s3_bucket.website-2_WebsiteBucket_59576A0C.bucket}",
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
      },
      "website-2_BucketWebsiteConfiguration_FDEC4BAA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/website-2/BucketWebsiteConfiguration",
            "uniqueId": "website-2_BucketWebsiteConfiguration_FDEC4BAA"
          }
        },
        "bucket": "${aws_s3_bucket.website-2_WebsiteBucket_59576A0C.bucket}",
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
        "source": "<SOURCE>",
        "source_hash": "${filemd5(<SOURCE>)}"
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
        "source": "<SOURCE>",
        "source_hash": "${filemd5(<SOURCE>)}"
      },
      "testdeployingtwowebsites_Handler_S3Object_E54888BB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:deploying two websites/Handler/S3Object",
            "uniqueId": "testdeployingtwowebsites_Handler_S3Object_E54888BB"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "website-2_File--indexhtml_E2F4EB6E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/website-2/File--index.html",
            "uniqueId": "website-2_File--indexhtml_E2F4EB6E"
          }
        },
        "bucket": "${aws_s3_bucket.website-2_WebsiteBucket_59576A0C.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.website-2_WebsiteBucket_59576A0C"
        ],
        "key": "/index.html",
        "source": "<SOURCE>",
        "source_hash": "${filemd5(<SOURCE>)}"
      },
      "website-2_File--inner-folder--otherhtml_2D74B50A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/website-2/File--inner-folder--other.html",
            "uniqueId": "website-2_File--inner-folder--otherhtml_2D74B50A"
          }
        },
        "bucket": "${aws_s3_bucket.website-2_WebsiteBucket_59576A0C.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.website-2_WebsiteBucket_59576A0C"
        ],
        "key": "/inner-folder/other.html",
        "source": "<SOURCE>",
        "source_hash": "${filemd5(<SOURCE>)}"
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
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1-1.js")({
            $http_Util: ${context._lift(http.Util)},
            $w1_url: ${context._lift(w1.url)},
            $w2_url: ${context._lift(w2.url)},
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
          $Closure1._registerBindObject(w1.url, host, ["ok"]);
          $Closure1._registerBindObject(w2.url, host, ["ok"]);
        }
        super._registerBind(host, ops);
      }
    }
    const w1 = this.node.root.newAbstract("@winglang/sdk.cloud.Website",this,"cloud.Website",{ path: "./website" });
    const w2 = this.node.root.newAbstract("@winglang/sdk.cloud.Website",this,"website-2",{ path: "./website" });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:deploying two websites",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "two_websites", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

