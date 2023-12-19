# [aws-react-app.test.w](../../../../../../examples/tests/sdk_tests/website/aws-react-app.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $reactAppName, $target }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {
        const $if_let_value = $reactAppName;
        if ($if_let_value != undefined) {
          const website = $if_let_value;
          if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($target,"tf-aws"))) {
            {((cond) => {if (!cond) throw new Error("assertion failed: website.get(\"bucketArn\").contains(\"arn:aws:s3:::\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(website, "bucketArn").includes("arn:aws:s3:::"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: website.get(\"bucketArn\").contains(\"aws-wing-react-app\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(website, "bucketArn").includes("aws-wing-react-app"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: website.get(\"bucketName\").contains(\"aws-wing-react-app\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(website, "bucketName").includes("aws-wing-react-app"))};
          }
          else {
            {((cond) => {if (!cond) throw new Error("assertion failed: website.get(\"bucketArn\").contains(\"arn:aws:s3:::\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(website, "bucketArn").includes("arn:aws:s3:::"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: website.get(\"bucketArn\").contains(\"awswingreactapp\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(website, "bucketArn").includes("awswingreactapp"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: website.get(\"bucketName\").contains(\"awswingreactapp\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(website, "bucketName").includes("awswingreactapp"))};
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
    "outputs": {
      "root": {
        "Default": {
          "Default": {
            "aws-wing-react-app": {
              "aws-wing-react-app-host": {
                "Endpoint": {
                  "Url": "aws-wing-react-app_aws-wing-react-app-host_Endpoint_Url_6E5C5D26"
                }
              }
            }
          }
        }
      }
    }
  },
  "data": {
    "aws_iam_policy_document": {
      "aws-wing-react-app_aws-wing-react-app-host_AllowDistributionReadOnly_7A91DE38": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-react-app/aws-wing-react-app-host/AllowDistributionReadOnly",
            "uniqueId": "aws-wing-react-app_aws-wing-react-app-host_AllowDistributionReadOnly_7A91DE38"
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
                  "${aws_cloudfront_distribution.aws-wing-react-app_aws-wing-react-app-host_Distribution_4EBFE5E4.arn}"
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
              "${aws_s3_bucket.aws-wing-react-app_aws-wing-react-app-host_WebsiteBucket_8FC77516.arn}/*"
            ]
          }
        ]
      }
    }
  },
  "output": {
    "aws-wing-react-app_aws-wing-react-app-host_Endpoint_Url_6E5C5D26": {
      "value": "https://${aws_cloudfront_distribution.aws-wing-react-app_aws-wing-react-app-host_Distribution_4EBFE5E4.domain_name}"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudfront_distribution": {
      "aws-wing-react-app_aws-wing-react-app-host_Distribution_4EBFE5E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-react-app/aws-wing-react-app-host/Distribution",
            "uniqueId": "aws-wing-react-app_aws-wing-react-app-host_Distribution_4EBFE5E4"
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
            "domain_name": "${aws_s3_bucket.aws-wing-react-app_aws-wing-react-app-host_WebsiteBucket_8FC77516.bucket_regional_domain_name}",
            "origin_access_control_id": "${aws_cloudfront_origin_access_control.aws-wing-react-app_aws-wing-react-app-host_CloudfrontOac_3CFA2BB8.id}",
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
      "aws-wing-react-app_aws-wing-react-app-host_CloudfrontOac_3CFA2BB8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-react-app/aws-wing-react-app-host/CloudfrontOac",
            "uniqueId": "aws-wing-react-app_aws-wing-react-app-host_CloudfrontOac_3CFA2BB8"
          }
        },
        "name": "aws-wing-c818c394-cloudfront-oac",
        "origin_access_control_origin_type": "s3",
        "signing_behavior": "always",
        "signing_protocol": "sigv4"
      }
    },
    "aws_s3_bucket": {
      "aws-wing-react-app_aws-wing-react-app-host_WebsiteBucket_8FC77516": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-react-app/aws-wing-react-app-host/WebsiteBucket",
            "uniqueId": "aws-wing-react-app_aws-wing-react-app-host_WebsiteBucket_8FC77516"
          }
        },
        "bucket_prefix": "aws-wing-react-app-host-c818c394-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_policy": {
      "aws-wing-react-app_aws-wing-react-app-host_DistributionS3BucketPolicy_04AD3FD8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-react-app/aws-wing-react-app-host/DistributionS3BucketPolicy",
            "uniqueId": "aws-wing-react-app_aws-wing-react-app-host_DistributionS3BucketPolicy_04AD3FD8"
          }
        },
        "bucket": "${aws_s3_bucket.aws-wing-react-app_aws-wing-react-app-host_WebsiteBucket_8FC77516.id}",
        "policy": "${data.aws_iam_policy_document.aws-wing-react-app_aws-wing-react-app-host_AllowDistributionReadOnly_7A91DE38.json}"
      }
    },
    "aws_s3_bucket_website_configuration": {
      "aws-wing-react-app_aws-wing-react-app-host_BucketWebsiteConfiguration_FF549632": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-react-app/aws-wing-react-app-host/BucketWebsiteConfiguration",
            "uniqueId": "aws-wing-react-app_aws-wing-react-app-host_BucketWebsiteConfiguration_FF549632"
          }
        },
        "bucket": "${aws_s3_bucket.aws-wing-react-app_aws-wing-react-app-host_WebsiteBucket_8FC77516.bucket}",
        "index_document": {
          "suffix": "index.html"
        }
      }
    },
    "aws_s3_object": {
      "aws-wing-react-app_aws-wing-react-app-host_File--indexhtml_3A47E22E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-react-app/aws-wing-react-app-host/File--index.html",
            "uniqueId": "aws-wing-react-app_aws-wing-react-app-host_File--indexhtml_3A47E22E"
          }
        },
        "bucket": "${aws_s3_bucket.aws-wing-react-app_aws-wing-react-app-host_WebsiteBucket_8FC77516.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.aws-wing-react-app_aws-wing-react-app-host_WebsiteBucket_8FC77516"
        ],
        "key": "/index.html",
        "source": "<SOURCE>",
        "source_hash": "${filemd5(<SOURCE>)}"
      },
      "aws-wing-react-app_aws-wing-react-app-host_File--indexjs_8F298937": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-react-app/aws-wing-react-app-host/File--index.js",
            "uniqueId": "aws-wing-react-app_aws-wing-react-app-host_File--indexjs_8F298937"
          }
        },
        "bucket": "${aws_s3_bucket.aws-wing-react-app_aws-wing-react-app-host_WebsiteBucket_8FC77516.bucket}",
        "content_type": "application/javascript; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.aws-wing-react-app_aws-wing-react-app-host_WebsiteBucket_8FC77516"
        ],
        "key": "/index.js",
        "source": "<SOURCE>",
        "source_hash": "${filemd5(<SOURCE>)}"
      },
      "aws-wing-react-app_aws-wing-react-app-host_File-wingjs_EB4C8CA1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-react-app/aws-wing-react-app-host/File-wing.js",
            "uniqueId": "aws-wing-react-app_aws-wing-react-app-host_File-wingjs_EB4C8CA1"
          }
        },
        "bucket": "${aws_s3_bucket.aws-wing-react-app_aws-wing-react-app-host_WebsiteBucket_8FC77516.bucket}",
        "content": "// This file is generated by wing\nwindow.wingEnv = {};",
        "content_type": "text/javascript",
        "depends_on": [
          "aws_s3_bucket.aws-wing-react-app_aws-wing-react-app-host_WebsiteBucket_8FC77516"
        ],
        "key": "wing.js"
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
const ex = $stdlib.ex;
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
            $reactAppName: ${$stdlib.core.liftObject(reactAppName)},
            $target: ${$stdlib.core.liftObject(target)},
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
          $Closure1._registerOnLiftObject(reactAppName, host, []);
          $Closure1._registerOnLiftObject(target, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const target = (util.Util.env("WING_TARGET"));
    const reactApp = this.node.root.new("@winglang/sdk.ex.ReactApp", ex.ReactApp, this, "aws-wing-react-app", { projectPath: "./react-website", buildDir: "/build/public", useBuildCommand: true });
    const getReactAppInfo = ((b) => {
      {
        const $if_let_value = (aws.ReactApp.from(b));
        if ($if_let_value != undefined) {
          const website = $if_let_value;
          return ({"bucketName": website.bucketName, "bucketArn": website.bucketArn});
        }
      }
      return undefined;
    });
    const reactAppName = (getReactAppInfo(reactApp));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:validates the AWS bucket name", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "aws-react-app.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

