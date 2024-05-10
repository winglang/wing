# [aws-react-app.test.w](../../../../../../tests/sdk_tests/website/aws-react-app.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
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
        "custom_error_response": [
          {
            "error_code": 404,
            "response_code": 200,
            "response_page_path": "/index.html"
          },
          {
            "error_code": 403,
            "response_code": 200,
            "response_page_path": "/index.html"
          }
        ],
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
        "error_document": {
          "key": "index.html"
        },
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

