# [class.test.w](../../../../../examples/tests/valid/class.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      class C1 {
      }
      (await (async () => {const o = new C1(); await o.$inflight_init?.(); return o; })());
      class C1Ext1 extends C1 {
      }
      class C1Ext2 extends C1Ext1 {
        constructor(){
          super();
          this.super_$inflight_init = this.$inflight_init;
          this.$inflight_init = async () => {
            await this.super_$inflight_init?.();
          }
        }
      }
      class C1Ext3 extends C1Ext2 {
      }
      class C2 {
        constructor(){
          this.$inflight_init = async () => {
            this.x = 1;
          }
        }
      }
      const c2 = (await (async () => {const o = new C2(); await o.$inflight_init?.(); return o; })());
      $helpers.assert($helpers.eq(c2.x, 1), "c2.x == 1");
      class C2Ext1 extends C2 {
      }
      const c2Ext1 = (await (async () => {const o = new C2Ext1(); await o.$inflight_init?.(); return o; })());
      $helpers.assert($helpers.eq(c2Ext1.x, 1), "c2Ext1.x == 1");
      class C2Ext2 extends C2 {
      }
      const c2Ext2 = (await (async () => {const o = new C2Ext2(); await o.$inflight_init?.(); return o; })());
      $helpers.assert($helpers.eq(c2Ext2.x, 1), "c2Ext2.x == 1");
      class C2Ext3 extends C2 {
        constructor(){
          super();
          this.super_$inflight_init = this.$inflight_init;
          this.$inflight_init = async () => {
            await this.super_$inflight_init?.();
          }
        }
      }
      const c2Ext3 = (await (async () => {const o = new C2Ext3(); await o.$inflight_init?.(); return o; })());
      $helpers.assert($helpers.eq(c2Ext3.x, 1), "c2Ext3.x == 1");
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
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $c5 }) {
  class $Closure2 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($c5.x, 123), "c5.x == 123");
      $helpers.assert($helpers.eq($c5.y, 321), "c5.y == 321");
      (await $c5.set(111));
      $helpers.assert($helpers.eq($c5.y, 111), "c5.y == 111");
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
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $student_hrlyWage, $student_major, $student_name }) {
  class $Closure3 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($student_name, "Tom"), "student.name == \"Tom\"");
      $helpers.assert($helpers.eq($student_major, "MySpace"), "student.major == \"MySpace\"");
      $helpers.assert($helpers.eq($student_hrlyWage, 38), "student.hrlyWage == 38");
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
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $ta_hrlyWage }) {
  class $Closure4 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($ta_hrlyWage, 10), "ta.hrlyWage == 10");
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-1.cjs.map
```

## inflight.$Closure5-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $B }) {
  class $Closure5 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const b = (await (async () => {const o = new $B("ba"); await o.$inflight_init?.(); return o; })());
      $helpers.assert($helpers.eq(b.sound, "ba"), "b.sound == \"ba\"");
    }
  }
  return $Closure5;
}
//# sourceMappingURL=inflight.$Closure5-1.cjs.map
```

## inflight.A-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class A {
    constructor(sound){
      this.$inflight_init = async () => {
        this.sound = sound;
      }
    }
  }
  return A;
}
//# sourceMappingURL=inflight.A-1.cjs.map
```

## inflight.B-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $A }) {
  class B extends $A {
    constructor(sound){
      super(sound);
      this.super_$inflight_init = this.$inflight_init;
      this.$inflight_init = async () => {
        await this.super_$inflight_init?.(sound);
      }
    }
  }
  return B;
}
//# sourceMappingURL=inflight.B-1.cjs.map
```

## inflight.Bam-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $Boom }) {
  class Bam extends $Boom {
    constructor($args) {
      const {  } = $args;
      super($args);
    }
  }
  return Bam;
}
//# sourceMappingURL=inflight.Bam-1.cjs.map
```

## inflight.Bar-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Bar {
    constructor($args) {
      const {  } = $args;
    }
  }
  return Bar;
}
//# sourceMappingURL=inflight.Bar-1.cjs.map
```

## inflight.BaseClassWithCtorArg-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class BaseClassWithCtorArg {
    constructor({  }) {
    }
  }
  return BaseClassWithCtorArg;
}
//# sourceMappingURL=inflight.BaseClassWithCtorArg-1.cjs.map
```

## inflight.Baz-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $Bar }) {
  class Baz extends $Bar {
    constructor($args) {
      const {  } = $args;
      super($args);
    }
  }
  return Baz;
}
//# sourceMappingURL=inflight.Baz-1.cjs.map
```

## inflight.Boom-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Boom {
    constructor($args) {
      const {  } = $args;
    }
  }
  return Boom;
}
//# sourceMappingURL=inflight.Boom-1.cjs.map
```

## inflight.C1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class C1 {
    constructor($args) {
      const {  } = $args;
    }
  }
  return C1;
}
//# sourceMappingURL=inflight.C1-1.cjs.map
```

## inflight.C1Ext1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $C1 }) {
  class C1Ext1 extends $C1 {
    constructor($args) {
      const {  } = $args;
      super($args);
    }
  }
  return C1Ext1;
}
//# sourceMappingURL=inflight.C1Ext1-1.cjs.map
```

## inflight.C1Ext2-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $C1Ext1 }) {
  class C1Ext2 extends $C1Ext1 {
    constructor($args) {
      const {  } = $args;
      super($args);
    }
  }
  return C1Ext2;
}
//# sourceMappingURL=inflight.C1Ext2-1.cjs.map
```

## inflight.C1Ext3-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $C1Ext2 }) {
  class C1Ext3 extends $C1Ext2 {
    constructor($args) {
      const {  } = $args;
      super($args);
    }
  }
  return C1Ext3;
}
//# sourceMappingURL=inflight.C1Ext3-1.cjs.map
```

## inflight.C2-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class C2 {
    constructor($args) {
      const {  } = $args;
    }
  }
  return C2;
}
//# sourceMappingURL=inflight.C2-1.cjs.map
```

## inflight.C2Ext1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $C2 }) {
  class C2Ext1 extends $C2 {
    constructor($args) {
      const {  } = $args;
      super($args);
    }
  }
  return C2Ext1;
}
//# sourceMappingURL=inflight.C2Ext1-1.cjs.map
```

## inflight.C2Ext2-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $C2 }) {
  class C2Ext2 extends $C2 {
    constructor($args) {
      const {  } = $args;
      super($args);
    }
  }
  return C2Ext2;
}
//# sourceMappingURL=inflight.C2Ext2-1.cjs.map
```

## inflight.C2Ext3-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $C2 }) {
  class C2Ext3 extends $C2 {
    constructor($args) {
      const {  } = $args;
      super($args);
    }
  }
  return C2Ext3;
}
//# sourceMappingURL=inflight.C2Ext3-1.cjs.map
```

## inflight.C3-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class C3 {
    constructor($args) {
      const {  } = $args;
    }
  }
  return C3;
}
//# sourceMappingURL=inflight.C3-1.cjs.map
```

## inflight.C4-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class C4 {
    constructor($args) {
      const {  } = $args;
    }
  }
  return C4;
}
//# sourceMappingURL=inflight.C4-1.cjs.map
```

## inflight.C5-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class C5 {
    constructor($args) {
      const {  } = $args;
    }
    async set(b) {
      this.y = b;
    }
    async $inflight_init() {
      this.x = 123;
      this.y = 321;
    }
  }
  return C5;
}
//# sourceMappingURL=inflight.C5-1.cjs.map
```

## inflight.DerivedClassWithInnerClass-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $BaseClassWithCtorArg }) {
  class DerivedClassWithInnerClass extends $BaseClassWithCtorArg {
    constructor({  }) {
      super({  });
    }
  }
  return DerivedClassWithInnerClass;
}
//# sourceMappingURL=inflight.DerivedClassWithInnerClass-1.cjs.map
```

## inflight.DocClass-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class DocClass {
    constructor($args) {
      const {  } = $args;
    }
  }
  return DocClass;
}
//# sourceMappingURL=inflight.DocClass-1.cjs.map
```

## inflight.Foo-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $Bar }) {
  class Foo extends $Bar {
    constructor($args) {
      const {  } = $args;
      super($args);
    }
    async doStuff(h) {
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-1.cjs.map
```

## inflight.InnerBaseClass-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class InnerBaseClass {
    constructor({  }) {
    }
  }
  return InnerBaseClass;
}
//# sourceMappingURL=inflight.InnerBaseClass-1.cjs.map
```

## inflight.InnerDerivedClass-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $InnerBaseClass }) {
  class InnerDerivedClass extends $InnerBaseClass {
    constructor({  }) {
      super({  });
    }
  }
  return InnerDerivedClass;
}
//# sourceMappingURL=inflight.InnerDerivedClass-1.cjs.map
```

## inflight.PaidStudent-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $Student }) {
  class PaidStudent extends $Student {
    constructor($args) {
      const {  } = $args;
      super($args);
    }
  }
  return PaidStudent;
}
//# sourceMappingURL=inflight.PaidStudent-1.cjs.map
```

## inflight.Person-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Person {
    constructor($args) {
      const {  } = $args;
    }
  }
  return Person;
}
//# sourceMappingURL=inflight.Person-1.cjs.map
```

## inflight.Student-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $Person }) {
  class Student extends $Person {
    constructor($args) {
      const {  } = $args;
      super($args);
    }
  }
  return Student;
}
//# sourceMappingURL=inflight.Student-1.cjs.map
```

## inflight.TeacherAid-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $PaidStudent }) {
  class TeacherAid extends $PaidStudent {
    constructor($args) {
      const {  } = $args;
      super($args);
    }
  }
  return TeacherAid;
}
//# sourceMappingURL=inflight.TeacherAid-1.cjs.map
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
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class C1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.C1-1.cjs")({
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
    class C1Ext1 extends C1 {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.C1Ext1-1.cjs")({
            $C1: ${$stdlib.core.liftObject(C1)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    class C1Ext2 extends C1Ext1 {
      constructor($scope, $id, ) {
        super($scope, $id, );
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.C1Ext2-1.cjs")({
            $C1Ext1: ${$stdlib.core.liftObject(C1Ext1)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    class C1Ext3 extends C1Ext2 {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.C1Ext3-1.cjs")({
            $C1Ext2: ${$stdlib.core.liftObject(C1Ext2)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    class C2 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.x = 1;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.C2-1.cjs")({
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
    class C2Ext1 extends C2 {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.C2Ext1-1.cjs")({
            $C2: ${$stdlib.core.liftObject(C2)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    class C2Ext2 extends C2 {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.C2Ext2-1.cjs")({
            $C2: ${$stdlib.core.liftObject(C2)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    class C2Ext3 extends C2 {
      constructor($scope, $id, ) {
        super($scope, $id, );
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.C2Ext3-1.cjs")({
            $C2: ${$stdlib.core.liftObject(C2)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
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
          "handle": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    class C3 extends $stdlib.std.Resource {
      constructor($scope, $id, a, b) {
        super($scope, $id);
        this.x = a;
        if (true) {
          this.y = b;
        }
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.C3-1.cjs")({
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
    class C4 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static m($scope) {
        return 1;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.C4-1.cjs")({
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
    class C5 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.C5-1.cjs")({
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
          "set": [
          ],
          "$inflight_init": [
          ],
          "x": [
          ],
          "y": [
          ],
        });
      }
    }
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.cjs")({
            $c5: ${$stdlib.core.liftObject(c5)},
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
          "handle": [
            [c5, [].concat(["x"], ["y"], ["set"])],
          ],
          "$inflight_init": [
            [c5, []],
          ],
        });
      }
    }
    class Person extends $stdlib.std.Resource {
      constructor($scope, $id, name) {
        super($scope, $id);
        this.name = name;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Person-1.cjs")({
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
    class Student extends Person {
      constructor($scope, $id, name, major) {
        super($scope, $id, name);
        this.major = major;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Student-1.cjs")({
            $Person: ${$stdlib.core.liftObject(Person)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    class PaidStudent extends Student {
      constructor($scope, $id, name, major, hrlyWage) {
        super($scope, $id, name, major);
        this.hrlyWage = hrlyWage;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.PaidStudent-1.cjs")({
            $Student: ${$stdlib.core.liftObject(Student)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
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
            $student_hrlyWage: ${$stdlib.core.liftObject(student.hrlyWage)},
            $student_major: ${$stdlib.core.liftObject(student.major)},
            $student_name: ${$stdlib.core.liftObject(student.name)},
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
          "handle": [
            [student.hrlyWage, []],
            [student.major, []],
            [student.name, []],
          ],
          "$inflight_init": [
            [student.hrlyWage, []],
            [student.major, []],
            [student.name, []],
          ],
        });
      }
    }
    class TeacherAid extends PaidStudent {
      constructor($scope, $id, name, major, hrlyWage) {
        super($scope, $id, name, major, hrlyWage);
        this.hrlyWage = 10;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.TeacherAid-1.cjs")({
            $PaidStudent: ${$stdlib.core.liftObject(PaidStudent)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
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
            $ta_hrlyWage: ${$stdlib.core.liftObject(ta.hrlyWage)},
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
          "handle": [
            [ta.hrlyWage, []],
          ],
          "$inflight_init": [
            [ta.hrlyWage, []],
          ],
        });
      }
    }
    class A extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.A-1.cjs")({
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
            [this, ["sound"]],
          ],
          "sound": [
          ],
        });
      }
    }
    if ($preflightTypesMap[20]) { throw new Error("A is already in type map"); }
    $preflightTypesMap[20] = A;
    class B extends A {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.B-1.cjs")({
            $A: ${$stdlib.core.liftObject(A)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    if ($preflightTypesMap[21]) { throw new Error("B is already in type map"); }
    $preflightTypesMap[21] = B;
    class $Closure5 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure5-1.cjs")({
            $B: ${$stdlib.core.liftObject(B)},
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
          "handle": [
            [$helpers.preflightClassSingleton(this, 21), ["sound"]],
            [B, []],
          ],
          "$inflight_init": [
            [$helpers.preflightClassSingleton(this, 21), []],
            [B, []],
          ],
        });
      }
    }
    class Bar extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Bar-1.cjs")({
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
    class Foo extends Bar {
      constructor($scope, $id, ) {
        super($scope, $id, );
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.cjs")({
            $Bar: ${$stdlib.core.liftObject(Bar)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "doStuff": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    class Baz extends Bar {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Baz-1.cjs")({
            $Bar: ${$stdlib.core.liftObject(Bar)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    class Boom extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Boom-1.cjs")({
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
    class Bam extends Boom {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Bam-1.cjs")({
            $Boom: ${$stdlib.core.liftObject(Boom)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    class DocClass extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.docField = 0;
      }
      docMethod() {
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.DocClass-1.cjs")({
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
    class BaseClassWithCtorArg extends $stdlib.std.Resource {
      constructor($scope, $id, x) {
        super($scope, $id);
        this.x = x;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.BaseClassWithCtorArg-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BaseClassWithCtorArgClient = ${BaseClassWithCtorArg._toInflightType()};
            const client = new BaseClassWithCtorArgClient({
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
    class DerivedClassWithInnerClass extends BaseClassWithCtorArg {
      constructor($scope, $id, ) {
        class InnerBaseClass extends $stdlib.std.Resource {
          constructor($scope, $id, x) {
            super($scope, $id);
            this.x = x;
          }
          method() {
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.InnerBaseClass-1.cjs")({
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const InnerBaseClassClient = ${InnerBaseClass._toInflightType()};
                const client = new InnerBaseClassClient({
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
        class InnerDerivedClass extends InnerBaseClass {
          constructor($scope, $id, ) {
            super($scope, $id, 1);
            (this.method());
            (super.method());
            this.x;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.InnerDerivedClass-1.cjs")({
                $InnerBaseClass: ${$stdlib.core.liftObject(InnerBaseClass)},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const InnerDerivedClassClient = ${InnerDerivedClass._toInflightType()};
                const client = new InnerDerivedClassClient({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          get _liftMap() {
            return $stdlib.core.mergeLiftDeps(super._liftMap, {
              "$inflight_init": [
              ],
            });
          }
        }
        super($scope, $id, 1);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.DerivedClassWithInnerClass-1.cjs")({
            $BaseClassWithCtorArg: ${$stdlib.core.liftObject(BaseClassWithCtorArg)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const DerivedClassWithInnerClassClient = ${DerivedClassWithInnerClass._toInflightType()};
            const client = new DerivedClassWithInnerClassClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    new C1(this, "C1");
    const c2 = new C2(this, "C2");
    $helpers.assert($helpers.eq(c2.x, 1), "c2.x == 1");
    const c2Ext1 = new C2Ext1(this, "C2Ext1");
    $helpers.assert($helpers.eq(c2Ext1.x, 1), "c2Ext1.x == 1");
    const c2Ext2 = new C2Ext2(this, "C2Ext2");
    $helpers.assert($helpers.eq(c2Ext2.x, 1), "c2Ext2.x == 1");
    const c2Ext3 = new C2Ext3(this, "C2Ext3");
    $helpers.assert($helpers.eq(c2Ext3.x, 1), "c2Ext3.x == 1");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight classes with no ctor or ctor args", new $Closure1(this, "$Closure1"));
    const c3 = new C3(this, "C3", 1, 2);
    $helpers.assert($helpers.eq(c3.x, 1), "c3.x == 1");
    $helpers.assert($helpers.eq(c3.y, 2), "c3.y == 2");
    $helpers.assert($helpers.eq((C4.m(this)), 1), "C4.m() == 1");
    const c5 = new C5(this, "C5");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:access inflight field", new $Closure2(this, "$Closure2"));
    const student = new PaidStudent(this, "PaidStudent", "Tom", "MySpace", 38);
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:check derived class instance variables", new $Closure3(this, "$Closure3"));
    const ta = new TeacherAid(this, "TeacherAid", "John", "Rock'n Roll", 50);
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:devived class init body happens after super", new $Closure4(this, "$Closure4"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight super constructor", new $Closure5(this, "$Closure5"));
    new Foo(this, "Foo");
    new Baz(this, "Baz");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "class.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

