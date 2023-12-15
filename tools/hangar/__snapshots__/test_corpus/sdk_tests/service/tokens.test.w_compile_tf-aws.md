# [tokens.test.w](../../../../../../examples/tests/sdk_tests/service/tokens.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      return ({"body": "api test", "status": 200});
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
module.exports = function({ $api_url, $b, $http_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const result = (await $http_Util.get($api_url));
      (await $b.put("service.txt", result.body));
    }
  }
  return $Closure2;
}
//# sourceMappingURL=./inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
module.exports = function({ $b, $util_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $util_Util.waitUntil(async () => {
        return (await $b.exists("service.txt"));
      }));
      {((cond) => {if (!cond) throw new Error("assertion failed: b.get(\"service.txt\") == \"api test\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.get("service.txt")),"api test")))};
    }
  }
  return $Closure3;
}
//# sourceMappingURL=./inflight.$Closure3-1.cjs.map
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
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  }
}
```

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const util = $stdlib.util;
const http = $stdlib.http;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((util.Util.env("WING_TARGET")),"sim"))) {
      const b = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
      const api = this.node.root.new("@winglang/sdk.cloud.Api", cloud.Api, this, "cloud.Api");
      class $Closure1 extends $stdlib.std.Resource {
        _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
        constructor($scope, $id, ) {
          super($scope, $id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType() {
          return `
            require("././inflight.$Closure1-1.cjs")({
            })
          `;
        }
        _toInflight() {
          return `
            (await (async () => {
              const $Closure1Client = ${$Closure1._toInflightType(this)};
              const client = new $Closure1Client({
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `;
        }
        _supportedOps() {
          return [...super._supportedOps(), "handle", "$inflight_init"];
        }
      }
      (api.get("/", new $Closure1(this, "$Closure1")));
      class $Closure2 extends $stdlib.std.Resource {
        _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
        constructor($scope, $id, ) {
          super($scope, $id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType() {
          return `
            require("././inflight.$Closure2-1.cjs")({
              $api_url: ${$stdlib.core.liftObject(api.url)},
              $b: ${$stdlib.core.liftObject(b)},
              $http_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
            })
          `;
        }
        _toInflight() {
          return `
            (await (async () => {
              const $Closure2Client = ${$Closure2._toInflightType(this)};
              const client = new $Closure2Client({
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `;
        }
        _supportedOps() {
          return [...super._supportedOps(), "handle", "$inflight_init"];
        }
        _registerOnLift(host, ops) {
          if (ops.includes("handle")) {
            $Closure2._registerOnLiftObject(api.url, host, []);
            $Closure2._registerOnLiftObject(b, host, ["put"]);
          }
          super._registerOnLift(host, ops);
        }
      }
      const s = this.node.root.new("@winglang/sdk.cloud.Service", cloud.Service, this, "cloud.Service", new $Closure2(this, "$Closure2"));
      class $Closure3 extends $stdlib.std.Resource {
        _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
        constructor($scope, $id, ) {
          super($scope, $id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType() {
          return `
            require("././inflight.$Closure3-1.cjs")({
              $b: ${$stdlib.core.liftObject(b)},
              $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
            })
          `;
        }
        _toInflight() {
          return `
            (await (async () => {
              const $Closure3Client = ${$Closure3._toInflightType(this)};
              const client = new $Closure3Client({
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `;
        }
        _supportedOps() {
          return [...super._supportedOps(), "handle", "$inflight_init"];
        }
        _registerOnLift(host, ops) {
          if (ops.includes("handle")) {
            $Closure3._registerOnLiftObject(b, host, ["exists", "get"]);
          }
          super._registerOnLift(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:will bind and use tokens", new $Closure3(this, "$Closure3"));
    }
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "tokens.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

