# [website.w](../../../../examples/tests/valid/website.w) | compile | tf-aws

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
    "aws_s3_bucket": {
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
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const w = this.node.root.newAbstract("@winglang/sdk.cloud.Website",this,"cloud.Website",{ path: "./website" });
    {console.log(`website is up and running on ${w.url}!`)};
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

