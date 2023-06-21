# [class.w](../../../../../examples/tests/valid/class.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ c5 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(c5.x === 123)'`)})((c5.x === 123))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(c5.y === 321)'`)})((c5.y === 321))};
      (await c5.set(111));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(c5.y === 111)'`)})((c5.y === 111))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ student }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(student.name === "Tom")'`)})((student.name === "Tom"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(student.major === "MySpace")'`)})((student.major === "MySpace"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(student.hrlyWage === 38)'`)})((student.hrlyWage === 38))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ ta }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(ta.hrlyWage === 10)'`)})((ta.hrlyWage === 10))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4.js
```js
module.exports = function({ B }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const b = new B("ba");
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(b.sound === "ba")'`)})((b.sound === "ba"))};
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
    constructor({  }) {
    }
    async $inflight_init()  {
    }
  }
  return C1;
}

```

## inflight.C2.js
```js
module.exports = function({  }) {
  class C2 {
    constructor({ x }) {
      this.x = x;
    }
    async $inflight_init()  {
    }
  }
  return C2;
}

```

## inflight.C3.js
```js
module.exports = function({  }) {
  class C3 {
    constructor({ x, y }) {
      this.x = x;
      this.y = y;
    }
    async $inflight_init()  {
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
    async $inflight_init()  {
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
    async $inflight_init()  {
      this.x = 123;
      this.y = 321;
    }
    async set(b)  {
      this.y = b;
    }
  }
  return C5;
}

```

## inflight.PaidStudent.js
```js
module.exports = function({ Student }) {
  class PaidStudent extends Student {
    constructor({ hrlyWage, major, name }) {
      super({major, name});
      this.hrlyWage = hrlyWage;
    }
    async $inflight_init()  {
    }
  }
  return PaidStudent;
}

```

## inflight.Person.js
```js
module.exports = function({  }) {
  class Person {
    constructor({ name }) {
      this.name = name;
    }
    async $inflight_init()  {
    }
  }
  return Person;
}

```

## inflight.Student.js
```js
module.exports = function({ Person }) {
  class Student extends Person {
    constructor({ major, name }) {
      super({name});
      this.major = major;
    }
    async $inflight_init()  {
    }
  }
  return Student;
}

```

## inflight.TeacherAid.js
```js
module.exports = function({ PaidStudent }) {
  class TeacherAid extends PaidStudent {
    constructor({ hrlyWage, major, name }) {
      super({hrlyWage, major, name});
    }
    async $inflight_init()  {
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
        const self_client_path = "././inflight.C1.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        super._registerBind(host, ops);
      }
    }
    class C2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.x = 1;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.C2.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const x_client = this._lift(this.x);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const C2Client = ${C2._toInflightType(this).text};
            const client = new C2Client({
              x: ${x_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          C2._registerBindObject(this.x, host, []);
        }
        super._registerBind(host, ops);
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
        const self_client_path = "././inflight.C3.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const x_client = this._lift(this.x);
        const y_client = this._lift(this.y);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const C3Client = ${C3._toInflightType(this).text};
            const client = new C3Client({
              x: ${x_client},
              y: ${y_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          C3._registerBindObject(this.x, host, []);
          C3._registerBindObject(this.y, host, []);
        }
        super._registerBind(host, ops);
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
        const self_client_path = "././inflight.C4.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        super._registerBind(host, ops);
      }
    }
    class C5 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("set", "x", "y");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.C5.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("set")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const c5_client = context._lift(c5);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            c5: ${c5_client},
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
        if (ops.includes("$inflight_init")) {
          $Closure1._registerBindObject(c5, host, []);
        }
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
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Person.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const name_client = this._lift(this.name);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const PersonClient = ${Person._toInflightType(this).text};
            const client = new PersonClient({
              name: ${name_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Person._registerBindObject(this.name, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class Student extends Person {
      constructor(scope, id, name, major) {
        super(scope,id,name);
        this.major = major;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Student.js";
        const PersonClient = Person._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            Person: ${PersonClient.text},
          })
        `);
      }
      _toInflight() {
        const major_client = this._lift(this.major);
        const name_client = this._lift(this.name);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const StudentClient = ${Student._toInflightType(this).text};
            const client = new StudentClient({
              major: ${major_client},
              name: ${name_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Student._registerBindObject(this.major, host, []);
          Student._registerBindObject(this.name, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class PaidStudent extends Student {
      constructor(scope, id, name, major, hrlyWage) {
        super(scope,id,name,major);
        this.hrlyWage = hrlyWage;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.PaidStudent.js";
        const StudentClient = Student._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            Student: ${StudentClient.text},
          })
        `);
      }
      _toInflight() {
        const hrlyWage_client = this._lift(this.hrlyWage);
        const major_client = this._lift(this.major);
        const name_client = this._lift(this.name);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const PaidStudentClient = ${PaidStudent._toInflightType(this).text};
            const client = new PaidStudentClient({
              hrlyWage: ${hrlyWage_client},
              major: ${major_client},
              name: ${name_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          PaidStudent._registerBindObject(this.hrlyWage, host, []);
          PaidStudent._registerBindObject(this.major, host, []);
          PaidStudent._registerBindObject(this.name, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        const student_client = context._lift(student);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            student: ${student_client},
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
        if (ops.includes("$inflight_init")) {
          $Closure2._registerBindObject(student, host, []);
        }
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
        const self_client_path = "././inflight.TeacherAid.js";
        const PaidStudentClient = PaidStudent._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            PaidStudent: ${PaidStudentClient.text},
          })
        `);
      }
      _toInflight() {
        const hrlyWage_client = this._lift(this.hrlyWage);
        const major_client = this._lift(this.major);
        const name_client = this._lift(this.name);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const TeacherAidClient = ${TeacherAid._toInflightType(this).text};
            const client = new TeacherAidClient({
              hrlyWage: ${hrlyWage_client},
              major: ${major_client},
              name: ${name_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          TeacherAid._registerBindObject(this.hrlyWage, host, []);
          TeacherAid._registerBindObject(this.major, host, []);
          TeacherAid._registerBindObject(this.name, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure3.js";
        const ta_client = context._lift(ta);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            ta: ${ta_client},
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
        if (ops.includes("$inflight_init")) {
          $Closure3._registerBindObject(ta, host, []);
        }
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
        const self_client_path = "././inflight.A.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        }
        super._registerBind(host, ops);
      }
    }
    class B extends A {
      constructor(scope, id, ) {
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.B.js";
        const AClient = A._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            A: ${AClient.text},
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
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure4.js";
        const BClient = B._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            B: ${BClient.text},
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
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
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

