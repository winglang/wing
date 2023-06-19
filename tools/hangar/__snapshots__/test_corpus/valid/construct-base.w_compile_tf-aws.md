# [construct-base.w](../../../../../examples/tests/valid/construct-base.w) | compile | tf-aws

## inflight.WingResource.js
```js
module.exports = function({  }) {
  class WingResource {
    constructor({  }) {
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
  }
  return WingResource;
}

```

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
    "aws_sqs_queue": {
      "root_awssqsQueueSqsQueue_47BDCAE4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws.sqsQueue.SqsQueue",
            "uniqueId": "root_awssqsQueueSqsQueue_47BDCAE4"
          }
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
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
const cx = require("constructs");
const aws = require("@cdktf/provider-aws");
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class WingResource extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
        const __parent_this = this;
        {console.log(`my id is ${this.node.id}`)};
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.WingResource.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const WingResourceClient = ${WingResource._toInflightType(this).text};
            const client = new WingResourceClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    const getPath =  (c) =>  {
      return c.node.path;
    }
    ;
    const getDisplayName =  (r) =>  {
      return r.display.title;
    }
    ;
    const q = this.node.root.new("@cdktf/provider-aws.sqsQueue.SqsQueue",aws.sqsQueue.SqsQueue,this,"aws.sqsQueue.SqsQueue");
    const wr = new WingResource(this,"WingResource");
    const another_resource = wr;
    {console.log(`path of sqs.queue: ${(getPath(q))}`)};
    {console.log(`path of wing resource: ${(getPath(wr))}`)};
    const title = ((getDisplayName(wr)) ?? "no display name");
    {console.log(`display name of wing resource: ${title}`)};
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "construct-base", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

