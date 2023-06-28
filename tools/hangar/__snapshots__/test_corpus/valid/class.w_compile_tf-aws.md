# [class.w](../../../../../examples/tests/valid/class.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $c5, $c5_x, $c5_y }) {
  class $Closure1 {
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '($c5_x === 123)'`)})(($c5_x === 123))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '($c5_y === 321)'`)})(($c5_y === 321))};
      (await $c5.set(111));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '($c5_y === 111)'`)})(($c5_y === 111))};
    }
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $student_hrlyWage, $student_major, $student_name }) {
  class $Closure2 {
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '($student_name === "Tom")'`)})(($student_name === "Tom"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '($student_major === "MySpace")'`)})(($student_major === "MySpace"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '($student_hrlyWage === 38)'`)})(($student_hrlyWage === 38))};
    }
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ $ta_hrlyWage }) {
  class $Closure3 {
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '($ta_hrlyWage === 10)'`)})(($ta_hrlyWage === 10))};
    }
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4.js
```js
module.exports = function({ B }) {
  class $Closure4 {
    async $inflight_init()  {
    }
    async handle()  {
      const b = new B("ba");
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(b.sound === "ba")'`)})((b.sound === "ba"))};
    }
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
  }
  return $Closure4;
}

```

## inflight.A.js
```js
module.exports = function({  }) {
  class A {
     constructor(sound)  {
      this.sound = sound;
    }
  }
  return A;
}

```

## inflight.B.js
```js
module.exports = function({ A }) {
  class B extends A {
     constructor(sound)  {
      super(sound);
    }
  }
  return B;
}

```

## inflight.C1.js
```js
module.exports = function({  }) {
  class C1 {
    async $inflight_init()  {
    }
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
    async $inflight_init()  {
    }
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
    async $inflight_init()  {
    }
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
    async $inflight_init()  {
    }
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
    async $inflight_init()  {
      this.x = 123;
      this.y = 321;
    }
    async set(b)  {
      this.y = b;
    }
    constructor({  }) {
    }
  }
  return C5;
}

```

## inflight.PaidStudent.js
```js
module.exports = function({ Student }) {
  class PaidStudent extends Student {
    async $inflight_init()  {
    }
    constructor({  }) {
      super({});
    }
  }
  return PaidStudent;
}

```

## inflight.Person.js
```js
module.exports = function({  }) {
  class Person {
    async $inflight_init()  {
    }
    constructor({  }) {
    }
  }
  return Person;
}

```

## inflight.Student.js
```js
module.exports = function({ Person }) {
  class Student extends Person {
    async $inflight_init()  {
    }
    constructor({  }) {
      super({});
    }
  }
  return Student;
}

```

## inflight.TeacherAid.js
```js
module.exports = function({ PaidStudent }) {
  class TeacherAid extends PaidStudent {
    async $inflight_init()  {
    }
    constructor({  }) {
      super({});
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
      "value": "[[\"root/Default/Default/test:access inflight field\",\"${aws_lambda_function.root_testaccessinflightfield_Handler_79266A8C.arn}\"],[\"root/Default/Default/test:check derived class instance variables\",\"${aws_lambda_function.root_testcheckderivedclassinstancevariables_Handler_92FABF78.arn}\"],[\"root/Default/Default/test:devived class init body happens after super\",\"${aws_lambda_function.root_testdevivedclassinitbodyhappensaftersuper_Handler_563B7509.arn}\"],[\"root/Default/Default/test:inflight super constructor\",\"${aws_lambda_function.root_testinflightsuperconstructor_Handler_3548FC1F.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testaccessinflightfield_Handler_IamRole_7C027402": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access inflight field/Handler/IamRole",
            "uniqueId": "root_testaccessinflightfield_Handler_IamRole_7C027402"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testcheckderivedclassinstancevariables_Handler_IamRole_A3ABECC6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:check derived class instance variables/Handler/IamRole",
            "uniqueId": "root_testcheckderivedclassinstancevariables_Handler_IamRole_A3ABECC6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testdevivedclassinitbodyhappensaftersuper_Handler_IamRole_6E74F0D3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:devived class init body happens after super/Handler/IamRole",
            "uniqueId": "root_testdevivedclassinitbodyhappensaftersuper_Handler_IamRole_6E74F0D3"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testinflightsuperconstructor_Handler_IamRole_6691DF13": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight super constructor/Handler/IamRole",
            "uniqueId": "root_testinflightsuperconstructor_Handler_IamRole_6691DF13"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testaccessinflightfield_Handler_IamRolePolicy_978909ED": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access inflight field/Handler/IamRolePolicy",
            "uniqueId": "root_testaccessinflightfield_Handler_IamRolePolicy_978909ED"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testaccessinflightfield_Handler_IamRole_7C027402.name}"
      },
      "root_testcheckderivedclassinstancevariables_Handler_IamRolePolicy_A6E6FBD2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:check derived class instance variables/Handler/IamRolePolicy",
            "uniqueId": "root_testcheckderivedclassinstancevariables_Handler_IamRolePolicy_A6E6FBD2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testcheckderivedclassinstancevariables_Handler_IamRole_A3ABECC6.name}"
      },
      "root_testdevivedclassinitbodyhappensaftersuper_Handler_IamRolePolicy_9C7BAAB6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:devived class init body happens after super/Handler/IamRolePolicy",
            "uniqueId": "root_testdevivedclassinitbodyhappensaftersuper_Handler_IamRolePolicy_9C7BAAB6"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testdevivedclassinitbodyhappensaftersuper_Handler_IamRole_6E74F0D3.name}"
      },
      "root_testinflightsuperconstructor_Handler_IamRolePolicy_FFFB3150": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight super constructor/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightsuperconstructor_Handler_IamRolePolicy_FFFB3150"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightsuperconstructor_Handler_IamRole_6691DF13.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testaccessinflightfield_Handler_IamRolePolicyAttachment_810CAE61": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access inflight field/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testaccessinflightfield_Handler_IamRolePolicyAttachment_810CAE61"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testaccessinflightfield_Handler_IamRole_7C027402.name}"
      },
      "root_testcheckderivedclassinstancevariables_Handler_IamRolePolicyAttachment_391663EF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:check derived class instance variables/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testcheckderivedclassinstancevariables_Handler_IamRolePolicyAttachment_391663EF"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testcheckderivedclassinstancevariables_Handler_IamRole_A3ABECC6.name}"
      },
      "root_testdevivedclassinitbodyhappensaftersuper_Handler_IamRolePolicyAttachment_A30CDD73": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:devived class init body happens after super/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testdevivedclassinitbodyhappensaftersuper_Handler_IamRolePolicyAttachment_A30CDD73"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testdevivedclassinitbodyhappensaftersuper_Handler_IamRole_6E74F0D3.name}"
      },
      "root_testinflightsuperconstructor_Handler_IamRolePolicyAttachment_2A48D9E0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight super constructor/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightsuperconstructor_Handler_IamRolePolicyAttachment_2A48D9E0"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightsuperconstructor_Handler_IamRole_6691DF13.name}"
      }
    },
    "aws_lambda_function": {
      "root_testaccessinflightfield_Handler_79266A8C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access inflight field/Handler/Default",
            "uniqueId": "root_testaccessinflightfield_Handler_79266A8C"
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
        "role": "${aws_iam_role.root_testaccessinflightfield_Handler_IamRole_7C027402.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testaccessinflightfield_Handler_S3Object_FA4AA9DF.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testcheckderivedclassinstancevariables_Handler_92FABF78": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:check derived class instance variables/Handler/Default",
            "uniqueId": "root_testcheckderivedclassinstancevariables_Handler_92FABF78"
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
        "role": "${aws_iam_role.root_testcheckderivedclassinstancevariables_Handler_IamRole_A3ABECC6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testcheckderivedclassinstancevariables_Handler_S3Object_7024227C.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testdevivedclassinitbodyhappensaftersuper_Handler_563B7509": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:devived class init body happens after super/Handler/Default",
            "uniqueId": "root_testdevivedclassinitbodyhappensaftersuper_Handler_563B7509"
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
        "role": "${aws_iam_role.root_testdevivedclassinitbodyhappensaftersuper_Handler_IamRole_6E74F0D3.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testdevivedclassinitbodyhappensaftersuper_Handler_S3Object_0488BC75.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testinflightsuperconstructor_Handler_3548FC1F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight super constructor/Handler/Default",
            "uniqueId": "root_testinflightsuperconstructor_Handler_3548FC1F"
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
        "role": "${aws_iam_role.root_testinflightsuperconstructor_Handler_IamRole_6691DF13.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightsuperconstructor_Handler_S3Object_B126D912.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "root_Code_02F3C603": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "root_Code_02F3C603"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      }
    },
    "aws_s3_object": {
      "root_testaccessinflightfield_Handler_S3Object_FA4AA9DF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access inflight field/Handler/S3Object",
            "uniqueId": "root_testaccessinflightfield_Handler_S3Object_FA4AA9DF"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testcheckderivedclassinstancevariables_Handler_S3Object_7024227C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:check derived class instance variables/Handler/S3Object",
            "uniqueId": "root_testcheckderivedclassinstancevariables_Handler_S3Object_7024227C"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testdevivedclassinitbodyhappensaftersuper_Handler_S3Object_0488BC75": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:devived class init body happens after super/Handler/S3Object",
            "uniqueId": "root_testdevivedclassinitbodyhappensaftersuper_Handler_S3Object_0488BC75"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testinflightsuperconstructor_Handler_S3Object_B126D912": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight super constructor/Handler/S3Object",
            "uniqueId": "root_testinflightsuperconstructor_Handler_S3Object_B126D912"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
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
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class C1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
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
            const client = new (${C1._toInflightType(this).text})({
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
            const client = new (${C2._toInflightType(this).text})({
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
            const client = new (${C3._toInflightType(this).text})({
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
      }
      static m()  {
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
            const client = new (${C4._toInflightType(this).text})({
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
        this._addInflightOps("set", "x", "y");
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
            const client = new (${C5._toInflightType(this).text})({
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
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const $c5 = context._lift(c5, ["set"]);
        const $c5_x = context._lift(c5.x, []);
        const $c5_y = context._lift(c5.y, []);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({ 
            $c5: ${$c5},
            $c5_x: ${$c5_x},
            $c5_y: ${$c5_y},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const client = new (${$Closure1._toInflightType(this).text})({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(c5, host, ["set"]);
          $Closure1._registerBindObject(c5.x, host, []);
          $Closure1._registerBindObject(c5.y, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class Person extends $stdlib.std.Resource {
      constructor(scope, id, name) {
        super(scope, id);
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
            const client = new (${Person._toInflightType(this).text})({
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
      }
      static _toInflightType(context) {
        const lifted_Person = Person._toInflightType(context).text;
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Student.js")({ 
            Person: ${lifted_Person},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const client = new (${Student._toInflightType(this).text})({
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
      }
      static _toInflightType(context) {
        const lifted_Student = Student._toInflightType(context).text;
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.PaidStudent.js")({ 
            Student: ${lifted_Student},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const client = new (${PaidStudent._toInflightType(this).text})({
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
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const $student_hrlyWage = context._lift(student.hrlyWage, []);
        const $student_major = context._lift(student.major, []);
        const $student_name = context._lift(student.name, []);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({ 
            $student_hrlyWage: ${$student_hrlyWage},
            $student_major: ${$student_major},
            $student_name: ${$student_name},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const client = new (${$Closure2._toInflightType(this).text})({
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
      }
      static _toInflightType(context) {
        const lifted_PaidStudent = PaidStudent._toInflightType(context).text;
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.TeacherAid.js")({ 
            PaidStudent: ${lifted_PaidStudent},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const client = new (${TeacherAid._toInflightType(this).text})({
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
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const $ta_hrlyWage = context._lift(ta.hrlyWage, []);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure3.js")({ 
            $ta_hrlyWage: ${$ta_hrlyWage},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const client = new (${$Closure3._toInflightType(this).text})({
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
        this._addInflightOps("sound");
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
            const client = new (${A._toInflightType(this).text})({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class B extends A {
      constructor(scope, id, ) {
      }
      static _toInflightType(context) {
        const lifted_A = A._toInflightType(context).text;
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.B.js")({ 
            A: ${lifted_A},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const client = new (${B._toInflightType(this).text})({
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
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const lifted_B = B._toInflightType(context).text;
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure4.js")({ 
            B: ${lifted_B},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const client = new (${$Closure4._toInflightType(this).text})({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    new C1(this,"C1");
    const c2 = new C2(this,"C2");
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(c2.x === 1)'`)})((c2.x === 1))};
    const c3 = new C3(this,"C3",1,2);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(c3.x === 1)'`)})((c3.x === 1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(c3.y === 2)'`)})((c3.y === 2))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((C4.m()) === 1)'`)})(((C4.m()) === 1))};
    const c5 = new C5(this,"C5");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:access inflight field",new $Closure1(this,"$Closure1"));
    const student = new PaidStudent(this,"PaidStudent","Tom","MySpace",38);
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:check derived class instance variables",new $Closure2(this,"$Closure2"));
    const ta = new TeacherAid(this,"TeacherAid","John","Rock'n Roll",50);
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:devived class init body happens after super",new $Closure3(this,"$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight super constructor",new $Closure4(this,"$Closure4"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "class", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

