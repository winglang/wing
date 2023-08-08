# [struct_from_json.w](../../../../../examples/tests/valid/struct_from_json.w) | compile | tf-aws

## Advisor.Struct.js
```js
module.exports = function(stdStruct, fromInline) {
  class Advisor {
    static _schema = {
      id: "/Advisor",
      type: "object",
      properties: {
        ...require("./Person.Struct.js")()._schema.properties,
        employeeID: { type: "string" },
      },
      required: [
        "employeeID",
        ...require("./Person.Struct.js")()._schema.required,
      ]
    }
    static _getDependencies() {
      return {
      }
    }
    static _validate(obj) {
      const validator = stdStruct._getValidator(this._getDependencies());
      const errors = validator.validate(obj, this._schema).errors;
      if (errors.length > 0) {
        throw new Error(`unable to parse ${this.name}:\n ${errors.join("\n- ")}`);
      }
      return obj;
    }
    static _toInflightType(context) {
      return fromInline(`require("./Advisor.Struct.js")(${ context._lift(stdStruct) })`);
    }
  }
  return Advisor;
};

```

## Bar.Struct.js
```js
module.exports = function(stdStruct, fromInline) {
  class Bar {
    static _schema = {
      id: "/Bar",
      type: "object",
      properties: {
        ...require("./Foo.Struct.js")()._schema.properties,
        b: { type: "number" },
      },
      required: [
        "b",
        ...require("./Foo.Struct.js")()._schema.required,
      ]
    }
    static _getDependencies() {
      return {
      }
    }
    static _validate(obj) {
      const validator = stdStruct._getValidator(this._getDependencies());
      const errors = validator.validate(obj, this._schema).errors;
      if (errors.length > 0) {
        throw new Error(`unable to parse ${this.name}:\n ${errors.join("\n- ")}`);
      }
      return obj;
    }
    static _toInflightType(context) {
      return fromInline(`require("./Bar.Struct.js")(${ context._lift(stdStruct) })`);
    }
  }
  return Bar;
};

```

## Course.Struct.js
```js
module.exports = function(stdStruct, fromInline) {
  class Course {
    static _schema = {
      id: "/Course",
      type: "object",
      properties: {
        name: { type: "string" },
        credits: { type: "number" },
      },
      required: [
        "name",
        "credits",
      ]
    }
    static _getDependencies() {
      return {
      }
    }
    static _validate(obj) {
      const validator = stdStruct._getValidator(this._getDependencies());
      const errors = validator.validate(obj, this._schema).errors;
      if (errors.length > 0) {
        throw new Error(`unable to parse ${this.name}:\n ${errors.join("\n- ")}`);
      }
      return obj;
    }
    static _toInflightType(context) {
      return fromInline(`require("./Course.Struct.js")(${ context._lift(stdStruct) })`);
    }
  }
  return Course;
};

```

## CourseResults.Struct.js
```js
module.exports = function(stdStruct, fromInline) {
  class CourseResults {
    static _schema = {
      id: "/CourseResults",
      type: "object",
      properties: {
        course: { "$ref": "/Course" },
        grade: { type: "string" },
        dateTaken: { "$ref": "/Date" },
      },
      required: [
        "course",
        "grade",
        "dateTaken",
      ]
    }
    static _getDependencies() {
      return {
        "/Course": require("./Course.Struct.js")()._schema,
        ...require("./Course.Struct.js")()._getDependencies(),
        "/Date": require("./Date.Struct.js")()._schema,
        ...require("./Date.Struct.js")()._getDependencies(),
      }
    }
    static _validate(obj) {
      const validator = stdStruct._getValidator(this._getDependencies());
      const errors = validator.validate(obj, this._schema).errors;
      if (errors.length > 0) {
        throw new Error(`unable to parse ${this.name}:\n ${errors.join("\n- ")}`);
      }
      return obj;
    }
    static _toInflightType(context) {
      return fromInline(`require("./CourseResults.Struct.js")(${ context._lift(stdStruct) })`);
    }
  }
  return CourseResults;
};

```

## Date.Struct.js
```js
module.exports = function(stdStruct, fromInline) {
  class Date {
    static _schema = {
      id: "/Date",
      type: "object",
      properties: {
        month: { type: "number" },
        day: { type: "number" },
        year: { type: "number" },
      },
      required: [
        "month",
        "day",
        "year",
      ]
    }
    static _getDependencies() {
      return {
      }
    }
    static _validate(obj) {
      const validator = stdStruct._getValidator(this._getDependencies());
      const errors = validator.validate(obj, this._schema).errors;
      if (errors.length > 0) {
        throw new Error(`unable to parse ${this.name}:\n ${errors.join("\n- ")}`);
      }
      return obj;
    }
    static _toInflightType(context) {
      return fromInline(`require("./Date.Struct.js")(${ context._lift(stdStruct) })`);
    }
  }
  return Date;
};

```

## Foo.Struct.js
```js
module.exports = function(stdStruct, fromInline) {
  class Foo {
    static _schema = {
      id: "/Foo",
      type: "object",
      properties: {
        f: { type: "string" },
      },
      required: [
        "f",
      ]
    }
    static _getDependencies() {
      return {
      }
    }
    static _validate(obj) {
      const validator = stdStruct._getValidator(this._getDependencies());
      const errors = validator.validate(obj, this._schema).errors;
      if (errors.length > 0) {
        throw new Error(`unable to parse ${this.name}:\n ${errors.join("\n- ")}`);
      }
      return obj;
    }
    static _toInflightType(context) {
      return fromInline(`require("./Foo.Struct.js")(${ context._lift(stdStruct) })`);
    }
  }
  return Foo;
};

```

## Foosible.Struct.js
```js
module.exports = function(stdStruct, fromInline) {
  class Foosible {
    static _schema = {
      id: "/Foosible",
      type: "object",
      properties: {
        f: { type: "string" },
      },
      required: [
      ]
    }
    static _getDependencies() {
      return {
      }
    }
    static _validate(obj) {
      const validator = stdStruct._getValidator(this._getDependencies());
      const errors = validator.validate(obj, this._schema).errors;
      if (errors.length > 0) {
        throw new Error(`unable to parse ${this.name}:\n ${errors.join("\n- ")}`);
      }
      return obj;
    }
    static _toInflightType(context) {
      return fromInline(`require("./Foosible.Struct.js")(${ context._lift(stdStruct) })`);
    }
  }
  return Foosible;
};

```

## Person.Struct.js
```js
module.exports = function(stdStruct, fromInline) {
  class Person {
    static _schema = {
      id: "/Person",
      type: "object",
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        dob: { "$ref": "/Date" },
      },
      required: [
        "firstName",
        "lastName",
        "dob",
      ]
    }
    static _getDependencies() {
      return {
        "/Date": require("./Date.Struct.js")()._schema,
        ...require("./Date.Struct.js")()._getDependencies(),
      }
    }
    static _validate(obj) {
      const validator = stdStruct._getValidator(this._getDependencies());
      const errors = validator.validate(obj, this._schema).errors;
      if (errors.length > 0) {
        throw new Error(`unable to parse ${this.name}:\n ${errors.join("\n- ")}`);
      }
      return obj;
    }
    static _toInflightType(context) {
      return fromInline(`require("./Person.Struct.js")(${ context._lift(stdStruct) })`);
    }
  }
  return Person;
};

```

## Student.Struct.js
```js
module.exports = function(stdStruct, fromInline) {
  class Student {
    static _schema = {
      id: "/Student",
      type: "object",
      properties: {
        ...require("./Person.Struct.js")()._schema.properties,
        enrolled: { type: "boolean" },
        schoolId: { type: "string" },
        advisor: { "$ref": "/Advisor" },
        enrolledCourses: { type: "array", uniqueItems: true, items: { "$ref": "/Course" } },
        coursesTaken: { type: "array",  items: { "$ref": "/CourseResults" } },
        additionalData: { type: "object" },
      },
      required: [
        "enrolled",
        "schoolId",
        ...require("./Person.Struct.js")()._schema.required,
      ]
    }
    static _getDependencies() {
      return {
        "/Advisor": require("./Advisor.Struct.js")()._schema,
        ...require("./Advisor.Struct.js")()._getDependencies(),
        "/Course": require("./Course.Struct.js")()._schema,
        ...require("./Course.Struct.js")()._getDependencies(),
        "/CourseResults": require("./CourseResults.Struct.js")()._schema,
        ...require("./CourseResults.Struct.js")()._getDependencies(),
      }
    }
    static _validate(obj) {
      const validator = stdStruct._getValidator(this._getDependencies());
      const errors = validator.validate(obj, this._schema).errors;
      if (errors.length > 0) {
        throw new Error(`unable to parse ${this.name}:\n ${errors.join("\n- ")}`);
      }
      return obj;
    }
    static _toInflightType(context) {
      return fromInline(`require("./Student.Struct.js")(${ context._lift(stdStruct) })`);
    }
  }
  return Student;
};

```

## inflight.$Closure1.js
```js
module.exports = function({ $Student }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const jStudent3 = Object.freeze({"firstName":"struct","lastName":"greatest","enrolled":true,"schoolId":"s3-inflight","dob":Object.freeze({"month":4,"day":1,"year":1999}),"coursesTaken":[Object.freeze({"grade":"B","dateTaken":Object.freeze({"month":5,"day":10,"year":2021}),"course":Object.freeze({"name":"COMP 101","credits":2})}), Object.freeze({"grade":"A","dateTaken":Object.freeze({"month":5,"day":10,"year":2021}),"course":Object.freeze({"name":"COMP 121","credits":4})})]});
      const studentInflight1 = ((j, s) => {return s._validate(j)})(jStudent3, $Student);
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.firstName == \"struct\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.firstName,"struct")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.lastName == \"greatest\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.lastName,"greatest")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.enrolled")})(studentInflight1.enrolled)};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.schoolId == \"s3-inflight\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.schoolId,"s3-inflight")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.dob.month == 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.dob.month,4)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.dob.day == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.dob.day,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.dob.year == 1999")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.dob.year,1999)))};
      {
        const $IF_LET_VALUE = studentInflight1.coursesTaken;
        if ($IF_LET_VALUE != undefined) {
          const coursesTaken = $IF_LET_VALUE;
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
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $Student, $jStudent1 }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const studentInflight1 = ((j, s) => {return s._validate(j)})($jStudent1, $Student);
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.firstName == \"John\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.firstName,"John")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.lastName == \"Smith\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.lastName,"Smith")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.enrolled")})(studentInflight1.enrolled)};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.schoolId == \"s1-xyz\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.schoolId,"s1-xyz")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.dob.month == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.dob.month,10)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.dob.day == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.dob.day,10)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studentInflight1.dob.year == 2005")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studentInflight1.dob.year,2005)))};
    }
  }
  return $Closure2;
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
      "value": "[[\"root/Default/Default/test:flight school student :)\",\"${aws_lambda_function.testflightschoolstudent_Handler_8BE7AA78.arn}\"],[\"root/Default/Default/test:lifting a student\",\"${aws_lambda_function.testliftingastudent_Handler_30A43B55.arn}\"]]"
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
      "testliftingastudent_Handler_30A43B55": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lifting a student/Handler/Default",
            "uniqueId": "testliftingastudent_Handler_30A43B55"
          }
        },
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
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $Student: ${context._lift(Student)},
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
            $Student: ${context._lift(Student)},
            $jStudent1: ${context._lift(jStudent1)},
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
          $Closure2._registerBindObject(jStudent1, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const Foo = require("./Foo.Struct.js")($stdlib.std.Struct, $stdlib.core.NodeJsCode.fromInline);
    const jFoo = Object.freeze({"f":"bar"});
    {((cond) => {if (!cond) throw new Error("assertion failed: Foo.fromJson(jFoo).f == \"bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((j, s) => {return s._validate(j)})(jFoo, Foo).f,"bar")))};
    const Foosible = require("./Foosible.Struct.js")($stdlib.std.Struct, $stdlib.core.NodeJsCode.fromInline);
    const jFoosible = Object.freeze({});
    const jFoosible2 = Object.freeze({"f":"bar"});
    {
      const $IF_LET_VALUE = ((j, s) => {return s._validate(j)})(jFoosible, Foosible).f;
      if ($IF_LET_VALUE != undefined) {
        const f = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    {
      const $IF_LET_VALUE = ((j, s) => {return s._validate(j)})(jFoosible2, Foosible).f;
      if ($IF_LET_VALUE != undefined) {
        const f = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error("assertion failed: f == \"bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(f,"bar")))};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    const Bar = require("./Bar.Struct.js")($stdlib.std.Struct, $stdlib.core.NodeJsCode.fromInline);
    const jBar = Object.freeze({"f":"bar","b":10});
    const b = ((j, s) => {return s._validate(j)})(jBar, Bar);
    {((cond) => {if (!cond) throw new Error("assertion failed: b.f == \"bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(b.f,"bar")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: b.b == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(b.b,10)))};
    const Date = require("./Date.Struct.js")($stdlib.std.Struct, $stdlib.core.NodeJsCode.fromInline);
    const Person = require("./Person.Struct.js")($stdlib.std.Struct, $stdlib.core.NodeJsCode.fromInline);
    const Advisor = require("./Advisor.Struct.js")($stdlib.std.Struct, $stdlib.core.NodeJsCode.fromInline);
    const Course = require("./Course.Struct.js")($stdlib.std.Struct, $stdlib.core.NodeJsCode.fromInline);
    const CourseResults = require("./CourseResults.Struct.js")($stdlib.std.Struct, $stdlib.core.NodeJsCode.fromInline);
    const Student = require("./Student.Struct.js")($stdlib.std.Struct, $stdlib.core.NodeJsCode.fromInline);
    const jStudent1 = Object.freeze({"firstName":"John","lastName":"Smith","enrolled":true,"schoolId":"s1-xyz","dob":Object.freeze({"month":10,"day":10,"year":2005}),"enrolledCourses":[]});
    const student1 = ((j, s) => {return s._validate(j)})(jStudent1, Student);
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.firstName == \"John\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.firstName,"John")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.lastName == \"Smith\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.lastName,"Smith")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.enrolled")})(student1.enrolled)};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.schoolId == \"s1-xyz\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.schoolId,"s1-xyz")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.dob.month == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.dob.month,10)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.dob.day == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.dob.day,10)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.dob.year == 2005")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.dob.year,2005)))};
    const jStudent2 = Object.freeze({"advisor":Object.freeze({"firstName":"Tom","lastName":"Baker","dob":Object.freeze({"month":1,"day":1,"year":1983}),"employeeID":"emp123"}),"firstName":"Sally","lastName":"Reynolds","enrolled":false,"schoolId":"s2-xyz","dob":Object.freeze({"month":5,"day":31,"year":1987}),"enrolledCourses":[Object.freeze({"name":"COMP 101","credits":2}), Object.freeze({"name":"COMP 121","credits":4})],"coursesTaken":[Object.freeze({"grade":"F","dateTaken":Object.freeze({"month":5,"day":10,"year":2021}),"course":Object.freeze({"name":"COMP 101","credits":2})}), Object.freeze({"grade":"D","dateTaken":Object.freeze({"month":5,"day":10,"year":2021}),"course":Object.freeze({"name":"COMP 121","credits":4})})]});
    const student2 = ((j, s) => {return s._validate(j)})(jStudent2, Student);
    {((cond) => {if (!cond) throw new Error("assertion failed: student2.firstName == \"Sally\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student2.firstName,"Sally")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student2.lastName == \"Reynolds\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student2.lastName,"Reynolds")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !student2.enrolled")})((!student2.enrolled))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student2.schoolId == \"s2-xyz\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student2.schoolId,"s2-xyz")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student2.dob.month == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student2.dob.month,5)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student2.dob.day == 31")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student2.dob.day,31)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student2.dob.year == 1987")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student2.dob.year,1987)))};
    {
      const $IF_LET_VALUE = student2.enrolledCourses;
      if ($IF_LET_VALUE != undefined) {
        const enrolledCourses = $IF_LET_VALUE;
        const courses = Object.freeze([...(enrolledCourses)]);
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
    const jStudent3 = Object.freeze({"enrolled":false,"schoolId":"w/e","firstName":student2.firstName,"lastName":student2.lastName,"dob":Object.freeze({"month":1,"day":1,"year":1959}),"additionalData":Object.freeze({"notes":"wow such notes","legacy":false,"emergencyContactsNumbers":["123-345-9928"]})});
    const student3 = ((j, s) => {return s._validate(j)})(jStudent3, Student);
    {
      const $IF_LET_VALUE = student3.additionalData;
      if ($IF_LET_VALUE != undefined) {
        const additionalData = $IF_LET_VALUE;
        const notes = (additionalData)["notes"];
        {((cond) => {if (!cond) throw new Error("assertion failed: notes == \"wow such notes\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(notes,"wow such notes")))};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:flight school student :)",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:lifting a student",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "struct_from_json", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

