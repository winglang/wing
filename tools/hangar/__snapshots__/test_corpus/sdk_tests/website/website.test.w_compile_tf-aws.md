# [website.test.w](../../../../../../examples/tests/sdk_tests/website/website.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $config, $htmlContent, $http_Util, $indexFile, $otherFile, $std_Json, $w_url }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: http.get(w.url).body == indexFile")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $http_Util.get($w_url)).body,$indexFile)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: http.get(w.url + \"/inner-folder/other.html\").body == otherFile")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $http_Util.get(($w_url + "/inner-folder/other.html"))).body,$otherFile)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: http.get(w.url + \"/config.json\").body == Json.stringify(config)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $http_Util.get(($w_url + "/config.json"))).body,((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([$config]))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: http.get(w.url + \"/another-file.html\").body == htmlContent")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $http_Util.get(($w_url + "/another-file.html"))).body,$htmlContent)))};
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
    "outputs": {}
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
        "name": "cloud-We-c8e58765-cloudfront-oac",
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
      "cloudWebsite_File-another-filehtml_C41CE440": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/File-another-file.html",
            "uniqueId": "cloudWebsite_File-another-filehtml_C41CE440"
          }
        },
        "bucket": "${aws_s3_bucket.cloudWebsite_WebsiteBucket_EB03D355.bucket}",
        "content": "<html>Hello World!</html>",
        "content_type": "text/html",
        "depends_on": [
          "aws_s3_bucket.cloudWebsite_WebsiteBucket_EB03D355"
        ],
        "key": "another-file.html"
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
const http = $stdlib.http;
const fs = $stdlib.fs;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.cjs")({
            $config: ${context._lift(config)},
            $htmlContent: ${context._lift(htmlContent)},
            $http_Util: ${context._lift($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
            $indexFile: ${context._lift(indexFile)},
            $otherFile: ${context._lift(otherFile)},
            $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
            $w_url: ${context._lift(w.url)},
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
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(config, host, []);
          $Closure1._registerOnLiftObject(htmlContent, host, []);
          $Closure1._registerOnLiftObject(indexFile, host, []);
          $Closure1._registerOnLiftObject(otherFile, host, []);
          $Closure1._registerOnLiftObject(w.url, host, ["body"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const w = this.node.root.newAbstract("@winglang/sdk.cloud.Website",this, "cloud.Website", { path: "./website" });
    const config = ({"json": 1});
    const htmlContent = "<html>Hello World!</html>";
    const indexFile = (fs.Util.readFile(String.raw({ raw: ["", "/index.html"] }, w.path)));
    const otherFile = (fs.Util.readFile(String.raw({ raw: ["", "/inner-folder/other.html"] }, w.path)));
    (w.addJson("config.json", config));
    (w.addFile("another-file.html", htmlContent, { contentType: "text/html" }));
    {((cond) => {if (!cond) throw new Error("assertion failed: w.path.endsWith(\"sdk_tests/website/website\") || w.path.endsWith(\"sdk_tests\\\\website\\\\website\")")})((w.path.endsWith("sdk_tests/website/website") || w.path.endsWith("sdk_tests\\website\\website")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:access files on the website", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "website.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

