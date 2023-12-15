# [directory.test.w](../../../../../../examples/tests/sdk_tests/fs/directory.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $filename, $fs_Util, $regex_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const tmpdir = (await $fs_Util.mkdtemp());
      const dirpath = String.raw({ raw: ["", "/wingdir-inflight"] }, tmpdir);
      (await $fs_Util.mkdir(dirpath));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(dirpath) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(dirpath)),true)))};
      try {
        (await $fs_Util.mkdir(dirpath));
      }
      catch ($error_e) {
        const e = $error_e.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: regex.match(\"^EEXIST: file already exists\", e) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $regex_Util.match("^EEXIST: file already exists", e)),true)))};
      }
      (await $fs_Util.writeFile((await $fs_Util.join(dirpath, $filename)), ""));
      const files = (await $fs_Util.readdir(dirpath));
      {((cond) => {if (!cond) throw new Error("assertion failed: files.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(files.length,1)))};
      (await $fs_Util.remove(dirpath));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(dirpath) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(dirpath)),false)))};
      const nilFiles = (await $fs_Util.tryReaddir(dirpath));
      {((cond) => {if (!cond) throw new Error("assertion failed: nilFiles == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(nilFiles,undefined)))};
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
module.exports = function({ $fs_Util, $regex_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const tmpdir = (await $fs_Util.mkdtemp());
      const dirpath = String.raw({ raw: ["", "/test-overwrite-dir"] }, tmpdir);
      let errorCaught = false;
      (await $fs_Util.mkdir(dirpath));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(dirpath) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(dirpath)),true)))};
      try {
        (await $fs_Util.writeFile(dirpath, "This should fail."));
      }
      catch ($error_e) {
        const e = $error_e.message;
        errorCaught = (await $regex_Util.match("^EISDIR: illegal operation on a directory", e));
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: errorCaught == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(errorCaught,true)))};
      (await $fs_Util.remove(dirpath));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(dirpath) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(dirpath)),false)))};
    }
  }
  return $Closure2;
}
//# sourceMappingURL=./inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
module.exports = function({ $dirpath, $expect_Util, $fs_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const tempDir = (await $fs_Util.mkdtemp());
      (await $expect_Util.equal((await $fs_Util.isDir(tempDir)), true));
      const tempFile = (await $fs_Util.join(tempDir, "tempfile.txt"));
      (await $fs_Util.writeFile(tempFile, "Hello, Wing!"));
      (await $expect_Util.equal((await $fs_Util.isDir(tempFile)), false));
      const nonExistentPath = (await $fs_Util.join(tempDir, "nonexistent"));
      (await $expect_Util.equal((await $fs_Util.isDir(nonExistentPath)), false));
      (await $fs_Util.remove(tempDir));
      (await $expect_Util.equal((await $fs_Util.exists($dirpath)), false));
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
const fs = $stdlib.fs;
const regex = $stdlib.regex;
const expect = $stdlib.expect;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure1-1.cjs")({
            $filename: ${$stdlib.core.liftObject(filename)},
            $fs_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(fs.Util, "@winglang/sdk/fs", "Util"))},
            $regex_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(regex.Util, "@winglang/sdk/regex", "Util"))},
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
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(filename, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure2-1.cjs")({
            $fs_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(fs.Util, "@winglang/sdk/fs", "Util"))},
            $regex_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(regex.Util, "@winglang/sdk/regex", "Util"))},
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
    }
    class $Closure3 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure3-1.cjs")({
            $dirpath: ${$stdlib.core.liftObject(dirpath)},
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $fs_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(fs.Util, "@winglang/sdk/fs", "Util"))},
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
          $Closure3._registerOnLiftObject(dirpath, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const tmpdir = (fs.Util.mkdtemp());
    const dirpath = String.raw({ raw: ["", "/wingdir-preflight"] }, tmpdir);
    const filename = "temp.txt";
    (fs.Util.mkdir(dirpath));
    {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(dirpath) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fs.Util.exists(dirpath)),true)))};
    try {
      (fs.Util.mkdir(dirpath));
    }
    catch ($error_e) {
      const e = $error_e.message;
      {((cond) => {if (!cond) throw new Error("assertion failed: regex.match(\"^EEXIST: file already exists\", e) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((regex.Util.match("^EEXIST: file already exists", e)),true)))};
    }
    (fs.Util.writeFile((fs.Util.join(dirpath, filename)), ""));
    const files = (fs.Util.readdir(dirpath));
    {((cond) => {if (!cond) throw new Error("assertion failed: files.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(files.length,1)))};
    (fs.Util.remove(dirpath));
    {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(dirpath) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fs.Util.exists(dirpath)),false)))};
    const nilFiles = (fs.Util.tryReaddir(dirpath));
    {((cond) => {if (!cond) throw new Error("assertion failed: nilFiles == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(nilFiles,undefined)))};
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight create normal directory", new $Closure1(this, "$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:cannot overwrite directory with a file", new $Closure2(this, "$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:isDir()", new $Closure3(this, "$Closure3"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "directory.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

