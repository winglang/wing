# [symbol_shadow.test.w](../../../../../examples/tests/valid/symbol_shadow.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $s }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($s, "inner"), "s == \"inner\"");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $s }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($s, "inResource"), "s == \"inResource\"");
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $s }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($s, "top"), "s == \"top\"");
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.cjs.map
```

## inflight.$Closure4-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const s = "insideInflight";
      $helpers.assert($helpers.eq(s, "insideInflight"), "s == \"insideInflight\"");
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-1.cjs.map
```

## inflight.A-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class A {
    constructor({  }) {
    }
  }
  return A;
}
//# sourceMappingURL=inflight.A-1.cjs.map
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
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const cloud = $stdlib.cloud;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class A extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        const s = "inResource";
        $helpers.assert($helpers.eq(s, "inResource"), "s == \"inResource\"");
        class $Closure2 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.cjs")({
                $s: ${$stdlib.core.liftObject(s)},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure2Client = ${$Closure2._toInflightType()};
                const client = new $Closure2Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          get _liftMap() {
            return ({
              "handle": [
                [s, []],
              ],
              "$inflight_init": [
                [s, []],
              ],
            });
          }
        }
        this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight in resource should capture the right scoped var", new $Closure2(this, "$Closure2"));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.A-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const AClient = ${A._toInflightType()};
            const client = new AClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    class $Closure3 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-1.cjs")({
            $s: ${$stdlib.core.liftObject(s)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType()};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [s, []],
          ],
          "$inflight_init": [
            [s, []],
          ],
        });
      }
    }
    class $Closure4 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType()};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    const s = "top";
    if (true) {
      const s = "inner";
      $helpers.assert($helpers.eq(s, "inner"), "s == \"inner\"");
      class $Closure1 extends $stdlib.std.AutoIdResource {
        _id = $stdlib.core.closureId();
        constructor($scope, $id, ) {
          super($scope, $id);
          $helpers.nodeof(this).hidden = true;
        }
        static _toInflightType() {
          return `
            require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
              $s: ${$stdlib.core.liftObject(s)},
            })
          `;
        }
        _toInflight() {
          return `
            (await (async () => {
              const $Closure1Client = ${$Closure1._toInflightType()};
              const client = new $Closure1Client({
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `;
        }
        get _liftMap() {
          return ({
            "handle": [
              [s, []],
            ],
            "$inflight_init": [
              [s, []],
            ],
          });
        }
      }
      this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight nested should not capture the shadowed var", new $Closure1(this, "$Closure1"));
    }
    $helpers.assert($helpers.eq(s, "top"), "s == \"top\"");
    new A(this, "A");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight on top should capture top", new $Closure3(this, "$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:insideInflight should capture the right scope", new $Closure4(this, "$Closure4"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "symbol_shadow.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

