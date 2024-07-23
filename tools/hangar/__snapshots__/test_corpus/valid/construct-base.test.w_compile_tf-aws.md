# [construct-base.test.w](../../../../../examples/tests/valid/construct-base.test.w) | compile | tf-aws

## inflight.WingResource-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class WingResource {
    constructor($args) {
      const {  } = $args;
    }
  }
  return WingResource;
}
//# sourceMappingURL=inflight.WingResource-1.cjs.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root"
    },
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_sqs_queue": {
      "SqsQueue": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/SqsQueue",
            "uniqueId": "SqsQueue"
          }
        }
      }
    }
  }
}
```

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const cloud = $stdlib.cloud;
    const cx = require("constructs");
    const aws = require("@cdktf/provider-aws");
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class WingResource extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        console.log(String.raw({ raw: ["my id is ", ""] }, $helpers.nodeof(this).id));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.WingResource-1.cjs")({
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    const getPath = ((c) => {
      return $helpers.nodeof(c).path;
    });
    const getDisplayName = ((r) => {
      return $helpers.nodeof(r).title;
    });
    const q = globalThis.$ClassFactory.new("@cdktf/provider-aws.sqsQueue.SqsQueue", aws.sqsQueue.SqsQueue, this, "SqsQueue");
    const wr = new WingResource(this, "WingResource");
    const another_resource = wr;
    console.log(String.raw({ raw: ["path of sqs.queue: ", ""] }, (getPath(q))));
    console.log(String.raw({ raw: ["path of wing resource: ", ""] }, (getPath(wr))));
    const title = ((getDisplayName(wr)) ?? "no display name");
    console.log(String.raw({ raw: ["display name of wing resource: ", ""] }, title));
    console.log((cx.Node.of(wr)).path);
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "construct-base.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

