# [class.w](../../../../../examples/tests/valid/class.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $c5 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: c5.x == 123")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($c5.x,123)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: c5.y == 321")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($c5.y,321)))};
      (await $c5.set(111));
      {((cond) => {if (!cond) throw new Error("assertion failed: c5.y == 111")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($c5.y,111)))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $student_hrlyWage, $student_major, $student_name }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: student.name == \"Tom\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($student_name,"Tom")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: student.major == \"MySpace\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($student_major,"MySpace")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: student.hrlyWage == 38")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($student_hrlyWage,38)))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ $ta_hrlyWage }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: ta.hrlyWage == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($ta_hrlyWage,10)))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4.js
```js
module.exports = function({ $B }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const b = new $B("ba");
      {((cond) => {if (!cond) throw new Error("assertion failed: b.sound == \"ba\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(b.sound,"ba")))};
    }
  }
  return $Closure4;
}

```

## inflight.A.js
```js
module.exports = function({  }) {
  class A {
    constructor(sound) {
      this.sound = sound;
    }
  }
  return A;
}

```

## inflight.B.js
```js
module.exports = function({ $A }) {
  class B extends $A {
    constructor(sound) {
      super(sound);
    }
  }
  return B;
}

```

## inflight.Bam.js
```js
module.exports = function({ $Boom }) {
  class Bam extends $Boom {
    constructor({  }) {
      super({  });
    }
  }
  return Bam;
}

```

## inflight.Bar.js
```js
module.exports = function({  }) {
  class Bar {
    constructor({  }) {
    }
  }
  return Bar;
}

```

## inflight.Baz.js
```js
module.exports = function({ $Bar }) {
  class Baz extends $Bar {
    constructor({  }) {
      super({  });
    }
  }
  return Baz;
}

```

## inflight.Boom.js
```js
module.exports = function({  }) {
  class Boom {
    constructor({  }) {
    }
  }
  return Boom;
}

```

## inflight.C1.js
```js
module.exports = function({  }) {
  class C1 {
    constructor({  }) {
    }
  }
  return C1;
}

```

## inflight.C2.js
```js
module.exports = function({  }) {
  class C2 {
    constructor({  }) {
    }
  }
  return C2;
}

```

## inflight.C3.js
```js
module.exports = function({  }) {
  class C3 {
    constructor({  }) {
    }
  }
  return C3;
}

```

## inflight.C4.js
```js
module.exports = function({  }) {
  class C4 {
    constructor({  }) {
    }
  }
  return C4;
}

```

## inflight.C5.js
```js
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

```

## inflight.Foo.js
```js
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

```

## inflight.PaidStudent.js
```js
module.exports = function({ $Student }) {
  class PaidStudent extends $Student {
    constructor({  }) {
      super({  });
    }
  }
  return PaidStudent;
}

```

## inflight.Person.js
```js
module.exports = function({  }) {
  class Person {
    constructor({  }) {
    }
  }
  return Person;
}

```

## inflight.Student.js
```js
module.exports = function({ $Person }) {
  class Student extends $Person {
    constructor({  }) {
      super({  });
    }
  }
  return Student;
}

```

## inflight.TeacherAid.js
```js
module.exports = function({ $PaidStudent }) {
  class TeacherAid extends $PaidStudent {
    constructor({  }) {
      super({  });
    }
  }
  return TeacherAid;
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
      "value": "[[\"root/Default/Default/test:access inflight field\",\"${aws_lambda_function.testaccessinflightfield_Handler_39158E6E.arn}\"],[\"root/Default/Default/test:check derived class instance variables\",\"${aws_lambda_function.testcheckderivedclassinstancevariables_Handler_6847A085.arn}\"],[\"root/Default/Default/test:devived class init body happens after super\",\"${aws_lambda_function.testdevivedclassinitbodyhappensaftersuper_Handler_8CA21B73.arn}\"],[\"root/Default/Default/test:inflight super constructor\",\"${aws_lambda_function.testinflightsuperconstructor_Handler_C698F98B.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testaccessinflightfield_Handler_IamRole_E41B56EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access inflight field/Handler/IamRole",
            "uniqueId": "testaccessinflightfield_Handler_IamRole_E41B56EC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testcheckderivedclassinstancevariables_Handler_IamRole_08180CD0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:check derived class instance variables/Handler/IamRole",
            "uniqueId": "testcheckderivedclassinstancevariables_Handler_IamRole_08180CD0"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testdevivedclassinitbodyhappensaftersuper_Handler_IamRole_030576ED": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:devived class init body happens after super/Handler/IamRole",
            "uniqueId": "testdevivedclassinitbodyhappensaftersuper_Handler_IamRole_030576ED"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testinflightsuperconstructor_Handler_IamRole_60346B04": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight super constructor/Handler/IamRole",
            "uniqueId": "testinflightsuperconstructor_Handler_IamRole_60346B04"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testaccessinflightfield_Handler_IamRolePolicy_A28923F7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access inflight field/Handler/IamRolePolicy",
            "uniqueId": "testaccessinflightfield_Handler_IamRolePolicy_A28923F7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testaccessinflightfield_Handler_IamRole_E41B56EC.name}"
      },
      "testcheckderivedclassinstancevariables_Handler_IamRolePolicy_C63DC435": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:check derived class instance variables/Handler/IamRolePolicy",
            "uniqueId": "testcheckderivedclassinstancevariables_Handler_IamRolePolicy_C63DC435"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testcheckderivedclassinstancevariables_Handler_IamRole_08180CD0.name}"
      },
      "testdevivedclassinitbodyhappensaftersuper_Handler_IamRolePolicy_8A804AD5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:devived class init body happens after super/Handler/IamRolePolicy",
            "uniqueId": "testdevivedclassinitbodyhappensaftersuper_Handler_IamRolePolicy_8A804AD5"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testdevivedclassinitbodyhappensaftersuper_Handler_IamRole_030576ED.name}"
      },
      "testinflightsuperconstructor_Handler_IamRolePolicy_D5A7F12D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight super constructor/Handler/IamRolePolicy",
            "uniqueId": "testinflightsuperconstructor_Handler_IamRolePolicy_D5A7F12D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightsuperconstructor_Handler_IamRole_60346B04.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testaccessinflightfield_Handler_IamRolePolicyAttachment_EEB5426B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access inflight field/Handler/IamRolePolicyAttachment",
            "uniqueId": "testaccessinflightfield_Handler_IamRolePolicyAttachment_EEB5426B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testaccessinflightfield_Handler_IamRole_E41B56EC.name}"
      },
      "testcheckderivedclassinstancevariables_Handler_IamRolePolicyAttachment_69A59231": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:check derived class instance variables/Handler/IamRolePolicyAttachment",
            "uniqueId": "testcheckderivedclassinstancevariables_Handler_IamRolePolicyAttachment_69A59231"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testcheckderivedclassinstancevariables_Handler_IamRole_08180CD0.name}"
      },
      "testdevivedclassinitbodyhappensaftersuper_Handler_IamRolePolicyAttachment_A84F5844": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:devived class init body happens after super/Handler/IamRolePolicyAttachment",
            "uniqueId": "testdevivedclassinitbodyhappensaftersuper_Handler_IamRolePolicyAttachment_A84F5844"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testdevivedclassinitbodyhappensaftersuper_Handler_IamRole_030576ED.name}"
      },
      "testinflightsuperconstructor_Handler_IamRolePolicyAttachment_E3548B22": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight super constructor/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightsuperconstructor_Handler_IamRolePolicyAttachment_E3548B22"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightsuperconstructor_Handler_IamRole_60346B04.name}"
      }
    },
    "aws_lambda_function": {
      "testaccessinflightfield_Handler_39158E6E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access inflight field/Handler/Default",
            "uniqueId": "testaccessinflightfield_Handler_39158E6E"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c84be49a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c84be49a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testaccessinflightfield_Handler_IamRole_E41B56EC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testaccessinflightfield_Handler_S3Object_64789FEE.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testcheckderivedclassinstancevariables_Handler_6847A085": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:check derived class instance variables/Handler/Default",
            "uniqueId": "testcheckderivedclassinstancevariables_Handler_6847A085"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c87bcb74",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c87bcb74",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testcheckderivedclassinstancevariables_Handler_IamRole_08180CD0.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testcheckderivedclassinstancevariables_Handler_S3Object_858E151F.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testdevivedclassinitbodyhappensaftersuper_Handler_8CA21B73": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:devived class init body happens after super/Handler/Default",
            "uniqueId": "testdevivedclassinitbodyhappensaftersuper_Handler_8CA21B73"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8edbb48",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8edbb48",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testdevivedclassinitbodyhappensaftersuper_Handler_IamRole_030576ED.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testdevivedclassinitbodyhappensaftersuper_Handler_S3Object_A5246F5E.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testinflightsuperconstructor_Handler_C698F98B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight super constructor/Handler/Default",
            "uniqueId": "testinflightsuperconstructor_Handler_C698F98B"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c81ddf4a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c81ddf4a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightsuperconstructor_Handler_IamRole_60346B04.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightsuperconstructor_Handler_S3Object_178B986B.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "Code": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "Code"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      }
    },
    "aws_s3_object": {
      "testaccessinflightfield_Handler_S3Object_64789FEE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access inflight field/Handler/S3Object",
            "uniqueId": "testaccessinflightfield_Handler_S3Object_64789FEE"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testcheckderivedclassinstancevariables_Handler_S3Object_858E151F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:check derived class instance variables/Handler/S3Object",
            "uniqueId": "testcheckderivedclassinstancevariables_Handler_S3Object_858E151F"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testdevivedclassinitbodyhappensaftersuper_Handler_S3Object_A5246F5E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:devived class init body happens after super/Handler/S3Object",
            "uniqueId": "testdevivedclassinitbodyhappensaftersuper_Handler_S3Object_A5246F5E"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testinflightsuperconstructor_Handler_S3Object_178B986B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight super constructor/Handler/S3Object",
            "uniqueId": "testinflightsuperconstructor_Handler_S3Object_178B986B"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
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
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class C1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.C1.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const C1Client = ${C1._toInflightType(this).text};
            const client = new C1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class C2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.x = 1;
        this._addInflightOps("$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.C2.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const C2Client = ${C2._toInflightType(this).text};
            const client = new C2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class C3 extends $stdlib.std.Resource {
      constructor(scope, id, a, b) {
        super(scope, id);
        this.x = a;
        if (true) {
          this.y = b;
        }
        this._addInflightOps("$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.C3.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const C3Client = ${C3._toInflightType(this).text};
            const client = new C3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class C4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
      }
      static m() {
        return 1;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.C4.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const C4Client = ${C4._toInflightType(this).text};
            const client = new C4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class C5 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("set", "$inflight_init", "x", "y");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.C5.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const C5Client = ${C5._toInflightType(this).text};
            const client = new C5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $c5: ${context._lift(c5)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this).text};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(c5, host, ["set", "x", "y"]);
        }
        super._registerBind(host, ops);
      }
    }
    class Person extends $stdlib.std.Resource {
      constructor(scope, id, name) {
        super(scope, id);
        this.name = name;
        this._addInflightOps("$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Person.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const PersonClient = ${Person._toInflightType(this).text};
            const client = new PersonClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class Student extends Person {
      constructor(scope, id, name, major) {
        super(scope,id,name);
        this.major = major;
        this._addInflightOps("$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Student.js")({
            $Person: ${context._lift(Person)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const StudentClient = ${Student._toInflightType(this).text};
            const client = new StudentClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class PaidStudent extends Student {
      constructor(scope, id, name, major, hrlyWage) {
        super(scope,id,name,major);
        this.hrlyWage = hrlyWage;
        this._addInflightOps("$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.PaidStudent.js")({
            $Student: ${context._lift(Student)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const PaidStudentClient = ${PaidStudent._toInflightType(this).text};
            const client = new PaidStudentClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
            $student_hrlyWage: ${context._lift(student.hrlyWage)},
            $student_major: ${context._lift(student.major)},
            $student_name: ${context._lift(student.name)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this).text};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(student.hrlyWage, host, []);
          $Closure2._registerBindObject(student.major, host, []);
          $Closure2._registerBindObject(student.name, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class TeacherAid extends PaidStudent {
      constructor(scope, id, name, major, hrlyWage) {
        super(scope,id,name,major,hrlyWage);
        this.hrlyWage = 10;
        this._addInflightOps("$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.TeacherAid.js")({
            $PaidStudent: ${context._lift(PaidStudent)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const TeacherAidClient = ${TeacherAid._toInflightType(this).text};
            const client = new TeacherAidClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure3.js")({
            $ta_hrlyWage: ${context._lift(ta.hrlyWage)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this).text};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerBindObject(ta.hrlyWage, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class A extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init", "sound");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.A.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const AClient = ${A._toInflightType(this).text};
            const client = new AClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          A._registerBindObject(this, host, ["sound"]);
        }
        super._registerBind(host, ops);
      }
    }
    class B extends A {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.B.js")({
            $A: ${context._lift(A)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const BClient = ${B._toInflightType(this).text};
            const client = new BClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure4.js")({
            $B: ${context._lift(B)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this).text};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class Bar extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Bar.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const BarClient = ${Bar._toInflightType(this).text};
            const client = new BarClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class Foo extends Bar {
      constructor(scope, id, ) {
        super(scope,id,);
        this._addInflightOps("doStuff", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Foo.js")({
            $Bar: ${context._lift(Bar)},
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
    class Baz extends Bar {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Baz.js")({
            $Bar: ${context._lift(Bar)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const BazClient = ${Baz._toInflightType(this).text};
            const client = new BazClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class Boom extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Boom.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const BoomClient = ${Boom._toInflightType(this).text};
            const client = new BoomClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class Bam extends Boom {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Bam.js")({
            $Boom: ${context._lift(Boom)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const BamClient = ${Bam._toInflightType(this).text};
            const client = new BamClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    new C1(this,"C1");
    const c2 = new C2(this,"C2");
    {((cond) => {if (!cond) throw new Error("assertion failed: c2.x == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(c2.x,1)))};
    const c3 = new C3(this,"C3",1,2);
    {((cond) => {if (!cond) throw new Error("assertion failed: c3.x == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(c3.x,1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: c3.y == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(c3.y,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: C4.m() == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((C4.m()),1)))};
    const c5 = new C5(this,"C5");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:access inflight field",new $Closure1(this,"$Closure1"));
    const student = new PaidStudent(this,"PaidStudent","Tom","MySpace",38);
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:check derived class instance variables",new $Closure2(this,"$Closure2"));
    const ta = new TeacherAid(this,"TeacherAid","John","Rock'n Roll",50);
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:devived class init body happens after super",new $Closure3(this,"$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight super constructor",new $Closure4(this,"$Closure4"));
    new Foo(this,"Foo");
    new Baz(this,"Baz");
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "class", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

