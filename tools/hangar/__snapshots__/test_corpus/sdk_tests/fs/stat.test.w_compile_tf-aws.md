# [stat.test.w](../../../../../../examples/tests/sdk_tests/fs/stat.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $expect_Util, $fs_FileType, $fs_Util, $regex_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const tempDir = (await $fs_Util.mkdtemp());
      const tempFile = (await $fs_Util.join(tempDir, "tempfile.txt"));
      const tempSymlink = (await $fs_Util.join(tempDir, "symlink"));
      (await $fs_Util.writeFile(tempFile, "Hello, Wing!"));
      (await $fs_Util.symlink(tempFile, tempSymlink));
      const fileStats = (await $fs_Util.metadata(tempFile));
      (await $expect_Util.equal(fileStats.size, 12));
      (await $expect_Util.equal(fileStats.fileType, $fs_FileType.FILE));
      {((cond) => {if (!cond) throw new Error("assertion failed: regex.match(\"[0-7]\\{3\\}\", fileStats.permissions)")})((await $regex_Util.match("[0-7]{3\}", fileStats.permissions)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fileStats.accessed.year >= 2023")})((fileStats.accessed.year >= 2023))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fileStats.modified.year >= 2023")})((fileStats.modified.year >= 2023))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fileStats.created.year >= 2023")})((fileStats.created.year >= 2023))};
      const symlinkStats = (await $fs_Util.metadata(tempSymlink));
      (await $expect_Util.equal(symlinkStats.size, 12));
      (await $expect_Util.equal(symlinkStats.fileType, $fs_FileType.FILE));
      {((cond) => {if (!cond) throw new Error("assertion failed: regex.match(\"[0-7]\\{3\\}\", symlinkStats.permissions)")})((await $regex_Util.match("[0-7]{3\}", symlinkStats.permissions)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: symlinkStats.accessed.year >= 2023")})((symlinkStats.accessed.year >= 2023))};
      {((cond) => {if (!cond) throw new Error("assertion failed: symlinkStats.modified.year >= 2023")})((symlinkStats.modified.year >= 2023))};
      {((cond) => {if (!cond) throw new Error("assertion failed: symlinkStats.created.year >= 2023")})((symlinkStats.created.year >= 2023))};
      const dirStats = (await $fs_Util.metadata(tempDir));
      (await $expect_Util.equal(dirStats.fileType, $fs_FileType.DIRECTORY));
      {((cond) => {if (!cond) throw new Error("assertion failed: regex.match(\"[0-7]\\{3\\}\", dirStats.permissions)")})((await $regex_Util.match("[0-7]{3\}", dirStats.permissions)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fileStats.accessed.year >= 2023")})((fileStats.accessed.year >= 2023))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fileStats.modified.year >= 2023")})((fileStats.modified.year >= 2023))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fileStats.created.year >= 2023")})((fileStats.created.year >= 2023))};
      (await $fs_Util.remove(tempDir));
      (await $expect_Util.equal((await $fs_Util.exists(tempDir)), false));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
module.exports = function({ $expect_Util, $fs_FileType, $fs_Util, $regex_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const tempDir = (await $fs_Util.mkdtemp());
      const tempFile = (await $fs_Util.join(tempDir, "tempfile.txt"));
      const tempSymlink = (await $fs_Util.join(tempDir, "symlink"));
      (await $fs_Util.writeFile(tempFile, "Hello, Wing!"));
      (await $fs_Util.symlink(tempFile, tempSymlink));
      const fileStats = (await $fs_Util.symlinkMetadata(tempFile));
      (await $expect_Util.equal(fileStats.size, 12));
      (await $expect_Util.equal(fileStats.fileType, $fs_FileType.FILE));
      {((cond) => {if (!cond) throw new Error("assertion failed: regex.match(\"[0-7]\\{3\\}\", fileStats.permissions)")})((await $regex_Util.match("[0-7]{3\}", fileStats.permissions)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fileStats.accessed.year >= 2023")})((fileStats.accessed.year >= 2023))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fileStats.modified.year >= 2023")})((fileStats.modified.year >= 2023))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fileStats.created.year >= 2023")})((fileStats.created.year >= 2023))};
      const symlinkStats = (await $fs_Util.symlinkMetadata(tempSymlink));
      (await $expect_Util.notEqual(symlinkStats.size, 12));
      (await $expect_Util.equal(symlinkStats.fileType, $fs_FileType.SYMLINK));
      {((cond) => {if (!cond) throw new Error("assertion failed: regex.match(\"[0-7]\\{3\\}\", symlinkStats.permissions)")})((await $regex_Util.match("[0-7]{3\}", symlinkStats.permissions)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: symlinkStats.accessed.year >= 2023")})((symlinkStats.accessed.year >= 2023))};
      {((cond) => {if (!cond) throw new Error("assertion failed: symlinkStats.modified.year >= 2023")})((symlinkStats.modified.year >= 2023))};
      {((cond) => {if (!cond) throw new Error("assertion failed: symlinkStats.created.year >= 2023")})((symlinkStats.created.year >= 2023))};
      const dirStats = (await $fs_Util.symlinkMetadata(tempDir));
      (await $expect_Util.equal(dirStats.fileType, $fs_FileType.DIRECTORY));
      {((cond) => {if (!cond) throw new Error("assertion failed: regex.match(\"[0-7]\\{3\\}\", dirStats.permissions)")})((await $regex_Util.match("[0-7]{3\}", dirStats.permissions)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fileStats.accessed.year >= 2023")})((fileStats.accessed.year >= 2023))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fileStats.modified.year >= 2023")})((fileStats.modified.year >= 2023))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fileStats.created.year >= 2023")})((fileStats.created.year >= 2023))};
      (await $fs_Util.remove(tempDir));
      (await $expect_Util.equal((await $fs_Util.exists(tempDir)), false));
    }
  }
  return $Closure2;
}
//# sourceMappingURL=./inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
module.exports = function({ $expect_Util, $fs_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const tempDir = (await $fs_Util.mkdtemp());
      const tempFile = (await $fs_Util.join(tempDir, "tempfile.txt"));
      (await $fs_Util.writeFile(tempFile, "Hello, Wing!"));
      (await $fs_Util.setPermissions(tempFile, "666"));
      const fileStats = (await $fs_Util.metadata(tempFile));
      (await $expect_Util.equal(fileStats.permissions, "666"));
      (await $fs_Util.remove(tempDir));
      (await $expect_Util.equal((await $fs_Util.exists(tempDir)), false));
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
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $fs_FileType: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(fs.FileType, "@winglang/sdk/fs", "FileType"))},
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
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $fs_FileType: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(fs.FileType, "@winglang/sdk/fs", "FileType"))},
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
    }
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:metadata()", new $Closure1(this, "$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:symlinkMetadata()", new $Closure2(this, "$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:setPermissions()", new $Closure3(this, "$Closure3"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "stat.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

