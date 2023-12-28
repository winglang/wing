# [class.test.w](../../../../../examples/tests/valid/class.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $c5 }) {
  class $Closure1 {
    constructor({  }) {
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
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.$Closure2-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $student_hrlyWage, $student_major, $student_name }) {
  class $Closure2 {
    constructor({  }) {
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
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.js.map
```

## inflight.$Closure3-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $ta_hrlyWage }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($ta_hrlyWage, 10), "ta.hrlyWage == 10");
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.js.map
```

## inflight.$Closure4-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $B }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const b = (await (async () => {const o = new $B("ba"); await o.$inflight_init?.(); return o; })());
      $helpers.assert($helpers.eq(b.sound, "ba"), "b.sound == \"ba\"");
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-1.js.map
```

## inflight.A-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
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
//# sourceMappingURL=inflight.A-1.js.map
```

## inflight.B-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
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
//# sourceMappingURL=inflight.B-1.js.map
```

## inflight.Bam-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Boom }) {
  class Bam extends $Boom {
    constructor({  }) {
      super({  });
    }
  }
  return Bam;
}
//# sourceMappingURL=inflight.Bam-1.js.map
```

## inflight.Bar-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Bar {
    constructor({  }) {
    }
  }
  return Bar;
}
//# sourceMappingURL=inflight.Bar-1.js.map
```

## inflight.Baz-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Bar }) {
  class Baz extends $Bar {
    constructor({  }) {
      super({  });
    }
  }
  return Baz;
}
//# sourceMappingURL=inflight.Baz-1.js.map
```

## inflight.Boom-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Boom {
    constructor({  }) {
    }
  }
  return Boom;
}
//# sourceMappingURL=inflight.Boom-1.js.map
```

## inflight.C1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class C1 {
    constructor({  }) {
    }
  }
  return C1;
}
//# sourceMappingURL=inflight.C1-1.js.map
```

## inflight.C2-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class C2 {
    constructor({  }) {
    }
  }
  return C2;
}
//# sourceMappingURL=inflight.C2-1.js.map
```

## inflight.C3-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class C3 {
    constructor({  }) {
    }
  }
  return C3;
}
//# sourceMappingURL=inflight.C3-1.js.map
```

## inflight.C4-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class C4 {
    constructor({  }) {
    }
  }
  return C4;
}
//# sourceMappingURL=inflight.C4-1.js.map
```

## inflight.C5-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class C5 {
    constructor({  }) {
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
//# sourceMappingURL=inflight.C5-1.js.map
```

## inflight.Foo-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Bar }) {
  class Foo extends $Bar {
    constructor({  }) {
      super({  });
    }
    async doStuff(h) {
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-1.js.map
```

## inflight.PaidStudent-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Student }) {
  class PaidStudent extends $Student {
    constructor({  }) {
      super({  });
    }
  }
  return PaidStudent;
}
//# sourceMappingURL=inflight.PaidStudent-1.js.map
```

## inflight.Person-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Person {
    constructor({  }) {
    }
  }
  return Person;
}
//# sourceMappingURL=inflight.Person-1.js.map
```

## inflight.Student-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Person }) {
  class Student extends $Person {
    constructor({  }) {
      super({  });
    }
  }
  return Student;
}
//# sourceMappingURL=inflight.Student-1.js.map
```

## inflight.TeacherAid-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $PaidStudent }) {
  class TeacherAid extends $PaidStudent {
    constructor({  }) {
      super({  });
    }
  }
  return TeacherAid;
}
//# sourceMappingURL=inflight.TeacherAid-1.js.map
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
    class C1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("./inflight.C1-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const C1Client = ${C1._toInflightType(this)};
            const client = new C1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "$inflight_init"];
      }
    }
    class C2 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.x = 1;
      }
      static _toInflightType() {
        return `
          require("./inflight.C2-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const C2Client = ${C2._toInflightType(this)};
            const client = new C2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "$inflight_init"];
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
          require("./inflight.C3-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const C3Client = ${C3._toInflightType(this)};
            const client = new C3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "$inflight_init"];
      }
    }
    class C4 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static m() {
        return 1;
      }
      static _toInflightType() {
        return `
          require("./inflight.C4-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const C4Client = ${C4._toInflightType(this)};
            const client = new C4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "$inflight_init"];
      }
    }
    class C5 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("./inflight.C5-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const C5Client = ${C5._toInflightType(this)};
            const client = new C5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "x", "y", "set", "$inflight_init"];
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure1-1.js")({
            $c5: ${$stdlib.core.liftObject(c5)},
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
          $Closure1._registerOnLiftObject(c5, host, ["set", "x", "y"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class Person extends $stdlib.std.Resource {
      constructor($scope, $id, name) {
        super($scope, $id);
        this.name = name;
      }
      static _toInflightType() {
        return `
          require("./inflight.Person-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const PersonClient = ${Person._toInflightType(this)};
            const client = new PersonClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "$inflight_init"];
      }
    }
    class Student extends Person {
      constructor($scope, $id, name, major) {
        super($scope, $id, name);
        this.major = major;
      }
      static _toInflightType() {
        return `
          require("./inflight.Student-1.js")({
            $Person: ${$stdlib.core.liftObject(Person)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const StudentClient = ${Student._toInflightType(this)};
            const client = new StudentClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "$inflight_init"];
      }
    }
    class PaidStudent extends Student {
      constructor($scope, $id, name, major, hrlyWage) {
        super($scope, $id, name, major);
        this.hrlyWage = hrlyWage;
      }
      static _toInflightType() {
        return `
          require("./inflight.PaidStudent-1.js")({
            $Student: ${$stdlib.core.liftObject(Student)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const PaidStudentClient = ${PaidStudent._toInflightType(this)};
            const client = new PaidStudentClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "$inflight_init"];
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
          require("./inflight.$Closure2-1.js")({
            $student_hrlyWage: ${$stdlib.core.liftObject(student.hrlyWage)},
            $student_major: ${$stdlib.core.liftObject(student.major)},
            $student_name: ${$stdlib.core.liftObject(student.name)},
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
          $Closure2._registerOnLiftObject(student.hrlyWage, host, []);
          $Closure2._registerOnLiftObject(student.major, host, []);
          $Closure2._registerOnLiftObject(student.name, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class TeacherAid extends PaidStudent {
      constructor($scope, $id, name, major, hrlyWage) {
        super($scope, $id, name, major, hrlyWage);
        this.hrlyWage = 10;
      }
      static _toInflightType() {
        return `
          require("./inflight.TeacherAid-1.js")({
            $PaidStudent: ${$stdlib.core.liftObject(PaidStudent)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const TeacherAidClient = ${TeacherAid._toInflightType(this)};
            const client = new TeacherAidClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "$inflight_init"];
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
          require("./inflight.$Closure3-1.js")({
            $ta_hrlyWage: ${$stdlib.core.liftObject(ta.hrlyWage)},
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
          $Closure3._registerOnLiftObject(ta.hrlyWage, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class A extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("./inflight.A-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const AClient = ${A._toInflightType(this)};
            const client = new AClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "sound", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("$inflight_init")) {
          A._registerOnLiftObject(this, host, ["sound"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class B extends A {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("./inflight.B-1.js")({
            $A: ${$stdlib.core.liftObject(A)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BClient = ${B._toInflightType(this)};
            const client = new BClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "$inflight_init"];
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure4-1.js")({
            $B: ${$stdlib.core.liftObject(B)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this)};
            const client = new $Closure4Client({
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
    class Bar extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("./inflight.Bar-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BarClient = ${Bar._toInflightType(this)};
            const client = new BarClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "$inflight_init"];
      }
    }
    class Foo extends Bar {
      constructor($scope, $id, ) {
        super($scope, $id, );
      }
      static _toInflightType() {
        return `
          require("./inflight.Foo-1.js")({
            $Bar: ${$stdlib.core.liftObject(Bar)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this)};
            const client = new FooClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "doStuff", "$inflight_init"];
      }
    }
    class Baz extends Bar {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("./inflight.Baz-1.js")({
            $Bar: ${$stdlib.core.liftObject(Bar)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BazClient = ${Baz._toInflightType(this)};
            const client = new BazClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "$inflight_init"];
      }
    }
    class Boom extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("./inflight.Boom-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BoomClient = ${Boom._toInflightType(this)};
            const client = new BoomClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "$inflight_init"];
      }
    }
    class Bam extends Boom {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("./inflight.Bam-1.js")({
            $Boom: ${$stdlib.core.liftObject(Boom)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BamClient = ${Bam._toInflightType(this)};
            const client = new BamClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "$inflight_init"];
      }
    }
    new C1(this, "C1");
    const c2 = new C2(this, "C2");
    $helpers.assert($helpers.eq(c2.x, 1), "c2.x == 1");
    const c3 = new C3(this, "C3", 1, 2);
    $helpers.assert($helpers.eq(c3.x, 1), "c3.x == 1");
    $helpers.assert($helpers.eq(c3.y, 2), "c3.y == 2");
    $helpers.assert($helpers.eq((C4.m()), 1), "C4.m() == 1");
    const c5 = new C5(this, "C5");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:access inflight field", new $Closure1(this, "$Closure1"));
    const student = new PaidStudent(this, "PaidStudent", "Tom", "MySpace", 38);
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:check derived class instance variables", new $Closure2(this, "$Closure2"));
    const ta = new TeacherAid(this, "TeacherAid", "John", "Rock'n Roll", 50);
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:devived class init body happens after super", new $Closure3(this, "$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight super constructor", new $Closure4(this, "$Closure4"));
    new Foo(this, "Foo");
    new Baz(this, "Baz");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "class.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

