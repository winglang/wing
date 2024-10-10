# [struct_from_json.test.w](../../../../../tests/valid/struct_from_json.test.w) | compile | tf-aws

## inflight.$Closure1-2.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $cloud_CounterProps, $j }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const x = $macros.__Struct_fromJson(false, $cloud_CounterProps, $j);
      $helpers.assert($helpers.eq(x.initial, 3), "x.initial == 3");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-2.cjs.map
```

## inflight.$Closure2-2.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $Student }) {
  class $Closure2 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const jStudent3 = ({"firstName": "struct", "lastName": "greatest", "enrolled": true, "schoolId": "s3-inflight", "dob": ({"month": 4, "day": 1, "year": 1999}), "coursesTaken": [({"grade": "B", "dateTaken": ({"month": 5, "day": 10, "year": 2021}), "course": ({"name": "COMP 101", "credits": 2})}), ({"grade": "A", "dateTaken": ({"month": 5, "day": 10, "year": 2021}), "course": ({"name": "COMP 121", "credits": 4})})]});
      const studentInflight1 = $macros.__Struct_fromJson(false, $Student, jStudent3);
      $helpers.assert($helpers.eq(studentInflight1.firstName, "struct"), "studentInflight1.firstName == \"struct\"");
      $helpers.assert($helpers.eq(studentInflight1.lastName, "greatest"), "studentInflight1.lastName == \"greatest\"");
      $helpers.assert(studentInflight1.enrolled, "studentInflight1.enrolled");
      $helpers.assert($helpers.eq(studentInflight1.schoolId, "s3-inflight"), "studentInflight1.schoolId == \"s3-inflight\"");
      $helpers.assert($helpers.eq(studentInflight1.dob.month, 4), "studentInflight1.dob.month == 4");
      $helpers.assert($helpers.eq(studentInflight1.dob.day, 1), "studentInflight1.dob.day == 1");
      $helpers.assert($helpers.eq(studentInflight1.dob.year, 1999), "studentInflight1.dob.year == 1999");
      {
        const $if_let_value = studentInflight1.coursesTaken;
        if ($if_let_value != undefined) {
          const coursesTaken = $if_let_value;
          const course1 = $macros.__Array_at(false, coursesTaken, 0);
          const course2 = $macros.__Array_at(false, coursesTaken, 1);
          $helpers.assert($helpers.eq(course1.grade, "B"), "course1.grade == \"B\"");
          $helpers.assert($helpers.eq(course2.grade, "A"), "course2.grade == \"A\"");
        }
        else {
          $helpers.assert(false, "false");
        }
      }
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-2.cjs.map
```

## inflight.$Closure3-2.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $Student, $jStudent1 }) {
  class $Closure3 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const studentInflight1 = $macros.__Struct_fromJson(false, $Student, $jStudent1);
      $helpers.assert($helpers.eq(studentInflight1.firstName, "John"), "studentInflight1.firstName == \"John\"");
      $helpers.assert($helpers.eq(studentInflight1.lastName, "Smith"), "studentInflight1.lastName == \"Smith\"");
      $helpers.assert(studentInflight1.enrolled, "studentInflight1.enrolled");
      $helpers.assert($helpers.eq(studentInflight1.schoolId, "s1-xyz"), "studentInflight1.schoolId == \"s1-xyz\"");
      $helpers.assert($helpers.eq(studentInflight1.dob.month, 10), "studentInflight1.dob.month == 10");
      $helpers.assert($helpers.eq(studentInflight1.dob.day, 10), "studentInflight1.dob.day == 10");
      $helpers.assert($helpers.eq(studentInflight1.dob.year, 2005), "studentInflight1.dob.year == 2005");
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-2.cjs.map
```

## inflight.$Closure4-2.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $MyStruct, $expect_Util, $expectedSchema, $jMyStruct, $schema, $std_Json }) {
  class $Closure4 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const s = $macros.__Struct_schema(false, $MyStruct, );
      (await s.validate($jMyStruct));
      (await $expect_Util.equal((await $schema.asStr()), $macros.__Json_stringify(false, $std_Json, $expectedSchema)));
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-2.cjs.map
```

## inflight.$Closure5-2.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $Student, $std_Boolean, $std_Number, $std_String }) {
  class $Closure5 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $std_String.fromJson(10, { unsafe: true }));
      (await $std_Boolean.fromJson(10, { unsafe: true }));
      (await $std_Number.fromJson("cool", { unsafe: true }));
      $macros.__Struct_fromJson(false, $Student, ({"obviously": "not a student"}), { unsafe: true });
    }
  }
  return $Closure5;
}
//# sourceMappingURL=inflight.$Closure5-2.cjs.map
```

## inflight.UsesStructInImportedFile-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class UsesStructInImportedFile {
  }
  return UsesStructInImportedFile;
}
//# sourceMappingURL=inflight.UsesStructInImportedFile-1.cjs.map
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
const $types = require("./types.cjs");
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const cloud = $stdlib.cloud;
    const expect = $stdlib.expect;
    const externalStructs = $helpers.bringJs(`${__dirname}/preflight.structs-1.cjs`, $preflightTypesMap);
    const otherExternalStructs = $helpers.bringJs(`${__dirname}/preflight.structs2-2.cjs`, $preflightTypesMap);
    const Bar = $stdlib.std.Struct._createJsonSchema({$id:"/Bar",type:"object",properties:{b:{type:"number"},f:{type:"string"},},required:["b","f",],description:""});
    const Foo = $stdlib.std.Struct._createJsonSchema({$id:"/Foo",type:"object",properties:{f:{type:"string"},},required:["f",],description:""});
    const Foosible = $stdlib.std.Struct._createJsonSchema({$id:"/Foosible",type:"object",properties:{f:{type:"string"},},required:[],description:""});
    const MyStruct = $stdlib.std.Struct._createJsonSchema({$id:"/MyStruct",type:"object",properties:{color:{type:"string",enum:["red", "green", "blue"],description:"color docs\n@example Color.red"},m1:{type:"object",properties:{val:{type:"number",description:"val docs"},},required:["val",],description:"m1 docs"},m2:{type:"object",properties:{val:{type:"string"},},required:["val",],description:"m2 docs"},},required:["color","m1","m2",],description:"MyStruct docs\n@foo bar"});
    const Student = $stdlib.std.Struct._createJsonSchema({$id:"/Student",type:"object",properties:{additionalData:{type:["object","string","boolean","number","array"]},advisor:{type:"object",properties:{dob:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",],description:""},employeeID:{type:"string"},firstName:{type:"string"},lastName:{type:"string"},},required:["dob","employeeID","firstName","lastName",],description:""},coursesTaken:{type:"array",items:{type:"object",properties:{course:{type:"object",properties:{credits:{type:"number"},name:{type:"string"},},required:["credits","name",],description:""},dateTaken:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",],description:""},grade:{type:"string"},},required:["course","dateTaken","grade",],description:""}},dob:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",],description:""},enrolled:{type:"boolean"},enrolledCourses:{type:"array",uniqueItems:true,items:{type:"object",properties:{credits:{type:"number"},name:{type:"string"},},required:["credits","name",],description:""}},firstName:{type:"string"},lastName:{type:"string"},schoolId:{type:"string"},},required:["dob","enrolled","firstName","lastName","schoolId",],description:""});
    const cloud_ApiResponse = $stdlib.std.Struct._createJsonSchema({$id:"/ApiResponse",type:"object",properties:{body:{type:"string",description:"The response\'s body.\n@default - no body\n@stability experimental"},headers:{type:"object",patternProperties: {".*":{type:"string"}},description:"The response\'s headers.\n@default {}\n@stability experimental",},status:{type:"number",description:"The response\'s status code.\n@default 200\n@stability experimental"},},required:[],description:"Shape of a response from a inflight handler.\n@stability experimental"});
    const cloud_CounterProps = $stdlib.std.Struct._createJsonSchema({$id:"/CounterProps",type:"object",properties:{initial:{type:"number",description:"The initial value of the counter.\n@default 0\n@stability experimental"},},required:[],description:"Options for `Counter`.\n@stability experimental"});
    const externalStructs_MyOtherStruct = $stdlib.std.Struct._createJsonSchema({$id:"/MyOtherStruct",type:"object",properties:{data:{type:"object",properties:{val:{type:"number",description:"val docs"},},required:["val",],description:"MyStruct docs in subdir"},},required:["data",],description:""});
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    const Color =
      (function (tmp) {
        tmp["red"] = "red";
        tmp["green"] = "green";
        tmp["blue"] = "blue";
        return tmp;
      })({})
    ;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-2.cjs")({
            $cloud_CounterProps: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(cloud_CounterProps, "@winglang/sdk/cloud", "CounterProps"))},
            $j: ${$stdlib.core.liftObject(j)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [$stdlib.core.toLiftableModuleType(cloud_CounterProps, "@winglang/sdk/cloud", "CounterProps"), ["fromJson"]],
            [j, []],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(cloud_CounterProps, "@winglang/sdk/cloud", "CounterProps"), []],
            [j, []],
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-2.cjs")({
            $Student: ${$stdlib.core.liftObject(Student)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [Student, ["fromJson"]],
          ],
          "$inflight_init": [
            [Student, []],
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-2.cjs")({
            $Student: ${$stdlib.core.liftObject(Student)},
            $jStudent1: ${$stdlib.core.liftObject(jStudent1)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [Student, ["fromJson"]],
            [jStudent1, []],
          ],
          "$inflight_init": [
            [Student, []],
            [jStudent1, []],
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-2.cjs")({
            $MyStruct: ${$stdlib.core.liftObject(MyStruct)},
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.expect.Util") ?? expect.Util, "@winglang/sdk/expect", "Util"))},
            $expectedSchema: ${$stdlib.core.liftObject(expectedSchema)},
            $jMyStruct: ${$stdlib.core.liftObject(jMyStruct)},
            $schema: ${$stdlib.core.liftObject(schema)},
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.Json") ?? std.Json, "@winglang/sdk/std", "Json"))},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.expect.Util") ?? expect.Util, "@winglang/sdk/expect", "Util"), ["equal"]],
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.Json") ?? std.Json, "@winglang/sdk/std", "Json"), ["stringify"]],
            [MyStruct, ["schema"]],
            [expectedSchema, []],
            [jMyStruct, []],
            [schema, ["asStr"]],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.expect.Util") ?? expect.Util, "@winglang/sdk/expect", "Util"), []],
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.Json") ?? std.Json, "@winglang/sdk/std", "Json"), []],
            [MyStruct, []],
            [expectedSchema, []],
            [jMyStruct, []],
            [schema, []],
          ],
        });
      }
    }
    class $Closure5 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure5-2.cjs")({
            $Student: ${$stdlib.core.liftObject(Student)},
            $std_Boolean: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.Boolean") ?? std.Boolean, "@winglang/sdk/std", "Boolean"))},
            $std_Number: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.Number") ?? std.Number, "@winglang/sdk/std", "Number"))},
            $std_String: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.String") ?? std.String, "@winglang/sdk/std", "String"))},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.Boolean") ?? std.Boolean, "@winglang/sdk/std", "Boolean"), ["fromJson"]],
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.Number") ?? std.Number, "@winglang/sdk/std", "Number"), ["fromJson"]],
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.String") ?? std.String, "@winglang/sdk/std", "String"), ["fromJson"]],
            [Student, ["fromJson"]],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.Boolean") ?? std.Boolean, "@winglang/sdk/std", "Boolean"), []],
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.Number") ?? std.Number, "@winglang/sdk/std", "Number"), []],
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.String") ?? std.String, "@winglang/sdk/std", "String"), []],
            [Student, []],
          ],
        });
      }
    }
    const j = ({"initial": 3});
    const x = $macros.__Struct_fromJson(false, cloud_CounterProps, j);
    $helpers.assert($helpers.eq(x.initial, 3), "x.initial == 3");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight jsii struct conversion", new $Closure1(this, "$Closure1"));
    const jFoo = ({"f": "bar"});
    $helpers.assert($helpers.eq($macros.__Struct_fromJson(false, Foo, jFoo).f, "bar"), "Foo.fromJson(jFoo).f == \"bar\"");
    const jFoosible = ({});
    const jFoosible2 = ({"f": "bar"});
    {
      const $if_let_value = $macros.__Struct_fromJson(false, Foosible, jFoosible).f;
      if ($if_let_value != undefined) {
        const f = $if_let_value;
        $helpers.assert(false, "false");
      }
    }
    {
      const $if_let_value = $macros.__Struct_fromJson(false, Foosible, jFoosible2).f;
      if ($if_let_value != undefined) {
        const f = $if_let_value;
        $helpers.assert($helpers.eq(f, "bar"), "f == \"bar\"");
      }
      else {
        $helpers.assert(false, "false");
      }
    }
    const jBar = ({"f": "bar", "b": 10});
    const b = $macros.__Struct_fromJson(false, Bar, jBar);
    $helpers.assert($helpers.eq(b.f, "bar"), "b.f == \"bar\"");
    $helpers.assert($helpers.eq(b.b, 10), "b.b == 10");
    const jStudent1 = ({"firstName": "John", "lastName": "Smith", "enrolled": true, "schoolId": "s1-xyz", "dob": ({"month": 10, "day": 10, "year": 2005}), "enrolledCourses": []});
    const student1 = $macros.__Struct_fromJson(false, Student, jStudent1);
    $helpers.assert($helpers.eq(student1.firstName, "John"), "student1.firstName == \"John\"");
    $helpers.assert($helpers.eq(student1.lastName, "Smith"), "student1.lastName == \"Smith\"");
    $helpers.assert(student1.enrolled, "student1.enrolled");
    $helpers.assert($helpers.eq(student1.schoolId, "s1-xyz"), "student1.schoolId == \"s1-xyz\"");
    $helpers.assert($helpers.eq(student1.dob.month, 10), "student1.dob.month == 10");
    $helpers.assert($helpers.eq(student1.dob.day, 10), "student1.dob.day == 10");
    $helpers.assert($helpers.eq(student1.dob.year, 2005), "student1.dob.year == 2005");
    const jStudent2 = ({"advisor": ({"firstName": "Tom", "lastName": "Baker", "dob": ({"month": 1, "day": 1, "year": 1983}), "employeeID": "emp123"}), "firstName": "Sally", "lastName": "Reynolds", "enrolled": false, "schoolId": "s2-xyz", "dob": ({"month": 5, "day": 31, "year": 1987}), "enrolledCourses": [({"name": "COMP 101", "credits": 2}), ({"name": "COMP 121", "credits": 4})], "coursesTaken": [({"grade": "F", "dateTaken": ({"month": 5, "day": 10, "year": 2021}), "course": ({"name": "COMP 101", "credits": 2})}), ({"grade": "D", "dateTaken": ({"month": 5, "day": 10, "year": 2021}), "course": ({"name": "COMP 121", "credits": 4})})]});
    const student2 = $macros.__Struct_fromJson(false, Student, jStudent2);
    $helpers.assert($helpers.eq(student2.firstName, "Sally"), "student2.firstName == \"Sally\"");
    $helpers.assert($helpers.eq(student2.lastName, "Reynolds"), "student2.lastName == \"Reynolds\"");
    $helpers.assert((!student2.enrolled), "!student2.enrolled");
    $helpers.assert($helpers.eq(student2.schoolId, "s2-xyz"), "student2.schoolId == \"s2-xyz\"");
    $helpers.assert($helpers.eq(student2.dob.month, 5), "student2.dob.month == 5");
    $helpers.assert($helpers.eq(student2.dob.day, 31), "student2.dob.day == 31");
    $helpers.assert($helpers.eq(student2.dob.year, 1987), "student2.dob.year == 1987");
    {
      const $if_let_value = student2.enrolledCourses;
      if ($if_let_value != undefined) {
        const enrolledCourses = $if_let_value;
        const courses = $macros.__Set_toArray(false, enrolledCourses, );
        const s2Course1 = $macros.__Array_at(false, courses, 0);
        const s2Course2 = $macros.__Array_at(false, courses, 1);
        $helpers.assert($helpers.eq(s2Course1.name, "COMP 101"), "s2Course1.name == \"COMP 101\"");
        $helpers.assert($helpers.eq(s2Course1.credits, 2), "s2Course1.credits == 2");
        $helpers.assert($helpers.eq(s2Course2.name, "COMP 121"), "s2Course2.name == \"COMP 121\"");
        $helpers.assert($helpers.eq(s2Course2.credits, 4), "s2Course2.credits == 4");
      }
      else {
        $helpers.assert(false, "false");
      }
    }
    const jStudent3 = ({"enrolled": false, "schoolId": "w/e", "firstName": student2.firstName, "lastName": student2.lastName, "dob": ({"month": 1, "day": 1, "year": 1959}), "additionalData": ({"notes": "wow such notes", "legacy": false, "emergencyContactsNumbers": ["123-345-9928"]})});
    const student3 = $macros.__Struct_fromJson(false, Student, jStudent3);
    {
      const $if_let_value = student3.additionalData;
      if ($if_let_value != undefined) {
        const additionalData = $if_let_value;
        const notes = $macros.__Json_get(false, additionalData, "notes");
        $helpers.assert($helpers.eq(notes, "wow such notes"), "notes == \"wow such notes\"");
      }
      else {
        $helpers.assert(false, "false");
      }
    }
    const invalidStudent = ({"firstName": "I dont have", "lastName": "Any other info"});
    {
      const $if_let_value = $macros.__Struct_tryFromJson(false, Student, invalidStudent);
      if ($if_let_value != undefined) {
        const student = $if_let_value;
        $helpers.assert(false, "false");
      }
      else {
        $helpers.assert(true, "true");
      }
    }
    {
      const $if_let_value = $macros.__Struct_tryFromJson(false, Student, jStudent2);
      if ($if_let_value != undefined) {
        const student = $if_let_value;
        $helpers.assert($helpers.eq(student.firstName, "Sally"), "student.firstName == \"Sally\"");
        $helpers.assert($helpers.eq(student.lastName, "Reynolds"), "student.lastName == \"Reynolds\"");
        $helpers.assert((!student.enrolled), "!student.enrolled");
        $helpers.assert($helpers.eq(student.schoolId, "s2-xyz"), "student.schoolId == \"s2-xyz\"");
        $helpers.assert($helpers.eq(student.dob.month, 5), "student.dob.month == 5");
        $helpers.assert($helpers.eq(student.dob.day, 31), "student.dob.day == 31");
        $helpers.assert($helpers.eq(student.dob.year, 1987), "student.dob.year == 1987");
      }
      else {
        $helpers.assert(false, "false");
      }
    }
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:flight school student :)", new $Closure2(this, "$Closure2"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:lifting a student", new $Closure3(this, "$Closure3"));
    const jj1 = ({"data": ({"val": 10})});
    const externalBar = $macros.__Struct_fromJson(false, externalStructs_MyOtherStruct, jj1);
    $helpers.assert($helpers.eq(externalBar.data.val, 10), "externalBar.data.val == 10");
    const jMyStruct = ({"m1": ({"val": 10}), "m2": ({"val": "10"}), "color": "red"});
    const myStruct = $macros.__Struct_fromJson(false, MyStruct, jMyStruct);
    (expect.Util.equal(myStruct.m1.val, 10));
    (expect.Util.equal(myStruct.m2.val, "10"));
    (expect.Util.equal(myStruct.color, Color.red));
    const schema = $macros.__Struct_schema(false, MyStruct, );
    (schema.validate(jMyStruct));
    const expectedSchema = ({"$id": "/MyStruct", "type": "object", "properties": ({"color": ({"type": "string", "enum": ["red", "green", "blue"], "description": "color docs\n@example Color.red"}), "m1": ({"type": "object", "properties": ({"val": ({"type": "number", "description": "val docs"})}), "required": ["val"], "description": "m1 docs"}), "m2": ({"type": "object", "properties": ({"val": ({"type": "string"})}), "required": ["val"], "description": "m2 docs"})}), "required": ["color", "m1", "m2"], "description": "MyStruct docs\n@foo bar"});
    (expect.Util.equal((schema.asStr()), $macros.__Json_stringify(false, std.Json, expectedSchema)));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight schema usage", new $Closure4(this, "$Closure4"));
    (std.String.fromJson(10, { unsafe: true }));
    (std.Boolean.fromJson(10, { unsafe: true }));
    (std.Number.fromJson("cool", { unsafe: true }));
    $macros.__Struct_fromJson(false, Student, ({"obviously": "not a student"}), { unsafe: true });
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:unsafe flight", new $Closure5(this, "$Closure5"));
    globalThis.$ClassFactory.new("examples-valid.subdir.UsesStructInImportedFile", otherExternalStructs.UsesStructInImportedFile, this, "UsesStructInImportedFile");
    const resp = $macros.__Struct_fromJson(false, cloud_ApiResponse, ({"status": 200, "body": "ok"}));
    (expect.Util.equal(resp.status, 200));
    (expect.Util.equal(resp.body, "ok"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "struct_from_json.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

## preflight.structs-1.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $types = require("./types.cjs");
let $preflightTypesMap = {};
module.exports = { $preflightTypesMap,  };
//# sourceMappingURL=preflight.structs-1.cjs.map
```

## preflight.structs2-2.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $types = require("./types.cjs");
let $preflightTypesMap = {};
const SomeStruct = $stdlib.std.Struct._createJsonSchema({$id:"/SomeStruct",type:"object",properties:{foo:{type:"string"},},required:["foo",],description:""});
class UsesStructInImportedFile extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
    this.someStruct = $macros.__Struct_fromJson(false, SomeStruct, ({"foo": "123"}));
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.UsesStructInImportedFile-1.cjs")({
      })
    `;
  }
  get _liftMap() {
    return ({
      "$inflight_init": [
      ],
    });
  }
}
module.exports = { $preflightTypesMap, UsesStructInImportedFile };
//# sourceMappingURL=preflight.structs2-2.cjs.map
```

