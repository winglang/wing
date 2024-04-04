# [example.test.w](../../../../../../../../examples/tests/../../tools/hangar/src/test_corpus/doc_examples/01-preflight-and-inflight.md_example_2/example.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
    },
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_s3_bucket": {
      "Bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/Default",
            "uniqueId": "Bucket"
          }
        },
        "bucket_prefix": "bucket-c88fdc5f-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_policy": {
      "Bucket_PublicPolicy_9F2BCFC1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/PublicPolicy",
            "uniqueId": "Bucket_PublicPolicy_9F2BCFC1"
          }
        },
        "bucket": "${aws_s3_bucket.Bucket.bucket}",
        "depends_on": [
          "aws_s3_bucket_public_access_block.Bucket_PublicAccessBlock_A34F3B5C"
        ],
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":[\"s3:GetObject\"],\"Resource\":[\"${aws_s3_bucket.Bucket.arn}/*\"]}]}"
      }
    },
    "aws_s3_bucket_public_access_block": {
      "Bucket_PublicAccessBlock_A34F3B5C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/PublicAccessBlock",
            "uniqueId": "Bucket_PublicAccessBlock_A34F3B5C"
          }
        },
        "block_public_acls": false,
        "block_public_policy": false,
        "bucket": "${aws_s3_bucket.Bucket.bucket}",
        "ignore_public_acls": false,
        "restrict_public_buckets": false
      }
    },
    "aws_s3_object": {
      "Bucket_S3Object-file1txt_A14F86D6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/S3Object-file1.txt",
            "uniqueId": "Bucket_S3Object-file1txt_A14F86D6"
          }
        },
        "bucket": "${aws_s3_bucket.Bucket.bucket}",
        "content": "Hello world!",
        "key": "file1.txt"
      }
    }
  }
}
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const bucket = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket", { public: true });
    (bucket.addObject("file1.txt", "Hello world!"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "example.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

