const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const aws = require("@cdktf/provider-aws");
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    this.node.root.new("@cdktf/provider-aws.s3Bucket.S3Bucket",aws.s3Bucket.S3Bucket,this,"Bucket",{ bucketPrefix: "hello", versioning: {
    "enabled": true,
    "mfaDelete": true,}
     });
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "bring_cdktf", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
