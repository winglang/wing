# [struct_from_json.w](../../../../../examples/tests/valid/struct_from_json.w) | compile | tf-aws

## Advisor.Struct.js
```js
module.exports = function(stdStruct) {
  class Advisor {
    static jsonSchema() {
      return {
        id: "/Advisor",
        type: "object",
        properties: {
          ...require("./Person.Struct.js")().jsonSchema().properties,
          employeeID: { type: "string" },
        },
        required: [
          "employeeID",
          ...require("./Person.Struct.js")().jsonSchema().required,
        ],
        $defs: {
          ...require("./Person.Struct.js")().jsonSchema().$defs,
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return `require("./Advisor.Struct.js")(${ context._lift(stdStruct) })`;
    }
  }
  return Advisor;
};

```

## Bar.Struct.js
```js
module.exports = function(stdStruct) {
  class Bar {
    static jsonSchema() {
      return {
        id: "/Bar",
        type: "object",
        properties: {
          ...require("./Foo.Struct.js")().jsonSchema().properties,
          b: { type: "number" },
        },
        required: [
          "b",
          ...require("./Foo.Struct.js")().jsonSchema().required,
        ],
        $defs: {
          ...require("./Foo.Struct.js")().jsonSchema().$defs,
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return `require("./Bar.Struct.js")(${ context._lift(stdStruct) })`;
    }
  }
  return Bar;
};

```

## Course.Struct.js
```js
module.exports = function(stdStruct) {
  class Course {
    static jsonSchema() {
      return {
        id: "/Course",
        type: "object",
        properties: {
          name: { type: "string" },
          credits: { type: "number" },
        },
        required: [
          "name",
          "credits",
        ],
        $defs: {
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return `require("./Course.Struct.js")(${ context._lift(stdStruct) })`;
    }
  }
  return Course;
};

```

## CourseResults.Struct.js
```js
module.exports = function(stdStruct) {
  class CourseResults {
    static jsonSchema() {
      return {
        id: "/CourseResults",
        type: "object",
        properties: {
          course: { "$ref": "#/$defs/Course" },
          grade: { type: "string" },
          dateTaken: { "$ref": "#/$defs/Date" },
        },
        required: [
          "course",
          "grade",
          "dateTaken",
        ],
        $defs: {
          "Course": { type: "object", "properties": require("./Course.Struct.js")().jsonSchema().properties },
          "Date": { type: "object", "properties": require("./Date.Struct.js")().jsonSchema().properties },
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return `require("./CourseResults.Struct.js")(${ context._lift(stdStruct) })`;
    }
  }
  return CourseResults;
};

```

## Date.Struct.js
```js
module.exports = function(stdStruct) {
  class Date {
    static jsonSchema() {
      return {
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
        ],
        $defs: {
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return `require("./Date.Struct.js")(${ context._lift(stdStruct) })`;
    }
  }
  return Date;
};

```

## Foo.Struct.js
```js
module.exports = function(stdStruct) {
  class Foo {
    static jsonSchema() {
      return {
        id: "/Foo",
        type: "object",
        properties: {
          f: { type: "string" },
        },
        required: [
          "f",
        ],
        $defs: {
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return `require("./Foo.Struct.js")(${ context._lift(stdStruct) })`;
    }
  }
  return Foo;
};

```

## Foosible.Struct.js
```js
module.exports = function(stdStruct) {
  class Foosible {
    static jsonSchema() {
      return {
        id: "/Foosible",
        type: "object",
        properties: {
          f: { type: "string" },
        },
        required: [
        ],
        $defs: {
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return `require("./Foosible.Struct.js")(${ context._lift(stdStruct) })`;
    }
  }
  return Foosible;
};

```

## MyOtherStruct.Struct.js
```js
module.exports = function(stdStruct) {
  class MyOtherStruct {
    static jsonSchema() {
      return {
        id: "/MyOtherStruct",
        type: "object",
        properties: {
          data: { "$ref": "#/$defs/MyStruct" },
        },
        required: [
          "data",
        ],
        $defs: {
          "MyStruct": { type: "object", "properties": require("./MyStruct.Struct.js")().jsonSchema().properties },
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return `require("./MyOtherStruct.Struct.js")(${ context._lift(stdStruct) })`;
    }
  }
  return MyOtherStruct;
};

```

## MyStruct.Struct.js
```js
module.exports = function(stdStruct) {
  class MyStruct {
    static jsonSchema() {
      return {
        id: "/MyStruct",
        type: "object",
        properties: {
          val: { type: "number" },
        },
        required: [
          "val",
        ],
        $defs: {
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return `require("./MyStruct.Struct.js")(${ context._lift(stdStruct) })`;
    }
  }
  return MyStruct;
};

```

## Person.Struct.js
```js
module.exports = function(stdStruct) {
  class Person {
    static jsonSchema() {
      return {
        id: "/Person",
        type: "object",
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          dob: { "$ref": "#/$defs/Date" },
        },
        required: [
          "firstName",
          "lastName",
          "dob",
        ],
        $defs: {
          "Date": { type: "object", "properties": require("./Date.Struct.js")().jsonSchema().properties },
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return `require("./Person.Struct.js")(${ context._lift(stdStruct) })`;
    }
  }
  return Person;
};

```

## Student.Struct.js
```js
module.exports = function(stdStruct) {
  class Student {
    static jsonSchema() {
      return {
        id: "/Student",
        type: "object",
        properties: {
          ...require("./Person.Struct.js")().jsonSchema().properties,
          enrolled: { type: "boolean" },
          schoolId: { type: "string" },
          advisor: { "$ref": "#/$defs/Advisor" },
          enrolledCourses: { type: "array", uniqueItems: true, items: { "$ref": "#/$defs/Course" } },
          coursesTaken: { type: "array",  items: { "$ref": "#/$defs/CourseResults" } },
          additionalData: { type: "object" },
        },
        required: [
          "enrolled",
          "schoolId",
          ...require("./Person.Struct.js")().jsonSchema().required,
        ],
        $defs: {
          "Advisor": { type: "object", "properties": require("./Advisor.Struct.js")().jsonSchema().properties },
          "Course": { type: "object", "properties": require("./Course.Struct.js")().jsonSchema().properties },
          "CourseResults": { type: "object", "properties": require("./CourseResults.Struct.js")().jsonSchema().properties },
          ...require("./Person.Struct.js")().jsonSchema().$defs,
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return `require("./Student.Struct.js")(${ context._lift(stdStruct) })`;
    }
  }
  return Student;
};

```

## inflight.$Closure1-1.js
```js
module.exports = function({ $Student }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const jStudent3 = ({"firstName": "struct","lastName": "greatest","enrolled": true,"schoolId": "s3-inflight","dob": ({"month": 4,"day": 1,"year": 1999}),"coursesTaken": [({"grade": "B","dateTaken": ({"month": 5,"day": 10,"year": 2021}),"course": ({"name": "COMP 101","credits": 2})}), ({"grade": "A","dateTaken": ({"month": 5,"day": 10,"year": 2021}),"course": ({"name": "COMP 121","credits": 4})})]});
      const studentInflight1 = ($Student.fromJson(jStudent3));
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
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({ $Student, $jStudent1 }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const studentInflight1 = ($Student.fromJson($jStudent1));
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
      "value": "[]"
    }
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
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const externalStructs = require("./preflight.structs-1.js")({ $stdlib });
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $Student: ${context._lift(Student)},
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
            $jStudent1: ${context._lift(jStudent1)},
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
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(jStudent1, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const Foo = require("./Foo.Struct.js")($stdlib.std.Struct);
    const jFoo = ({"f": "bar"});
    {((cond) => {if (!cond) throw new Error("assertion failed: Foo.fromJson(jFoo).f == \"bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((Foo.fromJson(jFoo)).f,"bar")))};
    const Foosible = require("./Foosible.Struct.js")($stdlib.std.Struct);
    const jFoosible = ({});
    const jFoosible2 = ({"f": "bar"});
    {
      const $if_let_value = (Foosible.fromJson(jFoosible)).f;
      if ($if_let_value != undefined) {
        const f = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    {
      const $if_let_value = (Foosible.fromJson(jFoosible2)).f;
      if ($if_let_value != undefined) {
        const f = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: f == \"bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(f,"bar")))};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    const Bar = require("./Bar.Struct.js")($stdlib.std.Struct);
    const jBar = ({"f": "bar","b": 10});
    const b = (Bar.fromJson(jBar));
    {((cond) => {if (!cond) throw new Error("assertion failed: b.f == \"bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(b.f,"bar")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: b.b == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(b.b,10)))};
    const Date = require("./Date.Struct.js")($stdlib.std.Struct);
    const Person = require("./Person.Struct.js")($stdlib.std.Struct);
    const Advisor = require("./Advisor.Struct.js")($stdlib.std.Struct);
    const Course = require("./Course.Struct.js")($stdlib.std.Struct);
    const CourseResults = require("./CourseResults.Struct.js")($stdlib.std.Struct);
    const Student = require("./Student.Struct.js")($stdlib.std.Struct);
    const jStudent1 = ({"firstName": "John","lastName": "Smith","enrolled": true,"schoolId": "s1-xyz","dob": ({"month": 10,"day": 10,"year": 2005}),"enrolledCourses": []});
    const student1 = (Student.fromJson(jStudent1));
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.firstName == \"John\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.firstName,"John")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.lastName == \"Smith\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.lastName,"Smith")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.enrolled")})(student1.enrolled)};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.schoolId == \"s1-xyz\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.schoolId,"s1-xyz")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.dob.month == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.dob.month,10)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.dob.day == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.dob.day,10)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.dob.year == 2005")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.dob.year,2005)))};
    const jStudent2 = ({"advisor": ({"firstName": "Tom","lastName": "Baker","dob": ({"month": 1,"day": 1,"year": 1983}),"employeeID": "emp123"}),"firstName": "Sally","lastName": "Reynolds","enrolled": false,"schoolId": "s2-xyz","dob": ({"month": 5,"day": 31,"year": 1987}),"enrolledCourses": [({"name": "COMP 101","credits": 2}), ({"name": "COMP 121","credits": 4})],"coursesTaken": [({"grade": "F","dateTaken": ({"month": 5,"day": 10,"year": 2021}),"course": ({"name": "COMP 101","credits": 2})}), ({"grade": "D","dateTaken": ({"month": 5,"day": 10,"year": 2021}),"course": ({"name": "COMP 121","credits": 4})})]});
    const student2 = (Student.fromJson(jStudent2));
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
    const student3 = (Student.fromJson(jStudent3));
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
      const $if_let_value = (() => { try { return Student.fromJson(invalidStudent); } catch { return undefined; }})();;
      if ($if_let_value != undefined) {
        const student = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: true")})(true)};
      }
    }
    {
      const $if_let_value = (() => { try { return Student.fromJson(jStudent2); } catch { return undefined; }})();;
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
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:flight school student :)",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:lifting a student",new $Closure2(this,"$Closure2"));
    const jj1 = ({"data": ({"val": 10})});
    const externalBar = (externalStructs.MyOtherStruct.fromJson(jj1));
    {((cond) => {if (!cond) throw new Error("assertion failed: externalBar.data.val == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(externalBar.data.val,10)))};
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "struct_from_json", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

## preflight.structs-1.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  const MyStruct = require("./MyStruct.Struct.js")($stdlib.std.Struct);
  const MyOtherStruct = require("./MyOtherStruct.Struct.js")($stdlib.std.Struct);
  return { MyStruct, MyOtherStruct };
};

```

