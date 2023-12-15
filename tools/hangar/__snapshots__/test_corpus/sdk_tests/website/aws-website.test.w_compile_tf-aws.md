# [aws-website.test.w](../../../../../../examples/tests/sdk_tests/website/aws-website.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $target, $websiteName }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {
        const $if_let_value = $websiteName;
        if ($if_let_value != undefined) {
          const website = $if_let_value;
          if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($target,"tf-aws"))) {
            {((cond) => {if (!cond) throw new Error("assertion failed: website.get(\"bucketArn\").contains(\"arn:aws:s3:::\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(website, "bucketArn").includes("arn:aws:s3:::"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: website.get(\"bucketArn\").contains(\"aws-wing-website\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(website, "bucketArn").includes("aws-wing-website"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: website.get(\"bucketName\").contains(\"aws-wing-website\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(website, "bucketName").includes("aws-wing-website"))};
          }
          else {
            {((cond) => {if (!cond) throw new Error("assertion failed: website.get(\"bucketArn\").contains(\"arn:aws:s3:::\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(website, "bucketArn").includes("arn:aws:s3:::"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: website.get(\"bucketArn\").contains(\"awswingwebsite\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(website, "bucketArn").includes("awswingwebsite"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: website.get(\"bucketName\").contains(\"awswingwebsite\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(website, "bucketName").includes("awswingwebsite"))};
          }
        }
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: true")})(true)};
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
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
  "data": {
    "aws_iam_policy_document": {
      "aws-wing-website_AllowDistributionReadOnly_469C08BC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-website/AllowDistributionReadOnly",
            "uniqueId": "aws-wing-website_AllowDistributionReadOnly_469C08BC"
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
                  "${aws_cloudfront_distribution.aws-wing-website_Distribution_87B2F767.arn}"
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
              "${aws_s3_bucket.aws-wing-website_WebsiteBucket_9D587AAD.arn}/*"
            ]
          }
        ]
      }
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudfront_distribution": {
      "aws-wing-website_Distribution_87B2F767": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-website/Distribution",
            "uniqueId": "aws-wing-website_Distribution_87B2F767"
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
            "domain_name": "${aws_s3_bucket.aws-wing-website_WebsiteBucket_9D587AAD.bucket_regional_domain_name}",
            "origin_access_control_id": "${aws_cloudfront_origin_access_control.aws-wing-website_CloudfrontOac_C755D0FB.id}",
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
      "aws-wing-website_CloudfrontOac_C755D0FB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-website/CloudfrontOac",
            "uniqueId": "aws-wing-website_CloudfrontOac_C755D0FB"
          }
        },
        "name": "aws-wing-c8d59b93-cloudfront-oac",
        "origin_access_control_origin_type": "s3",
        "signing_behavior": "always",
        "signing_protocol": "sigv4"
      }
    },
    "aws_s3_bucket": {
      "aws-wing-website_WebsiteBucket_9D587AAD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-website/WebsiteBucket",
            "uniqueId": "aws-wing-website_WebsiteBucket_9D587AAD"
          }
        },
        "bucket_prefix": "aws-wing-website-c8d59b93-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_policy": {
      "aws-wing-website_DistributionS3BucketPolicy_757C7D6B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-website/DistributionS3BucketPolicy",
            "uniqueId": "aws-wing-website_DistributionS3BucketPolicy_757C7D6B"
          }
        },
        "bucket": "${aws_s3_bucket.aws-wing-website_WebsiteBucket_9D587AAD.id}",
        "policy": "${data.aws_iam_policy_document.aws-wing-website_AllowDistributionReadOnly_469C08BC.json}"
      }
    },
    "aws_s3_bucket_website_configuration": {
      "aws-wing-website_BucketWebsiteConfiguration_E98448FD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-website/BucketWebsiteConfiguration",
            "uniqueId": "aws-wing-website_BucketWebsiteConfiguration_E98448FD"
          }
        },
        "bucket": "${aws_s3_bucket.aws-wing-website_WebsiteBucket_9D587AAD.bucket}",
        "index_document": {
          "suffix": "index.html"
        }
      }
    },
    "aws_s3_object": {
      "aws-wing-website_File--indexhtml_D03F523C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-website/File--index.html",
            "uniqueId": "aws-wing-website_File--indexhtml_D03F523C"
          }
        },
        "bucket": "${aws_s3_bucket.aws-wing-website_WebsiteBucket_9D587AAD.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.aws-wing-website_WebsiteBucket_9D587AAD"
        ],
        "key": "/index.html",
        "source": "<SOURCE>",
        "source_hash": "${filemd5(<SOURCE>)}"
      },
      "aws-wing-website_File--inner-folder--otherhtml_6D2D422E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-website/File--inner-folder--other.html",
            "uniqueId": "aws-wing-website_File--inner-folder--otherhtml_6D2D422E"
          }
        },
        "bucket": "${aws_s3_bucket.aws-wing-website_WebsiteBucket_9D587AAD.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.aws-wing-website_WebsiteBucket_9D587AAD"
        ],
        "key": "/inner-folder/other.html",
        "source": "<SOURCE>",
        "source_hash": "${filemd5(<SOURCE>)}"
      }
    }
  }
}
```

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const aws = $stdlib.aws;
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure1-1.cjs")({
            $target: ${$stdlib.core.liftObject(target)},
            $websiteName: ${$stdlib.core.liftObject(websiteName)},
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
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(target, host, []);
          $Closure1._registerOnLiftObject(websiteName, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const target = (util.Util.env("WING_TARGET"));
    const website = this.node.root.new("@winglang/sdk.cloud.Website", cloud.Website, this, "aws-wing-website", { path: "./website" });
    const getWebsiteInfo = ((b) => {
      {
        const $if_let_value = (aws.Website.from(b));
        if ($if_let_value != undefined) {
          const website = $if_let_value;
          return ({"bucketName": website.bucketName, "bucketArn": website.bucketArn});
        }
      }
      return undefined;
    });
    const websiteName = (getWebsiteInfo(website));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:validates the AWS bucket name", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "aws-website.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

