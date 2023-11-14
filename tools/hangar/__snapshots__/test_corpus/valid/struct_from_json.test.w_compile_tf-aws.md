# [struct_from_json.test.w](../../../../../examples/tests/valid/struct_from_json.test.w) | compile | tf-aws

## inflight.$Closure1-2.js
```js
"use strict";
module.exports = function({ $cloud_BucketProps, $j }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const x = ((json, validateOptions) => ($cloud_BucketProps._fromJson(json, validateOptions)))($j);
      {((cond) => {if (!cond) throw new Error("assertion failed: x.public == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(x.public,false)))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-2.js
```js
"use strict";
module.exports = function({ $Student }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const jStudent3 = ({"firstName": "struct","lastName": "greatest","enrolled": true,"schoolId": "s3-inflight","dob": ({"month": 4,"day": 1,"year": 1999}),"coursesTaken": [({"grade": "B","dateTaken": ({"month": 5,"day": 10,"year": 2021}),"course": ({"name": "COMP 101","credits": 2})}), ({"grade": "A","dateTaken": ({"month": 5,"day": 10,"year": 2021}),"course": ({"name": "COMP 121","credits": 4})})]});
      const studentInflight1 = ((json, validateOptions) => ($Student._fromJson(json, validateOptions)))(jStudent3);
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

## inflight.$Closure3-2.js
```js
"use strict";
module.exports = function({ $Student, $jStudent1 }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const studentInflight1 = ((json, validateOptions) => ($Student._fromJson(json, validateOptions)))($jStudent1);
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

## inflight.$Closure4-2.js
```js
"use strict";
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

## inflight.$Closure5-2.js
```js
"use strict";
module.exports = function({ $Student, $std_Boolean, $std_Number, $std_String }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $std_String.fromJson(10, { unsafe: true }));
      (await $std_Boolean.fromJson(10, { unsafe: true }));
      (await $std_Number.fromJson("cool", { unsafe: true }));
      ((json, validateOptions) => ($Student._fromJson(json, validateOptions)))(({"obviously": "not a student"}), { unsafe: true });
    }
  }
  return $Closure5;
}

```

## inflight.UsesStructInImportedFile-1.js
```js
"use strict";
module.exports = function({  }) {
  class UsesStructInImportedFile {
    constructor({  }) {
    }
  }
  return UsesStructInImportedFile;
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
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
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
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const externalStructs = require("./preflight.structs-1.js")({ $stdlib });
const otherExternalStructs = require("./preflight.structs2-2.js")({ $stdlib });
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const Bar = $stdlib.std.Struct._createJsonSchema({id:"/Bar",type:"object",properties:{b:{type:"number"},f:{type:"string"},},required:["b","f",]});
    const Foo = $stdlib.std.Struct._createJsonSchema({id:"/Foo",type:"object",properties:{f:{type:"string"},},required:["f",]});
    const Foosible = $stdlib.std.Struct._createJsonSchema({id:"/Foosible",type:"object",properties:{f:{type:"string"},},required:[]});
    const MyStruct = $stdlib.std.Struct._createJsonSchema({id:"/MyStruct",type:"object",properties:{m1:{type:"object",properties:{val:{type:"number"},},required:["val",]},m2:{type:"object",properties:{val:{type:"string"},},required:["val",]},},required:["m1","m2",]});
    const SomeStruct = $stdlib.std.Struct._createJsonSchema({id:"/SomeStruct",type:"object",properties:{foo:{type:"string"},},required:["foo",]});
    const Student = $stdlib.std.Struct._createJsonSchema({id:"/Student",type:"object",properties:{additionalData:{type:"object"},advisor:{type:"object",properties:{dob:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},employeeID:{type:"string"},firstName:{type:"string"},lastName:{type:"string"},},required:["dob","employeeID","firstName","lastName",]},coursesTaken:{type:"array",items:{type:"object",properties:{course:{type:"object",properties:{credits:{type:"number"},name:{type:"string"},},required:["credits","name",]},dateTaken:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},grade:{type:"string"},},required:["course","dateTaken","grade",]}},dob:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},enrolled:{type:"boolean"},enrolledCourses:{type:"array",uniqueItems:true,items:{type:"object",properties:{credits:{type:"number"},name:{type:"string"},},required:["credits","name",]}},firstName:{type:"string"},lastName:{type:"string"},schoolId:{type:"string"},},required:["dob","enrolled","firstName","lastName","schoolId",]});
    const cloud_BucketProps = $stdlib.std.Struct._createJsonSchema({id:"/BucketProps",type:"object",properties:{public:{type:"boolean"},},required:[]});
    const externalStructs_MyOtherStruct = $stdlib.std.Struct._createJsonSchema({id:"/MyOtherStruct",type:"object",properties:{data:{type:"object",properties:{val:{type:"number"},},required:["val",]},},required:["data",]});
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-2.js")({
            $cloud_BucketProps: ${context._lift($stdlib.core.toLiftableModuleType(cloud_BucketProps, "@winglang/sdk/cloud", "BucketProps"))},
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
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(j, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-2.js")({
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
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-2.js")({
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
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerOnLiftObject(jStudent1, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure4-2.js")({
            $MyStruct: ${context._lift(MyStruct)},
            $_schema_asStr___: ${context._lift((schema.asStr()))},
            $expectedSchema: ${context._lift(expectedSchema)},
            $jMyStruct: ${context._lift(jMyStruct)},
            $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure4._registerOnLiftObject((schema.asStr()), host, []);
          $Closure4._registerOnLiftObject(expectedSchema, host, []);
          $Closure4._registerOnLiftObject(jMyStruct, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure5 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure5-2.js")({
            $Student: ${context._lift(Student)},
            $std_Boolean: ${context._lift($stdlib.core.toLiftableModuleType(std.Boolean, "@winglang/sdk/std", "Boolean"))},
            $std_Number: ${context._lift($stdlib.core.toLiftableModuleType(std.Number, "@winglang/sdk/std", "Number"))},
            $std_String: ${context._lift($stdlib.core.toLiftableModuleType(std.String, "@winglang/sdk/std", "String"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure5Client = ${$Closure5._toInflightType(this)};
            const client = new $Closure5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
    }
    const j = ({"public": false});
    const x = ((json, validateOptions) => (cloud_BucketProps._fromJson(json, validateOptions)))(j);
    {((cond) => {if (!cond) throw new Error("assertion failed: x.public == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(x.public,false)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:inflight jsii struct conversion", new $Closure1(this, "$Closure1"));
    const jFoo = ({"f": "bar"});
    {((cond) => {if (!cond) throw new Error("assertion failed: Foo.fromJson(jFoo).f == \"bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((json, validateOptions) => (Foo._fromJson(json, validateOptions)))(jFoo).f,"bar")))};
    const jFoosible = ({});
    const jFoosible2 = ({"f": "bar"});
    {
      const $if_let_value = ((json, validateOptions) => (Foosible._fromJson(json, validateOptions)))(jFoosible).f;
      if ($if_let_value != undefined) {
        const f = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    {
      const $if_let_value = ((json, validateOptions) => (Foosible._fromJson(json, validateOptions)))(jFoosible2).f;
      if ($if_let_value != undefined) {
        const f = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: f == \"bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(f,"bar")))};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    const jBar = ({"f": "bar","b": 10});
    const b = ((json, validateOptions) => (Bar._fromJson(json, validateOptions)))(jBar);
    {((cond) => {if (!cond) throw new Error("assertion failed: b.f == \"bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(b.f,"bar")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: b.b == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(b.b,10)))};
    const jStudent1 = ({"firstName": "John","lastName": "Smith","enrolled": true,"schoolId": "s1-xyz","dob": ({"month": 10,"day": 10,"year": 2005}),"enrolledCourses": []});
    const student1 = ((json, validateOptions) => (Student._fromJson(json, validateOptions)))(jStudent1);
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.firstName == \"John\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.firstName,"John")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.lastName == \"Smith\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.lastName,"Smith")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.enrolled")})(student1.enrolled)};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.schoolId == \"s1-xyz\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.schoolId,"s1-xyz")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.dob.month == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.dob.month,10)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.dob.day == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.dob.day,10)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: student1.dob.year == 2005")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(student1.dob.year,2005)))};
    const jStudent2 = ({"advisor": ({"firstName": "Tom","lastName": "Baker","dob": ({"month": 1,"day": 1,"year": 1983}),"employeeID": "emp123"}),"firstName": "Sally","lastName": "Reynolds","enrolled": false,"schoolId": "s2-xyz","dob": ({"month": 5,"day": 31,"year": 1987}),"enrolledCourses": [({"name": "COMP 101","credits": 2}), ({"name": "COMP 121","credits": 4})],"coursesTaken": [({"grade": "F","dateTaken": ({"month": 5,"day": 10,"year": 2021}),"course": ({"name": "COMP 101","credits": 2})}), ({"grade": "D","dateTaken": ({"month": 5,"day": 10,"year": 2021}),"course": ({"name": "COMP 121","credits": 4})})]});
    const student2 = ((json, validateOptions) => (Student._fromJson(json, validateOptions)))(jStudent2);
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
    const student3 = ((json, validateOptions) => (Student._fromJson(json, validateOptions)))(jStudent3);
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
      const $if_let_value = ((json) => (Student._tryFromJson(json)))(invalidStudent);
      if ($if_let_value != undefined) {
        const student = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: true")})(true)};
      }
    }
    {
      const $if_let_value = ((json) => (Student._tryFromJson(json)))(jStudent2);
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
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:flight school student :)", new $Closure2(this, "$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:lifting a student", new $Closure3(this, "$Closure3"));
    const jj1 = ({"data": ({"val": 10})});
    const externalBar = ((json, validateOptions) => (externalStructs_MyOtherStruct._fromJson(json, validateOptions)))(jj1);
    {((cond) => {if (!cond) throw new Error("assertion failed: externalBar.data.val == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(externalBar.data.val,10)))};
    const jMyStruct = ({"m1": ({"val": 10}),"m2": ({"val": "10"})});
    const myStruct = ((json, validateOptions) => (MyStruct._fromJson(json, validateOptions)))(jMyStruct);
    {((cond) => {if (!cond) throw new Error("assertion failed: myStruct.m1.val == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(myStruct.m1.val,10)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: myStruct.m2.val == \"10\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(myStruct.m2.val,"10")))};
    const schema = (MyStruct);
    (schema.validate(jMyStruct));
    const expectedSchema = ({"id": "/MyStruct","type": "object","properties": ({"m1": ({"type": "object","properties": ({"val": ({"type": "number"})}),"required": ["val"]}),"m2": ({"type": "object","properties": ({"val": ({"type": "string"})}),"required": ["val"]})}),"required": ["m1", "m2"]});
    {((cond) => {if (!cond) throw new Error("assertion failed: schema.asStr() == Json.stringify(expectedSchema)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((schema.asStr()),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([expectedSchema]))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:inflight schema usage", new $Closure4(this, "$Closure4"));
    (std.String.fromJson(10, { unsafe: true }));
    (std.Boolean.fromJson(10, { unsafe: true }));
    (std.Number.fromJson("cool", { unsafe: true }));
    ((json, validateOptions) => (Student._fromJson(json, validateOptions)))(({"obviously": "not a student"}), { unsafe: true });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:unsafe flight", new $Closure5(this, "$Closure5"));
    new otherExternalStructs.UsesStructInImportedFile(this, "otherExternalStructs.UsesStructInImportedFile");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "struct_from_json.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

## preflight.structs-1.js
```js
"use strict";
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  const Bar = $stdlib.std.Struct._createJsonSchema({id:"/Bar",type:"object",properties:{b:{type:"number"},f:{type:"string"},},required:["b","f",]});
  const Foo = $stdlib.std.Struct._createJsonSchema({id:"/Foo",type:"object",properties:{f:{type:"string"},},required:["f",]});
  const Foosible = $stdlib.std.Struct._createJsonSchema({id:"/Foosible",type:"object",properties:{f:{type:"string"},},required:[]});
  const MyStruct = $stdlib.std.Struct._createJsonSchema({id:"/MyStruct",type:"object",properties:{m1:{type:"object",properties:{val:{type:"number"},},required:["val",]},m2:{type:"object",properties:{val:{type:"string"},},required:["val",]},},required:["m1","m2",]});
  const SomeStruct = $stdlib.std.Struct._createJsonSchema({id:"/SomeStruct",type:"object",properties:{foo:{type:"string"},},required:["foo",]});
  const Student = $stdlib.std.Struct._createJsonSchema({id:"/Student",type:"object",properties:{additionalData:{type:"object"},advisor:{type:"object",properties:{dob:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},employeeID:{type:"string"},firstName:{type:"string"},lastName:{type:"string"},},required:["dob","employeeID","firstName","lastName",]},coursesTaken:{type:"array",items:{type:"object",properties:{course:{type:"object",properties:{credits:{type:"number"},name:{type:"string"},},required:["credits","name",]},dateTaken:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},grade:{type:"string"},},required:["course","dateTaken","grade",]}},dob:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},enrolled:{type:"boolean"},enrolledCourses:{type:"array",uniqueItems:true,items:{type:"object",properties:{credits:{type:"number"},name:{type:"string"},},required:["credits","name",]}},firstName:{type:"string"},lastName:{type:"string"},schoolId:{type:"string"},},required:["dob","enrolled","firstName","lastName","schoolId",]});
  const cloud_BucketProps = $stdlib.std.Struct._createJsonSchema({id:"/BucketProps",type:"object",properties:{public:{type:"boolean"},},required:[]});
  const externalStructs_MyOtherStruct = $stdlib.std.Struct._createJsonSchema({id:"/MyOtherStruct",type:"object",properties:{data:{type:"object",properties:{val:{type:"number"},},required:["val",]},},required:["data",]});
  return {  };
};

```

## preflight.structs2-2.js
```js
"use strict";
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  const Bar = $stdlib.std.Struct._createJsonSchema({id:"/Bar",type:"object",properties:{b:{type:"number"},f:{type:"string"},},required:["b","f",]});
  const Foo = $stdlib.std.Struct._createJsonSchema({id:"/Foo",type:"object",properties:{f:{type:"string"},},required:["f",]});
  const Foosible = $stdlib.std.Struct._createJsonSchema({id:"/Foosible",type:"object",properties:{f:{type:"string"},},required:[]});
  const MyStruct = $stdlib.std.Struct._createJsonSchema({id:"/MyStruct",type:"object",properties:{m1:{type:"object",properties:{val:{type:"number"},},required:["val",]},m2:{type:"object",properties:{val:{type:"string"},},required:["val",]},},required:["m1","m2",]});
  const SomeStruct = $stdlib.std.Struct._createJsonSchema({id:"/SomeStruct",type:"object",properties:{foo:{type:"string"},},required:["foo",]});
  const Student = $stdlib.std.Struct._createJsonSchema({id:"/Student",type:"object",properties:{additionalData:{type:"object"},advisor:{type:"object",properties:{dob:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},employeeID:{type:"string"},firstName:{type:"string"},lastName:{type:"string"},},required:["dob","employeeID","firstName","lastName",]},coursesTaken:{type:"array",items:{type:"object",properties:{course:{type:"object",properties:{credits:{type:"number"},name:{type:"string"},},required:["credits","name",]},dateTaken:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},grade:{type:"string"},},required:["course","dateTaken","grade",]}},dob:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},enrolled:{type:"boolean"},enrolledCourses:{type:"array",uniqueItems:true,items:{type:"object",properties:{credits:{type:"number"},name:{type:"string"},},required:["credits","name",]}},firstName:{type:"string"},lastName:{type:"string"},schoolId:{type:"string"},},required:["dob","enrolled","firstName","lastName","schoolId",]});
  const cloud_BucketProps = $stdlib.std.Struct._createJsonSchema({id:"/BucketProps",type:"object",properties:{public:{type:"boolean"},},required:[]});
  const externalStructs_MyOtherStruct = $stdlib.std.Struct._createJsonSchema({id:"/MyOtherStruct",type:"object",properties:{data:{type:"object",properties:{val:{type:"number"},},required:["val",]},},required:["data",]});
  class UsesStructInImportedFile extends $stdlib.std.Resource {
    constructor($scope, $id, ) {
      super($scope, $id);
      this.someStruct = ((json, validateOptions) => (SomeStruct._fromJson(json, validateOptions)))(({"foo": "123"}));
    }
    static _toInflightType(context) {
      return `
        require("./inflight.UsesStructInImportedFile-1.js")({
        })
      `;
    }
    _toInflight() {
      return `
        (await (async () => {
          const UsesStructInImportedFileClient = ${UsesStructInImportedFile._toInflightType(this)};
          const client = new UsesStructInImportedFileClient({
          });
          if (client.$inflight_init) { await client.$inflight_init(); }
          return client;
        })())
      `;
    }
    _supportedOps() {
      return ["$inflight_init"];
    }
  }
  return { UsesStructInImportedFile };
};

```

