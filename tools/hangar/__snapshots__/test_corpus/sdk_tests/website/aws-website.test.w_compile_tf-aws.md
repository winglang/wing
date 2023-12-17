# [aws-website.test.w](../../../../../../examples/tests/sdk_tests/website/aws-website.test.w) | compile | tf-aws

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
            "aws-wing-website": {
              "Endpoint": {
                "Url": "aws-wing-website_Endpoint_Url_2C61EBBC"
              }
            }
          }
        }
      }
    }
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
  "output": {
    "aws-wing-website_Endpoint_Url_2C61EBBC": {
      "value": "https://${aws_cloudfront_distribution.aws-wing-website_Distribution_87B2F767.domain_name}"
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

