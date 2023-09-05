# [struct_from_json.w](../../../../../examples/tests/valid/struct_from_json.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $cloud_BucketProps, $j }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const x = ($cloud_BucketProps._fromJson($j));
      {((cond) => {if (!cond) throw new Error("assertion failed: x.public == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(x.public,false)))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({ $Student }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const jStudent3 = ({"firstName": "struct","lastName": "greatest","enrolled": true,"schoolId": "s3-inflight","dob": ({"month": 4,"day": 1,"year": 1999}),"coursesTaken": [({"grade": "B","dateTaken": ({"month": 5,"day": 10,"year": 2021}),"course": ({"name": "COMP 101","credits": 2})}), ({"grade": "A","dateTaken": ({"month": 5,"day": 10,"year": 2021}),"course": ({"name": "COMP 121","credits": 4})})]});
      const studentInflight1 = ($Student._fromJson(jStudent3));
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.firstName == \"struct\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.firstName,"struct")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.lastName == \"greatest\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.lastName,"greatest")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.enrolled")})(studentInflight1.enrolled)};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.schoolId == \"s3-inflight\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.schoolId,"s3-inflight")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.dob.month == 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.dob.month,4)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.dob.day == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.dob.day,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.dob.year == 1999")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.dob.year,1999)))};
      {
        const $if_let_value = studentInflight1.coursesTaken;
        if ($if_let_value != undefined) {
          const coursesTaken = $if_let_value;
          const course1 = (await coursesTaken.at(0));
          const course2 = (await coursesTaken.at(1));
          {((cond) => {if (!cond) throw new Error("assertion failed: course1.grade == \"B\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(course1.grade,"B")))};
          {((cond) => {if (!cond) throw new Error("assertion failed: course2.grade == \"A\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(course2.grade,"A")))};
        }
        else {
          {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
        }
      }
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
module.exports = function({ $Student, $jStudent1 }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const studentInflight1 = ($Student._fromJson($jStudent1));
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.firstName == \"John\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.firstName,"John")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.lastName == \"Smith\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.lastName,"Smith")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.enrolled")})(studentInflight1.enrolled)};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.schoolId == \"s1-xyz\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.schoolId,"s1-xyz")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.dob.month == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.dob.month,10)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.dob.day == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.dob.day,10)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.dob.year == 2005")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.dob.year,2005)))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-1.js
```js
module.exports = function({ $MyStruct, $_schema_asStr___, $expectedSchema, $jMyStruct, $std_Json }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const s = ($MyStruct);
      (await s.validate($jMyStruct));
      {((cond) => {if (!cond) throw new Error("assertion failed: schema.asStr() == Json.stringify(expectedSchema)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($_schema_asStr___,((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([$expectedSchema]))))};
    }
  }
  return $Closure4;
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
      "value": "[[\"root/Default/Default/test:inflight jsii struct conversion\",\"${aws_lambda_function.testinflightjsiistructconversion_Handler_B3E77AFF.arn}\"],[\"root/Default/Default/test:flight school student :)\",\"${aws_lambda_function.testflightschoolstudent_Handler_8BE7AA78.arn}\"],[\"root/Default/Default/test:lifting a student\",\"${aws_lambda_function.testliftingastudent_Handler_30A43B55.arn}\"],[\"root/Default/Default/test:inflight schema usage\",\"${aws_lambda_function.testinflightschemausage_Handler_BA5849AB.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testflightschoolstudent_Handler_IamRole_5F1C920A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:flight school student :)/Handler/IamRole",
            "uniqueId": "testflightschoolstudent_Handler_IamRole_5F1C920A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testinflightjsiistructconversion_Handler_IamRole_0D19BB55": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight jsii struct conversion/Handler/IamRole",
            "uniqueId": "testinflightjsiistructconversion_Handler_IamRole_0D19BB55"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testinflightschemausage_Handler_IamRole_7BAB5522": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight schema usage/Handler/IamRole",
            "uniqueId": "testinflightschemausage_Handler_IamRole_7BAB5522"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testliftingastudent_Handler_IamRole_66279A05": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lifting a student/Handler/IamRole",
            "uniqueId": "testliftingastudent_Handler_IamRole_66279A05"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testflightschoolstudent_Handler_IamRolePolicy_942EA77E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:flight school student :)/Handler/IamRolePolicy",
            "uniqueId": "testflightschoolstudent_Handler_IamRolePolicy_942EA77E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testflightschoolstudent_Handler_IamRole_5F1C920A.name}"
      },
      "testinflightjsiistructconversion_Handler_IamRolePolicy_834D55D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight jsii struct conversion/Handler/IamRolePolicy",
            "uniqueId": "testinflightjsiistructconversion_Handler_IamRolePolicy_834D55D7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightjsiistructconversion_Handler_IamRole_0D19BB55.name}"
      },
      "testinflightschemausage_Handler_IamRolePolicy_C05C69C0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight schema usage/Handler/IamRolePolicy",
            "uniqueId": "testinflightschemausage_Handler_IamRolePolicy_C05C69C0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightschemausage_Handler_IamRole_7BAB5522.name}"
      },
      "testliftingastudent_Handler_IamRolePolicy_13D30A25": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lifting a student/Handler/IamRolePolicy",
            "uniqueId": "testliftingastudent_Handler_IamRolePolicy_13D30A25"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testliftingastudent_Handler_IamRole_66279A05.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testflightschoolstudent_Handler_IamRolePolicyAttachment_57666E60": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:flight school student :)/Handler/IamRolePolicyAttachment",
            "uniqueId": "testflightschoolstudent_Handler_IamRolePolicyAttachment_57666E60"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testflightschoolstudent_Handler_IamRole_5F1C920A.name}"
      },
      "testinflightjsiistructconversion_Handler_IamRolePolicyAttachment_ED30A0BB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight jsii struct conversion/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightjsiistructconversion_Handler_IamRolePolicyAttachment_ED30A0BB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightjsiistructconversion_Handler_IamRole_0D19BB55.name}"
      },
      "testinflightschemausage_Handler_IamRolePolicyAttachment_E769A5A7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight schema usage/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightschemausage_Handler_IamRolePolicyAttachment_E769A5A7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightschemausage_Handler_IamRole_7BAB5522.name}"
      },
      "testliftingastudent_Handler_IamRolePolicyAttachment_4843B297": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lifting a student/Handler/IamRolePolicyAttachment",
            "uniqueId": "testliftingastudent_Handler_IamRolePolicyAttachment_4843B297"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testliftingastudent_Handler_IamRole_66279A05.name}"
      }
    },
    "aws_lambda_function": {
      "testflightschoolstudent_Handler_8BE7AA78": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:flight school student :)/Handler/Default",
            "uniqueId": "testflightschoolstudent_Handler_8BE7AA78"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c85c011b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c85c011b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testflightschoolstudent_Handler_IamRole_5F1C920A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testflightschoolstudent_Handler_S3Object_1D59FBCC.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testinflightjsiistructconversion_Handler_B3E77AFF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight jsii struct conversion/Handler/Default",
            "uniqueId": "testinflightjsiistructconversion_Handler_B3E77AFF"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8e65f6c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8e65f6c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightjsiistructconversion_Handler_IamRole_0D19BB55.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightjsiistructconversion_Handler_S3Object_6A50D6D8.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testinflightschemausage_Handler_BA5849AB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight schema usage/Handler/Default",
            "uniqueId": "testinflightschemausage_Handler_BA5849AB"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c85a3960",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c85a3960",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightschemausage_Handler_IamRole_7BAB5522.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightschemausage_Handler_S3Object_D08F5CA7.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testliftingastudent_Handler_30A43B55": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lifting a student/Handler/Default",
            "uniqueId": "testliftingastudent_Handler_30A43B55"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c82f8661",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c82f8661",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testliftingastudent_Handler_IamRole_66279A05.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testliftingastudent_Handler_S3Object_51C773C7.key}",
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
      "testflightschoolstudent_Handler_S3Object_1D59FBCC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:flight school student :)/Handler/S3Object",
            "uniqueId": "testflightschoolstudent_Handler_S3Object_1D59FBCC"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testinflightjsiistructconversion_Handler_S3Object_6A50D6D8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight jsii struct conversion/Handler/S3Object",
            "uniqueId": "testinflightjsiistructconversion_Handler_S3Object_6A50D6D8"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testinflightschemausage_Handler_S3Object_D08F5CA7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight schema usage/Handler/S3Object",
            "uniqueId": "testinflightschemausage_Handler_S3Object_D08F5CA7"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testliftingastudent_Handler_S3Object_51C773C7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lifting a student/Handler/S3Object",
            "uniqueId": "testliftingastudent_Handler_S3Object_51C773C7"
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
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const externalStructs = require("./preflight.structs-1.js")({ $stdlib });
const otherExternalStructs = require("./preflight.structs2-2.js")({ $stdlib });
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const Bar = $stdlib.std.Struct._createJsonSchema({id:"/Bar",type:"object",properties:{b:{type:"number"},f:{type:"string"},},required:["b","f",]});
    const Foo = $stdlib.std.Struct._createJsonSchema({id:"/Foo",type:"object",properties:{f:{type:"string"},},required:["f",]});
    const Foosible = $stdlib.std.Struct._createJsonSchema({id:"/Foosible",type:"object",properties:{f:{type:"string"},},required:[]});
    const MyStruct = $stdlib.std.Struct._createJsonSchema({id:"/MyStruct",type:"object",properties:{m1:{type:"object",properties:{val:{type:"number"},},required:["val",]},m2:{type:"object",properties:{val:{type:"string"},},required:["val",]},},required:["m1","m2",]});
    const Student = $stdlib.std.Struct._createJsonSchema({id:"/Student",type:"object",properties:{additionalData:{type:"object"},advisor:{type:"object",properties:{dob:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},employeeID:{type:"string"},firstName:{type:"string"},lastName:{type:"string"},},required:["dob","employeeID","firstName","lastName",]},coursesTaken:{type:"array",items:{type:"object",properties:{course:{type:"object",properties:{credits:{type:"number"},name:{type:"string"},},required:["credits","name",]},dateTaken:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},grade:{type:"string"},},required:["course","dateTaken","grade",]}},dob:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},enrolled:{type:"boolean"},enrolledCourses:{type:"array",uniqueItems:true,items:{type:"object",properties:{credits:{type:"number"},name:{type:"string"},},required:["credits","name",]}},firstName:{type:"string"},lastName:{type:"string"},schoolId:{type:"string"},},required:["dob","enrolled","firstName","lastName","schoolId",]});
    const cloud_BucketProps = $stdlib.std.Struct._createJsonSchema({id:"/BucketProps",type:"object",properties:{public:{type:"boolean"},},required:[]});
    const externalStructs_MyOtherStruct = $stdlib.std.Struct._createJsonSchema({id:"/MyOtherStruct",type:"object",properties:{data:{type:"object",properties:{val:{type:"number"},},required:["val",]},},required:["data",]});
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $cloud_BucketProps: ${context._lift(cloud_BucketProps)},
            $j: ${context._lift(j)},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(j, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $Student: ${context._lift(Student)},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
            $Student: ${context._lift(Student)},
            $jStudent1: ${context._lift(jStudent1)},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerBindObject(jStudent1, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure4-1.js")({
            $MyStruct: ${context._lift(MyStruct)},
            $_schema_asStr___: ${context._lift((schema.asStr()))},
            $expectedSchema: ${context._lift(expectedSchema)},
            $jMyStruct: ${context._lift(jMyStruct)},
            $std_Json: ${context._lift(std.Json)},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure4._registerBindObject((schema.asStr()), host, []);
          $Closure4._registerBindObject(expectedSchema, host, []);
          $Closure4._registerBindObject(jMyStruct, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const j = ({"public": false});
    const x = (cloud_BucketProps._fromJson(j));
    {((cond) => {if (!cond) throw new Error("assertion failed: x.public == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(x.public,false)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight jsii struct conversion",new $Closure1(this,"$Closure1"));
    const jFoo = ({"f": "bar"});
    {((cond) => {if (!cond) throw new Error("assertion failed: Foo.fromJson(jFoo).f == \"bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((Foo._fromJson(jFoo)).f,"bar")))};
    const jFoosible = ({});
    const jFoosible2 = ({"f": "bar"});
    {
      const $if_let_value = (Foosible._fromJson(jFoosible)).f;
      if ($if_let_value != undefined) {
        const f = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    {
      const $if_let_value = (Foosible._fromJson(jFoosible2)).f;
      if ($if_let_value != undefined) {
        const f = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: f == \"bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(f,"bar")))};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    const jBar = ({"f": "bar","b": 10});
    const b = (Bar._fromJson(jBar));
    {((cond) => {if (!cond) throw new Error("assertion failed: b.f == \"bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(b.f,"bar")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: b.b == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(b.b,10)))};
    const jStudent1 = ({"firstName": "John","lastName": "Smith","enrolled": true,"schoolId": "s1-xyz","dob": ({"month": 10,"day": 10,"year": 2005}),"enrolledCourses": []});
    const student1 = (Student._fromJson(jStudent1));
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.firstName == \"John\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.firstName,"John")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.lastName == \"Smith\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.lastName,"Smith")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.enrolled")})(student1.enrolled)};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.schoolId == \"s1-xyz\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.schoolId,"s1-xyz")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.dob.month == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.dob.month,10)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.dob.day == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.dob.day,10)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.dob.year == 2005")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.dob.year,2005)))};
    const jStudent2 = ({"advisor": ({"firstName": "Tom","lastName": "Baker","dob": ({"month": 1,"day": 1,"year": 1983}),"employeeID": "emp123"}),"firstName": "Sally","lastName": "Reynolds","enrolled": false,"schoolId": "s2-xyz","dob": ({"month": 5,"day": 31,"year": 1987}),"enrolledCourses": [({"name": "COMP 101","credits": 2}), ({"name": "COMP 121","credits": 4})],"coursesTaken": [({"grade": "F","dateTaken": ({"month": 5,"day": 10,"year": 2021}),"course": ({"name": "COMP 101","credits": 2})}), ({"grade": "D","dateTaken": ({"month": 5,"day": 10,"year": 2021}),"course": ({"name": "COMP 121","credits": 4})})]});
    const student2 = (Student._fromJson(jStudent2));
    {((cond) => {if (!cond) throw new Error("assertion failed: student2.firstName == \"Sally\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student2.firstName,"Sally")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student2.lastName == \"Reynolds\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student2.lastName,"Reynolds")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !student2.enrolled")})((!student2.enrolled))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student2.schoolId == \"s2-xyz\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student2.schoolId,"s2-xyz")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student2.dob.month == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student2.dob.month,5)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student2.dob.day == 31")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student2.dob.day,31)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student2.dob.year == 1987")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student2.dob.year,1987)))};
    {
      const $if_let_value = student2.enrolledCourses;
      if ($if_let_value != undefined) {
        const enrolledCourses = $if_let_value;
        const courses = [...(enrolledCourses)];
        const s2Course1 = (courses.at(0));
        const s2Course2 = (courses.at(1));
        {((cond) => {if (!cond) throw new Error("assertion failed: s2Course1.name == \"COMP 101\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s2Course1.name,"COMP 101")))};
        {((cond) => {if (!cond) throw new Error("assertion failed: s2Course1.credits == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s2Course1.credits,2)))};
        {((cond) => {if (!cond) throw new Error("assertion failed: s2Course2.name == \"COMP 121\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s2Course2.name,"COMP 121")))};
        {((cond) => {if (!cond) throw new Error("assertion failed: s2Course2.credits == 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s2Course2.credits,4)))};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    const jStudent3 = ({"enrolled": false,"schoolId": "w/e","firstName": student2.firstName,"lastName": student2.lastName,"dob": ({"month": 1,"day": 1,"year": 1959}),"additionalData": ({"notes": "wow such notes","legacy": false,"emergencyContactsNumbers": ["123-345-9928"]})});
    const student3 = (Student._fromJson(jStudent3));
    {
      const $if_let_value = student3.additionalData;
      if ($if_let_value != undefined) {
        const additionalData = $if_let_value;
        const notes = ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(additionalData, "notes");
        {((cond) => {if (!cond) throw new Error("assertion failed: notes == \"wow such notes\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(notes,"wow such notes")))};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    const invalidStudent = ({"firstName": "I dont have","lastName": "Any other info"});
    {
      const $if_let_value = (Student._tryFromJson(invalidStudent));;
      if ($if_let_value != undefined) {
        const student = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: true")})(true)};
      }
    }
    {
      const $if_let_value = (Student._tryFromJson(jStudent2));;
      if ($if_let_value != undefined) {
        const student = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: student.firstName == \"Sally\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student.firstName,"Sally")))};
        {((cond) => {if (!cond) throw new Error("assertion failed: student.lastName == \"Reynolds\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student.lastName,"Reynolds")))};
        {((cond) => {if (!cond) throw new Error("assertion failed: !student.enrolled")})((!student.enrolled))};
        {((cond) => {if (!cond) throw new Error("assertion failed: student.schoolId == \"s2-xyz\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student.schoolId,"s2-xyz")))};
        {((cond) => {if (!cond) throw new Error("assertion failed: student.dob.month == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student.dob.month,5)))};
        {((cond) => {if (!cond) throw new Error("assertion failed: student.dob.day == 31")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student.dob.day,31)))};
        {((cond) => {if (!cond) throw new Error("assertion failed: student.dob.year == 1987")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student.dob.year,1987)))};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:flight school student :)",new $Closure2(this,"$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:lifting a student",new $Closure3(this,"$Closure3"));
    const jj1 = ({"data": ({"val": 10})});
    const externalBar = (externalStructs_MyOtherStruct._fromJson(jj1));
    {((cond) => {if (!cond) throw new Error("assertion failed: externalBar.data.val == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(externalBar.data.val,10)))};
    const jMyStruct = ({"m1": ({"val": 10}),"m2": ({"val": "10"})});
    const myStruct = (MyStruct._fromJson(jMyStruct));
    {((cond) => {if (!cond) throw new Error("assertion failed: myStruct.m1.val == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(myStruct.m1.val,10)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: myStruct.m2.val == \"10\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(myStruct.m2.val,"10")))};
    const schema = (MyStruct);
    (schema.validate(jMyStruct));
    const expectedSchema = ({"id": "/MyStruct","type": "object","properties": ({"m1": ({"type": "object","properties": ({"val": ({"type": "number"})}),"required": ["val"]}),"m2": ({"type": "object","properties": ({"val": ({"type": "string"})}),"required": ["val"]})}),"required": ["m1", "m2"]});
    {((cond) => {if (!cond) throw new Error("assertion failed: schema.asStr() == Json.stringify(expectedSchema)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((schema.asStr()),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([expectedSchema]))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight schema usage",new $Closure4(this,"$Closure4"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "struct_from_json", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

## preflight.structs-1.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  return {  };
};

```

## preflight.structs2-2.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  return {  };
};

```

