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
      "root_cloudWebsite_FilebasenamepathsuffixifsuffixundefinedvalidateStringsuffixextvalidateStringpathpathletstart0letend1letmatchedSlashtrueifsuffixundefinedsuffixlength0suffixlengthpathlengthifsuffixpathreturnletextIdxsuffixlength1letfirstNon_9DC0852D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/File-basename(path, suffix) {\n    if (suffix !== undefined)\n      validateString(suffix, 'ext');\n    validateString(path, 'path');\n\n    let start = 0;\n    let end = -1;\n    let matchedSlash = true;\n\n    if (suffix !== undefined && suffix.length > 0 && suffix.length <= path.length) {\n      if (suffix === path)\n        return '';\n      let extIdx = suffix.length - 1;\n      let firstNonSlashEnd = -1;\n      for (let i = path.length - 1; i >= 0; --i) {\n        const code = StringPrototypeCharCodeAt(path, i);\n        if (code === CHAR_FORWARD_SLASH) {\n          ---- If we reached a path separator that was not part of a set of path\n          ---- separators at the end of the string, stop now\n          if (!matchedSlash) {\n            start = i + 1;\n            break;\n          }\n        } else {\n          if (firstNonSlashEnd === -1) {\n            ---- We saw the first non-path separator, remember this index in case\n            ---- we need it if the extension ends up not matching\n            matchedSlash = false;\n            firstNonSlashEnd = i + 1;\n          }\n          if (extIdx >= 0) {\n            ---- Try to match the explicit extension\n            if (code === StringPrototypeCharCodeAt(suffix, extIdx)) {\n              if (--extIdx === -1) {\n                ---- We matched the extension, so mark this as the end of our path\n                ---- component\n                end = i;\n              }\n            } else {\n              ---- Extension does not match, so our result is the entire path\n              ---- component\n              extIdx = -1;\n              end = firstNonSlashEnd;\n            }\n          }\n        }\n      }\n\n      if (start === end)\n        end = firstNonSlashEnd;\n      else if (end === -1)\n        end = path.length;\n      return StringPrototypeSlice(path, start, end);\n    }\n    for (let i = path.length - 1; i >= 0; --i) {\n      if (StringPrototypeCharCodeAt(path, i) === CHAR_FORWARD_SLASH) {\n        ---- If we reached a path separator that was not part of a set of path\n        ---- separators at the end of the string, stop now\n        if (!matchedSlash) {\n          start = i + 1;\n          break;\n        }\n      } else if (end === -1) {\n        ---- We saw the first non-path separator, mark this as the end of our\n        ---- path component\n        matchedSlash = false;\n        end = i + 1;\n      }\n    }\n\n    if (end === -1)\n      return '';\n    return StringPrototypeSlice(path, start, end);\n  }-2889493a",
            "uniqueId": "root_cloudWebsite_FilebasenamepathsuffixifsuffixundefinedvalidateStringsuffixextvalidateStringpathpathletstart0letend1letmatchedSlashtrueifsuffixundefinedsuffixlength0suffixlengthpathlengthifsuffixpathreturnletextIdxsuffixlength1letfirstNon_9DC0852D"
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
      "root_cloudWebsite_FilebasenamepathsuffixifsuffixundefinedvalidateStringsuffixextvalidateStringpathpathletstart0letend1letmatchedSlashtrueifsuffixundefinedsuffixlength0suffixlengthpathlengthifsuffixpathreturnletextIdxsuffixlength1letfirstNon_D0314DD8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/File-basename(path, suffix) {\n    if (suffix !== undefined)\n      validateString(suffix, 'ext');\n    validateString(path, 'path');\n\n    let start = 0;\n    let end = -1;\n    let matchedSlash = true;\n\n    if (suffix !== undefined && suffix.length > 0 && suffix.length <= path.length) {\n      if (suffix === path)\n        return '';\n      let extIdx = suffix.length - 1;\n      let firstNonSlashEnd = -1;\n      for (let i = path.length - 1; i >= 0; --i) {\n        const code = StringPrototypeCharCodeAt(path, i);\n        if (code === CHAR_FORWARD_SLASH) {\n          ---- If we reached a path separator that was not part of a set of path\n          ---- separators at the end of the string, stop now\n          if (!matchedSlash) {\n            start = i + 1;\n            break;\n          }\n        } else {\n          if (firstNonSlashEnd === -1) {\n            ---- We saw the first non-path separator, remember this index in case\n            ---- we need it if the extension ends up not matching\n            matchedSlash = false;\n            firstNonSlashEnd = i + 1;\n          }\n          if (extIdx >= 0) {\n            ---- Try to match the explicit extension\n            if (code === StringPrototypeCharCodeAt(suffix, extIdx)) {\n              if (--extIdx === -1) {\n                ---- We matched the extension, so mark this as the end of our path\n                ---- component\n                end = i;\n              }\n            } else {\n              ---- Extension does not match, so our result is the entire path\n              ---- component\n              extIdx = -1;\n              end = firstNonSlashEnd;\n            }\n          }\n        }\n      }\n\n      if (start === end)\n        end = firstNonSlashEnd;\n      else if (end === -1)\n        end = path.length;\n      return StringPrototypeSlice(path, start, end);\n    }\n    for (let i = path.length - 1; i >= 0; --i) {\n      if (StringPrototypeCharCodeAt(path, i) === CHAR_FORWARD_SLASH) {\n        ---- If we reached a path separator that was not part of a set of path\n        ---- separators at the end of the string, stop now\n        if (!matchedSlash) {\n          start = i + 1;\n          break;\n        }\n      } else if (end === -1) {\n        ---- We saw the first non-path separator, mark this as the end of our\n        ---- path component\n        matchedSlash = false;\n        end = i + 1;\n      }\n    }\n\n    if (end === -1)\n      return '';\n    return StringPrototypeSlice(path, start, end);\n  }-102b858e",
            "uniqueId": "root_cloudWebsite_FilebasenamepathsuffixifsuffixundefinedvalidateStringsuffixextvalidateStringpathpathletstart0letend1letmatchedSlashtrueifsuffixundefinedsuffixlength0suffixlengthpathlengthifsuffixpathreturnletextIdxsuffixlength1letfirstNon_D0314DD8"
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

