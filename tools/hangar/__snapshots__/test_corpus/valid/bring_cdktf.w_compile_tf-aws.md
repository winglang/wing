# [bring_cdktf.w](../../../../../examples/tests/valid/bring_cdktf.w) | compile | tf-aws

## inflight.Foo.js
```js
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
  }
  return Foo;
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
    "aws_s3_bucket": {
      "Bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket",
            "uniqueId": "Bucket"
          }
        },
        "bucket_prefix": "hello",
        "versioning": {
          "enabled": true,
          "mfa_delete": true
        }
      }
    }
  }
}
```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const aws = require("@cdktf/provider-aws");
const cdktf = require("cdktf");
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
        this.node.root.new("cdktf.S3Backend",cdktf.S3Backend,this,{
        "bucket": "foo",
        "key": "bar",}
        );
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Foo.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this).text};
            const client = new FooClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    this.node.root.new("@cdktf/provider-aws.s3Bucket.S3Bucket",aws.s3Bucket.S3Bucket,this,"Bucket",{ bucketPrefix: "hello", versioning: {
    "enabled": true,
    "mfaDelete": true,}
     });
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "bring_cdktf", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, sourceDir: process.env['WING_SOURCE_DIR'] }).synth();

```

