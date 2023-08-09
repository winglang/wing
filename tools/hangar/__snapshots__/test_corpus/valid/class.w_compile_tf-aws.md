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
        "undefined": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/undefined/Default/test:access inflight field\",\"${aws_lambda_function.undefined_testaccessinflightfield_Handler_F46B4340.arn}\"],[\"root/undefined/Default/test:check derived class instance variables\",\"${aws_lambda_function.undefined_testcheckderivedclassinstancevariables_Handler_E8A3A359.arn}\"],[\"root/undefined/Default/test:devived class init body happens after super\",\"${aws_lambda_function.undefined_testdevivedclassinitbodyhappensaftersuper_Handler_2C360839.arn}\"],[\"root/undefined/Default/test:inflight super constructor\",\"${aws_lambda_function.undefined_testinflightsuperconstructor_Handler_B7675E59.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testaccessinflightfield_Handler_IamRole_F6D9D4FF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access inflight field/Handler/IamRole",
            "uniqueId": "undefined_testaccessinflightfield_Handler_IamRole_F6D9D4FF"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testcheckderivedclassinstancevariables_Handler_IamRole_16CEAAAE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:check derived class instance variables/Handler/IamRole",
            "uniqueId": "undefined_testcheckderivedclassinstancevariables_Handler_IamRole_16CEAAAE"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testdevivedclassinitbodyhappensaftersuper_Handler_IamRole_B478F4A7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:devived class init body happens after super/Handler/IamRole",
            "uniqueId": "undefined_testdevivedclassinitbodyhappensaftersuper_Handler_IamRole_B478F4A7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testinflightsuperconstructor_Handler_IamRole_3F17265D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight super constructor/Handler/IamRole",
            "uniqueId": "undefined_testinflightsuperconstructor_Handler_IamRole_3F17265D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testaccessinflightfield_Handler_IamRolePolicy_6FD3CB10": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access inflight field/Handler/IamRolePolicy",
            "uniqueId": "undefined_testaccessinflightfield_Handler_IamRolePolicy_6FD3CB10"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testaccessinflightfield_Handler_IamRole_F6D9D4FF.name}"
      },
      "undefined_testcheckderivedclassinstancevariables_Handler_IamRolePolicy_63B13575": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:check derived class instance variables/Handler/IamRolePolicy",
            "uniqueId": "undefined_testcheckderivedclassinstancevariables_Handler_IamRolePolicy_63B13575"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testcheckderivedclassinstancevariables_Handler_IamRole_16CEAAAE.name}"
      },
      "undefined_testdevivedclassinitbodyhappensaftersuper_Handler_IamRolePolicy_B5731FF5": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:devived class init body happens after super/Handler/IamRolePolicy",
            "uniqueId": "undefined_testdevivedclassinitbodyhappensaftersuper_Handler_IamRolePolicy_B5731FF5"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testdevivedclassinitbodyhappensaftersuper_Handler_IamRole_B478F4A7.name}"
      },
      "undefined_testinflightsuperconstructor_Handler_IamRolePolicy_8A2691A6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight super constructor/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflightsuperconstructor_Handler_IamRolePolicy_8A2691A6"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinflightsuperconstructor_Handler_IamRole_3F17265D.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testaccessinflightfield_Handler_IamRolePolicyAttachment_B006EF89": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access inflight field/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testaccessinflightfield_Handler_IamRolePolicyAttachment_B006EF89"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testaccessinflightfield_Handler_IamRole_F6D9D4FF.name}"
      },
      "undefined_testcheckderivedclassinstancevariables_Handler_IamRolePolicyAttachment_161E12F2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:check derived class instance variables/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testcheckderivedclassinstancevariables_Handler_IamRolePolicyAttachment_161E12F2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testcheckderivedclassinstancevariables_Handler_IamRole_16CEAAAE.name}"
      },
      "undefined_testdevivedclassinitbodyhappensaftersuper_Handler_IamRolePolicyAttachment_314FE8C2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:devived class init body happens after super/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testdevivedclassinitbodyhappensaftersuper_Handler_IamRolePolicyAttachment_314FE8C2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testdevivedclassinitbodyhappensaftersuper_Handler_IamRole_B478F4A7.name}"
      },
      "undefined_testinflightsuperconstructor_Handler_IamRolePolicyAttachment_4133D1F2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight super constructor/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflightsuperconstructor_Handler_IamRolePolicyAttachment_4133D1F2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflightsuperconstructor_Handler_IamRole_3F17265D.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testaccessinflightfield_Handler_F46B4340": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access inflight field/Handler/Default",
            "uniqueId": "undefined_testaccessinflightfield_Handler_F46B4340"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c88513d6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c88513d6",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testaccessinflightfield_Handler_IamRole_F6D9D4FF.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testaccessinflightfield_Handler_S3Object_44532145.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testcheckderivedclassinstancevariables_Handler_E8A3A359": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:check derived class instance variables/Handler/Default",
            "uniqueId": "undefined_testcheckderivedclassinstancevariables_Handler_E8A3A359"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c874b4da",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c874b4da",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testcheckderivedclassinstancevariables_Handler_IamRole_16CEAAAE.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testcheckderivedclassinstancevariables_Handler_S3Object_B2C07855.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testdevivedclassinitbodyhappensaftersuper_Handler_2C360839": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:devived class init body happens after super/Handler/Default",
            "uniqueId": "undefined_testdevivedclassinitbodyhappensaftersuper_Handler_2C360839"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8cbb7fd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8cbb7fd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testdevivedclassinitbodyhappensaftersuper_Handler_IamRole_B478F4A7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testdevivedclassinitbodyhappensaftersuper_Handler_S3Object_E2E9CEE8.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testinflightsuperconstructor_Handler_B7675E59": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight super constructor/Handler/Default",
            "uniqueId": "undefined_testinflightsuperconstructor_Handler_B7675E59"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c814e08d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c814e08d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflightsuperconstructor_Handler_IamRole_3F17265D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflightsuperconstructor_Handler_S3Object_F2B721F6.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "undefined_Code_6226BB4A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Code",
            "uniqueId": "undefined_Code_6226BB4A"
          }
        },
        "bucket_prefix": "code-c818e3de-"
      }
    },
    "aws_s3_object": {
      "undefined_testaccessinflightfield_Handler_S3Object_44532145": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access inflight field/Handler/S3Object",
            "uniqueId": "undefined_testaccessinflightfield_Handler_S3Object_44532145"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testcheckderivedclassinstancevariables_Handler_S3Object_B2C07855": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:check derived class instance variables/Handler/S3Object",
            "uniqueId": "undefined_testcheckderivedclassinstancevariables_Handler_S3Object_B2C07855"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testdevivedclassinitbodyhappensaftersuper_Handler_S3Object_E2E9CEE8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:devived class init body happens after super/Handler/S3Object",
            "uniqueId": "undefined_testdevivedclassinitbodyhappensaftersuper_Handler_S3Object_E2E9CEE8"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testinflightsuperconstructor_Handler_S3Object_F2B721F6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight super constructor/Handler/S3Object",
            "uniqueId": "undefined_testinflightsuperconstructor_Handler_S3Object_F2B721F6"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
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
        this._addInflightOps("$inflight_init");
        this.x = 1;
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
        this._addInflightOps("$inflight_init");
        this.x = a;
        if (true) {
          this.y = b;
        }
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
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
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
        this._addInflightOps("$inflight_init");
        this.name = name;
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
        this._addInflightOps("$inflight_init");
        this.major = major;
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
        this._addInflightOps("$inflight_init");
        this.hrlyWage = hrlyWage;
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
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
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
        this._addInflightOps("$inflight_init");
        this.hrlyWage = 10;
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
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
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
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
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
new $App({ outdir: $outdir, name: "class", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

