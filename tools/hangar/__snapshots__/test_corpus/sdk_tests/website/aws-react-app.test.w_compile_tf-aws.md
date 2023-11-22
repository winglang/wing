# [aws-react-app.test.w](../../../../../../examples/tests/sdk_tests/website/aws-react-app.test.w) | compile | tf-aws

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
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
          }
        }
      }
    }
  },
  "data": {
    "aws_iam_policy_document": {
      "aws-wing-react-app_host_AllowDistributionReadOnly_5EB6BD38": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-react-app/host/AllowDistributionReadOnly",
            "uniqueId": "aws-wing-react-app_host_AllowDistributionReadOnly_5EB6BD38"
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
                  "${aws_cloudfront_distribution.aws-wing-react-app_host_Distribution_775CD689.arn}"
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
              "${aws_s3_bucket.aws-wing-react-app_host_WebsiteBucket_12D3FA07.arn}/*"
            ]
          }
        ]
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
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
      "aws-wing-react-app_host_Distribution_775CD689": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-react-app/host/Distribution",
            "uniqueId": "aws-wing-react-app_host_Distribution_775CD689"
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
            "domain_name": "${aws_s3_bucket.aws-wing-react-app_host_WebsiteBucket_12D3FA07.bucket_regional_domain_name}",
            "origin_access_control_id": "${aws_cloudfront_origin_access_control.aws-wing-react-app_host_CloudfrontOac_7B543A1E.id}",
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
      "aws-wing-react-app_host_CloudfrontOac_7B543A1E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-react-app/host/CloudfrontOac",
            "uniqueId": "aws-wing-react-app_host_CloudfrontOac_7B543A1E"
          }
        },
        "name": "host-c82d1cab-cloudfront-oac",
        "origin_access_control_origin_type": "s3",
        "signing_behavior": "always",
        "signing_protocol": "sigv4"
      }
    },
    "aws_s3_bucket": {
      "aws-wing-react-app_host_WebsiteBucket_12D3FA07": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-react-app/host/WebsiteBucket",
            "uniqueId": "aws-wing-react-app_host_WebsiteBucket_12D3FA07"
          }
        },
        "bucket_prefix": "host-c82d1cab-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_policy": {
      "aws-wing-react-app_host_DistributionS3BucketPolicy_ED8490AB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-react-app/host/DistributionS3BucketPolicy",
            "uniqueId": "aws-wing-react-app_host_DistributionS3BucketPolicy_ED8490AB"
          }
        },
        "bucket": "${aws_s3_bucket.aws-wing-react-app_host_WebsiteBucket_12D3FA07.id}",
        "policy": "${data.aws_iam_policy_document.aws-wing-react-app_host_AllowDistributionReadOnly_5EB6BD38.json}"
      }
    },
    "aws_s3_bucket_website_configuration": {
      "aws-wing-react-app_host_BucketWebsiteConfiguration_8BE01875": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-react-app/host/BucketWebsiteConfiguration",
            "uniqueId": "aws-wing-react-app_host_BucketWebsiteConfiguration_8BE01875"
          }
        },
        "bucket": "${aws_s3_bucket.aws-wing-react-app_host_WebsiteBucket_12D3FA07.bucket}",
        "index_document": {
          "suffix": "index.html"
        }
      }
    },
    "aws_s3_object": {
      "aws-wing-react-app_host_File--indexhtml_7D3CCEA7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-react-app/host/File--index.html",
            "uniqueId": "aws-wing-react-app_host_File--indexhtml_7D3CCEA7"
          }
        },
        "bucket": "${aws_s3_bucket.aws-wing-react-app_host_WebsiteBucket_12D3FA07.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.aws-wing-react-app_host_WebsiteBucket_12D3FA07"
        ],
        "key": "/index.html",
        "source": "<SOURCE>",
        "source_hash": "${filemd5(<SOURCE>)}"
      },
      "aws-wing-react-app_host_File--indexjs_5BCD3C46": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-react-app/host/File--index.js",
            "uniqueId": "aws-wing-react-app_host_File--indexjs_5BCD3C46"
          }
        },
        "bucket": "${aws_s3_bucket.aws-wing-react-app_host_WebsiteBucket_12D3FA07.bucket}",
        "content_type": "application/javascript; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.aws-wing-react-app_host_WebsiteBucket_12D3FA07"
        ],
        "key": "/index.js",
        "source": "<SOURCE>",
        "source_hash": "${filemd5(<SOURCE>)}"
      },
      "aws-wing-react-app_host_File-wingjs_D9563767": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-react-app/host/File-wing.js",
            "uniqueId": "aws-wing-react-app_host_File-wingjs_D9563767"
          }
        },
        "bucket": "${aws_s3_bucket.aws-wing-react-app_host_WebsiteBucket_12D3FA07.bucket}",
        "content": "// This file is generated by wing\nwindow.wingEnv = {};",
        "content_type": "text/javascript",
        "depends_on": [
          "aws_s3_bucket.aws-wing-react-app_host_WebsiteBucket_12D3FA07"
        ],
        "key": "wing.js"
      }
    }
  }
}
```

