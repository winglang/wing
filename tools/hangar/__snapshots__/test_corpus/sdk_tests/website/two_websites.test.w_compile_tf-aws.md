# [two_websites.test.w](../../../../../../tests/sdk_tests/website/two_websites.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root"
    },
    "outputs": {
      "root": {
        "Default": {
          "Default": {
            "Website": {
              "Endpoint": {
                "Url": "Website_Endpoint_Url_0CC0343F"
              }
            },
            "website-2": {
              "Endpoint": {
                "Url": "website-2_Endpoint_Url_B3891500"
              }
            }
          }
        }
      }
    }
  },
  "data": {
    "aws_iam_policy_document": {
      "Website_AllowDistributionReadOnly_24CFF6C0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Website/AllowDistributionReadOnly",
            "uniqueId": "Website_AllowDistributionReadOnly_24CFF6C0"
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
                  "${aws_cloudfront_distribution.Website_Distribution_5E840E42.arn}"
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
              "${aws_s3_bucket.Website_WebsiteBucket_3C0321F0.arn}/*"
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
    "Website_Endpoint_Url_0CC0343F": {
      "value": "https://${aws_cloudfront_distribution.Website_Distribution_5E840E42.domain_name}"
    },
    "website-2_Endpoint_Url_B3891500": {
      "value": "https://${aws_cloudfront_distribution.website-2_Distribution_F1FA4680.domain_name}"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudfront_distribution": {
      "Website_Distribution_5E840E42": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Website/Distribution",
            "uniqueId": "Website_Distribution_5E840E42"
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
            "domain_name": "${aws_s3_bucket.Website_WebsiteBucket_3C0321F0.bucket_regional_domain_name}",
            "origin_access_control_id": "${aws_cloudfront_origin_access_control.Website_CloudfrontOac_756836A4.id}",
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
      "Website_CloudfrontOac_756836A4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Website/CloudfrontOac",
            "uniqueId": "Website_CloudfrontOac_756836A4"
          }
        },
        "name": "Website-c80d509a-cloudfront-oac",
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
      "Website_WebsiteBucket_3C0321F0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Website/WebsiteBucket",
            "uniqueId": "Website_WebsiteBucket_3C0321F0"
          }
        },
        "bucket_prefix": "website-c80d509a-",
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
      "Website_DistributionS3BucketPolicy_09AE0BCA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Website/DistributionS3BucketPolicy",
            "uniqueId": "Website_DistributionS3BucketPolicy_09AE0BCA"
          }
        },
        "bucket": "${aws_s3_bucket.Website_WebsiteBucket_3C0321F0.id}",
        "policy": "${data.aws_iam_policy_document.Website_AllowDistributionReadOnly_24CFF6C0.json}"
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
      "Website_BucketWebsiteConfiguration_58F891B4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Website/BucketWebsiteConfiguration",
            "uniqueId": "Website_BucketWebsiteConfiguration_58F891B4"
          }
        },
        "bucket": "${aws_s3_bucket.Website_WebsiteBucket_3C0321F0.bucket}",
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
      "Website_File--errorhtml_702870FC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Website/File--error.html",
            "uniqueId": "Website_File--errorhtml_702870FC"
          }
        },
        "bucket": "${aws_s3_bucket.Website_WebsiteBucket_3C0321F0.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.Website_WebsiteBucket_3C0321F0"
        ],
        "key": "/error.html",
        "source": "<SOURCE>",
        "source_hash": "${filemd5(<SOURCE>)}"
      },
      "Website_File--indexhtml_864F8C36": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Website/File--index.html",
            "uniqueId": "Website_File--indexhtml_864F8C36"
          }
        },
        "bucket": "${aws_s3_bucket.Website_WebsiteBucket_3C0321F0.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.Website_WebsiteBucket_3C0321F0"
        ],
        "key": "/index.html",
        "source": "<SOURCE>",
        "source_hash": "${filemd5(<SOURCE>)}"
      },
      "Website_File--inner-folder--otherhtml_3FCEBB4A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Website/File--inner-folder--other.html",
            "uniqueId": "Website_File--inner-folder--otherhtml_3FCEBB4A"
          }
        },
        "bucket": "${aws_s3_bucket.Website_WebsiteBucket_3C0321F0.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.Website_WebsiteBucket_3C0321F0"
        ],
        "key": "/inner-folder/other.html",
        "source": "<SOURCE>",
        "source_hash": "${filemd5(<SOURCE>)}"
      },
      "website-2_File--errorhtml_1E2B4001": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/website-2/File--error.html",
            "uniqueId": "website-2_File--errorhtml_1E2B4001"
          }
        },
        "bucket": "${aws_s3_bucket.website-2_WebsiteBucket_59576A0C.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.website-2_WebsiteBucket_59576A0C"
        ],
        "key": "/error.html",
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

