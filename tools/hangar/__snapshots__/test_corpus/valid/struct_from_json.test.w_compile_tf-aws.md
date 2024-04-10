# [struct_from_json.test.w](../../../../../examples/tests/valid/struct_from_json.test.w) | compile | tf-aws

## inflight.$Closure1-2.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $cloud_BucketProps, $j }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const x = $cloud_BucketProps._fromJson($j);
      $helpers.assert($helpers.eq(x.public, false), "x.public == false");
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
module.exports = function({ $Student }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const jStudent3 = ({"firstName": "struct", "lastName": "greatest", "enrolled": true, "schoolId": "s3-inflight", "dob": ({"month": 4, "day": 1, "year": 1999}), "coursesTaken": [({"grade": "B", "dateTaken": ({"month": 5, "day": 10, "year": 2021}), "course": ({"name": "COMP 101", "credits": 2})}), ({"grade": "A", "dateTaken": ({"month": 5, "day": 10, "year": 2021}), "course": ({"name": "COMP 121", "credits": 4})})]});
      const studentInflight1 = $Student._fromJson(jStudent3);
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
          const course1 = ((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(coursesTaken, 0);
          const course2 = ((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(coursesTaken, 1);
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
module.exports = function({ $Student, $jStudent1 }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const studentInflight1 = $Student._fromJson($jStudent1);
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
module.exports = function({ $MyStruct, $_schema_asStr___, $expectedSchema, $jMyStruct, $std_Json }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const s = $MyStruct;
      (await s.validate($jMyStruct));
      $helpers.assert($helpers.eq($_schema_asStr___, ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })($expectedSchema)), "schema.asStr() == Json.stringify(expectedSchema)");
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
      $Student._fromJson(({"obviously": "not a student"}), { unsafe: true });
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
module.exports = function({  }) {
  class UsesStructInImportedFile {
    constructor({  }) {
    }
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
      "stackName": "root",
      "version": "0.20.3"
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
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
const externalStructs = require("./preflight.structs-1.cjs");
const otherExternalStructs = require("./preflight.structs2-2.cjs");
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const Bar = $stdlib.std.Struct._createJsonSchema({$id:"/Bar",type:"object",properties:{b:{type:"number"},f:{type:"string"},},required:["b","f",]});
    const Foo = $stdlib.std.Struct._createJsonSchema({$id:"/Foo",type:"object",properties:{f:{type:"string"},},required:["f",]});
    const Foosible = $stdlib.std.Struct._createJsonSchema({$id:"/Foosible",type:"object",properties:{f:{type:"string"},},required:[]});
    const MyStruct = $stdlib.std.Struct._createJsonSchema({$id:"/MyStruct",type:"object",properties:{m1:{type:"object",properties:{val:{type:"number"},},required:["val",]},m2:{type:"object",properties:{val:{type:"string"},},required:["val",]},},required:["m1","m2",]});
    const SomeStruct = $stdlib.std.Struct._createJsonSchema({$id:"/SomeStruct",type:"object",properties:{foo:{type:"string"},},required:["foo",]});
    const Student = $stdlib.std.Struct._createJsonSchema({$id:"/Student",type:"object",properties:{additionalData:{type:["object","string","boolean","number","array"]},advisor:{type:"object",properties:{dob:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},employeeID:{type:"string"},firstName:{type:"string"},lastName:{type:"string"},},required:["dob","employeeID","firstName","lastName",]},coursesTaken:{type:"array",items:{type:"object",properties:{course:{type:"object",properties:{credits:{type:"number"},name:{type:"string"},},required:["credits","name",]},dateTaken:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},grade:{type:"string"},},required:["course","dateTaken","grade",]}},dob:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},enrolled:{type:"boolean"},enrolledCourses:{type:"array",uniqueItems:true,items:{type:"object",properties:{credits:{type:"number"},name:{type:"string"},},required:["credits","name",]}},firstName:{type:"string"},lastName:{type:"string"},schoolId:{type:"string"},},required:["dob","enrolled","firstName","lastName","schoolId",]});
    const cloud_BucketProps = $stdlib.std.Struct._createJsonSchema({$id:"/BucketProps",type:"object",properties:{public:{type:"boolean"},},required:[]});
    const externalStructs_MyOtherStruct = $stdlib.std.Struct._createJsonSchema({$id:"/MyOtherStruct",type:"object",properties:{data:{type:"object",properties:{val:{type:"number"},},required:["val",]},},required:["data",]});
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-2.cjs")({
            $cloud_BucketProps: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(cloud_BucketProps, "@winglang/sdk/cloud", "BucketProps"))},
            $j: ${$stdlib.core.liftObject(j)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType()};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [j, []],
          ],
          "$inflight_init": [
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
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType()};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
          ],
          "$inflight_init": [
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
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType()};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [jStudent1, []],
          ],
          "$inflight_init": [
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
            $_schema_asStr___: ${$stdlib.core.liftObject((schema.asStr()))},
            $expectedSchema: ${$stdlib.core.liftObject(expectedSchema)},
            $jMyStruct: ${$stdlib.core.liftObject(jMyStruct)},
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType()};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [(schema.asStr()), []],
            [expectedSchema, []],
            [jMyStruct, []],
          ],
          "$inflight_init": [
            [(schema.asStr()), []],
            [expectedSchema, []],
            [jMyStruct, []],
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
            $std_Boolean: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Boolean, "@winglang/sdk/std", "Boolean"))},
            $std_Number: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Number, "@winglang/sdk/std", "Number"))},
            $std_String: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.String, "@winglang/sdk/std", "String"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure5Client = ${$Closure5._toInflightType()};
            const client = new $Closure5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    const j = ({"public": false});
    const x = cloud_BucketProps._fromJson(j);
    $helpers.assert($helpers.eq(x.public, false), "x.public == false");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight jsii struct conversion", new $Closure1(this, "$Closure1"));
    const jFoo = ({"f": "bar"});
    $helpers.assert($helpers.eq(Foo._fromJson(jFoo).f, "bar"), "Foo.fromJson(jFoo).f == \"bar\"");
    const jFoosible = ({});
    const jFoosible2 = ({"f": "bar"});
    {
      const $if_let_value = Foosible._fromJson(jFoosible).f;
      if ($if_let_value != undefined) {
        const f = $if_let_value;
        $helpers.assert(false, "false");
      }
    }
    {
      const $if_let_value = Foosible._fromJson(jFoosible2).f;
      if ($if_let_value != undefined) {
        const f = $if_let_value;
        $helpers.assert($helpers.eq(f, "bar"), "f == \"bar\"");
      }
      else {
        $helpers.assert(false, "false");
      }
    }
    const jBar = ({"f": "bar", "b": 10});
    const b = Bar._fromJson(jBar);
    $helpers.assert($helpers.eq(b.f, "bar"), "b.f == \"bar\"");
    $helpers.assert($helpers.eq(b.b, 10), "b.b == 10");
    const jStudent1 = ({"firstName": "John", "lastName": "Smith", "enrolled": true, "schoolId": "s1-xyz", "dob": ({"month": 10, "day": 10, "year": 2005}), "enrolledCourses": []});
    const student1 = Student._fromJson(jStudent1);
    $helpers.assert($helpers.eq(student1.firstName, "John"), "student1.firstName == \"John\"");
    $helpers.assert($helpers.eq(student1.lastName, "Smith"), "student1.lastName == \"Smith\"");
    $helpers.assert(student1.enrolled, "student1.enrolled");
    $helpers.assert($helpers.eq(student1.schoolId, "s1-xyz"), "student1.schoolId == \"s1-xyz\"");
    $helpers.assert($helpers.eq(student1.dob.month, 10), "student1.dob.month == 10");
    $helpers.assert($helpers.eq(student1.dob.day, 10), "student1.dob.day == 10");
    $helpers.assert($helpers.eq(student1.dob.year, 2005), "student1.dob.year == 2005");
    const jStudent2 = ({"advisor": ({"firstName": "Tom", "lastName": "Baker", "dob": ({"month": 1, "day": 1, "year": 1983}), "employeeID": "emp123"}), "firstName": "Sally", "lastName": "Reynolds", "enrolled": false, "schoolId": "s2-xyz", "dob": ({"month": 5, "day": 31, "year": 1987}), "enrolledCourses": [({"name": "COMP 101", "credits": 2}), ({"name": "COMP 121", "credits": 4})], "coursesTaken": [({"grade": "F", "dateTaken": ({"month": 5, "day": 10, "year": 2021}), "course": ({"name": "COMP 101", "credits": 2})}), ({"grade": "D", "dateTaken": ({"month": 5, "day": 10, "year": 2021}), "course": ({"name": "COMP 121", "credits": 4})})]});
    const student2 = Student._fromJson(jStudent2);
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
        const courses = [...(enrolledCourses)];
        const s2Course1 = ((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(courses, 0);
        const s2Course2 = ((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(courses, 1);
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
    const student3 = Student._fromJson(jStudent3);
    {
      const $if_let_value = student3.additionalData;
      if ($if_let_value != undefined) {
        const additionalData = $if_let_value;
        const notes = ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(additionalData, "notes");
        $helpers.assert($helpers.eq(notes, "wow such notes"), "notes == \"wow such notes\"");
      }
      else {
        $helpers.assert(false, "false");
      }
    }
    const invalidStudent = ({"firstName": "I dont have", "lastName": "Any other info"});
    {
      const $if_let_value = Student._tryFromJson(invalidStudent);
      if ($if_let_value != undefined) {
        const student = $if_let_value;
        $helpers.assert(false, "false");
      }
      else {
        $helpers.assert(true, "true");
      }
    }
    {
      const $if_let_value = Student._tryFromJson(jStudent2);
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
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:flight school student :)", new $Closure2(this, "$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:lifting a student", new $Closure3(this, "$Closure3"));
    const jj1 = ({"data": ({"val": 10})});
    const externalBar = externalStructs_MyOtherStruct._fromJson(jj1);
    $helpers.assert($helpers.eq(externalBar.data.val, 10), "externalBar.data.val == 10");
    const jMyStruct = ({"m1": ({"val": 10}), "m2": ({"val": "10"})});
    const myStruct = MyStruct._fromJson(jMyStruct);
    $helpers.assert($helpers.eq(myStruct.m1.val, 10), "myStruct.m1.val == 10");
    $helpers.assert($helpers.eq(myStruct.m2.val, "10"), "myStruct.m2.val == \"10\"");
    const schema = MyStruct;
    (schema.validate(jMyStruct));
    const expectedSchema = ({"$id": "/MyStruct", "type": "object", "properties": ({"m1": ({"type": "object", "properties": ({"val": ({"type": "number"})}), "required": ["val"]}), "m2": ({"type": "object", "properties": ({"val": ({"type": "string"})}), "required": ["val"]})}), "required": ["m1", "m2"]});
    $helpers.assert($helpers.eq((schema.asStr()), ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(expectedSchema)), "schema.asStr() == Json.stringify(expectedSchema)");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight schema usage", new $Closure4(this, "$Closure4"));
    (std.String.fromJson(10, { unsafe: true }));
    (std.Boolean.fromJson(10, { unsafe: true }));
    (std.Number.fromJson("cool", { unsafe: true }));
    Student._fromJson(({"obviously": "not a student"}), { unsafe: true });
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:unsafe flight", new $Closure5(this, "$Closure5"));
    new otherExternalStructs.UsesStructInImportedFile(this, "UsesStructInImportedFile");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "struct_from_json.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

## preflight.structs-1.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const Bar = $stdlib.std.Struct._createJsonSchema({$id:"/Bar",type:"object",properties:{b:{type:"number"},f:{type:"string"},},required:["b","f",]});
const Foo = $stdlib.std.Struct._createJsonSchema({$id:"/Foo",type:"object",properties:{f:{type:"string"},},required:["f",]});
const Foosible = $stdlib.std.Struct._createJsonSchema({$id:"/Foosible",type:"object",properties:{f:{type:"string"},},required:[]});
const MyStruct = $stdlib.std.Struct._createJsonSchema({$id:"/MyStruct",type:"object",properties:{m1:{type:"object",properties:{val:{type:"number"},},required:["val",]},m2:{type:"object",properties:{val:{type:"string"},},required:["val",]},},required:["m1","m2",]});
const SomeStruct = $stdlib.std.Struct._createJsonSchema({$id:"/SomeStruct",type:"object",properties:{foo:{type:"string"},},required:["foo",]});
const Student = $stdlib.std.Struct._createJsonSchema({$id:"/Student",type:"object",properties:{additionalData:{type:["object","string","boolean","number","array"]},advisor:{type:"object",properties:{dob:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},employeeID:{type:"string"},firstName:{type:"string"},lastName:{type:"string"},},required:["dob","employeeID","firstName","lastName",]},coursesTaken:{type:"array",items:{type:"object",properties:{course:{type:"object",properties:{credits:{type:"number"},name:{type:"string"},},required:["credits","name",]},dateTaken:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},grade:{type:"string"},},required:["course","dateTaken","grade",]}},dob:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},enrolled:{type:"boolean"},enrolledCourses:{type:"array",uniqueItems:true,items:{type:"object",properties:{credits:{type:"number"},name:{type:"string"},},required:["credits","name",]}},firstName:{type:"string"},lastName:{type:"string"},schoolId:{type:"string"},},required:["dob","enrolled","firstName","lastName","schoolId",]});
const cloud_BucketProps = $stdlib.std.Struct._createJsonSchema({$id:"/BucketProps",type:"object",properties:{public:{type:"boolean"},},required:[]});
const externalStructs_MyOtherStruct = $stdlib.std.Struct._createJsonSchema({$id:"/MyOtherStruct",type:"object",properties:{data:{type:"object",properties:{val:{type:"number"},},required:["val",]},},required:["data",]});
module.exports = {  };
//# sourceMappingURL=preflight.structs-1.cjs.map
```

## preflight.structs2-2.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const Bar = $stdlib.std.Struct._createJsonSchema({$id:"/Bar",type:"object",properties:{b:{type:"number"},f:{type:"string"},},required:["b","f",]});
const Foo = $stdlib.std.Struct._createJsonSchema({$id:"/Foo",type:"object",properties:{f:{type:"string"},},required:["f",]});
const Foosible = $stdlib.std.Struct._createJsonSchema({$id:"/Foosible",type:"object",properties:{f:{type:"string"},},required:[]});
const MyStruct = $stdlib.std.Struct._createJsonSchema({$id:"/MyStruct",type:"object",properties:{m1:{type:"object",properties:{val:{type:"number"},},required:["val",]},m2:{type:"object",properties:{val:{type:"string"},},required:["val",]},},required:["m1","m2",]});
const SomeStruct = $stdlib.std.Struct._createJsonSchema({$id:"/SomeStruct",type:"object",properties:{foo:{type:"string"},},required:["foo",]});
const Student = $stdlib.std.Struct._createJsonSchema({$id:"/Student",type:"object",properties:{additionalData:{type:["object","string","boolean","number","array"]},advisor:{type:"object",properties:{dob:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},employeeID:{type:"string"},firstName:{type:"string"},lastName:{type:"string"},},required:["dob","employeeID","firstName","lastName",]},coursesTaken:{type:"array",items:{type:"object",properties:{course:{type:"object",properties:{credits:{type:"number"},name:{type:"string"},},required:["credits","name",]},dateTaken:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},grade:{type:"string"},},required:["course","dateTaken","grade",]}},dob:{type:"object",properties:{day:{type:"number"},month:{type:"number"},year:{type:"number"},},required:["day","month","year",]},enrolled:{type:"boolean"},enrolledCourses:{type:"array",uniqueItems:true,items:{type:"object",properties:{credits:{type:"number"},name:{type:"string"},},required:["credits","name",]}},firstName:{type:"string"},lastName:{type:"string"},schoolId:{type:"string"},},required:["dob","enrolled","firstName","lastName","schoolId",]});
const cloud_BucketProps = $stdlib.std.Struct._createJsonSchema({$id:"/BucketProps",type:"object",properties:{public:{type:"boolean"},},required:[]});
const externalStructs_MyOtherStruct = $stdlib.std.Struct._createJsonSchema({$id:"/MyOtherStruct",type:"object",properties:{data:{type:"object",properties:{val:{type:"number"},},required:["val",]},},required:["data",]});
class UsesStructInImportedFile extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
    this.someStruct = SomeStruct._fromJson(({"foo": "123"}));
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.UsesStructInImportedFile-1.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const UsesStructInImportedFileClient = ${UsesStructInImportedFile._toInflightType()};
        const client = new UsesStructInImportedFileClient({
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return ({
      "$inflight_init": [
      ],
    });
  }
}
module.exports = { UsesStructInImportedFile };
//# sourceMappingURL=preflight.structs2-2.cjs.map
```

