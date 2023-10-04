# [two_websites.test.w](../../../../../../examples/tests/sdk_tests/website/two_websites.test.w) | compile | tf-aws

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
      "value": "[]"
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
    "aws_s3_bucket": {
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
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
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
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $http_Util: ${context._lift($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
            $w1_url: ${context._lift(w1.url)},
            $w2_url: ${context._lift(w2.url)},
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
new $App({ outdir: $outdir, name: "two_websites.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

