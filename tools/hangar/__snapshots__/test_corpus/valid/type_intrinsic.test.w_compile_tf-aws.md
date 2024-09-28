# [type_intrinsic.test.w](../../../../../tests/valid/type_intrinsic.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $_types_t15_class_MyClass, $_types_t1_interface_MyInterface, $_types_t29_enum_MyEnum, $_types_t30_struct_MyStruct, $expect_Util, $std_reflect_Phase, $std_reflect_Type__ofArray_std_reflect_Type__ofNum____false_, $std_reflect_Type__ofBool__, $std_reflect_Type__ofBytes__, $std_reflect_Type__ofDatetime__, $std_reflect_Type__ofDuration__, $std_reflect_Type__ofFunction_new_std_reflect_FunctionType_std_reflect_Phase_INFLIGHT___std_reflect_Type__ofNum_______std_reflect_Type__ofBool____, $std_reflect_Type__ofJson__, $std_reflect_Type__ofMap_std_reflect_Type__ofBool____true_, $std_reflect_Type__ofMutJson__, $std_reflect_Type__ofNum__, $std_reflect_Type__ofOptional_std_reflect_Type__ofStr___, $std_reflect_Type__ofStr__, $std_reflect_Type__ofVoid__ }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const t1 = $std_reflect_Type__ofNum__;
      (await $expect_Util.equal(t1.kind, "num"));
      (await $expect_Util.equal((await t1.toString()), "num"));
      const t2 = $std_reflect_Type__ofStr__;
      (await $expect_Util.equal(t2.kind, "str"));
      (await $expect_Util.equal((await t2.toString()), "str"));
      const t3 = $std_reflect_Type__ofBool__;
      (await $expect_Util.equal(t3.kind, "bool"));
      (await $expect_Util.equal((await t3.toString()), "bool"));
      const t4 = $std_reflect_Type__ofFunction_new_std_reflect_FunctionType_std_reflect_Phase_INFLIGHT___std_reflect_Type__ofNum_______std_reflect_Type__ofBool____;
      (await $expect_Util.equal(t4.kind, "function"));
      (await $expect_Util.equal((await t4.toString()), "inflight (num): bool"));
      {
        const $if_let_value = (await t4.asFunction());
        if ($if_let_value != undefined) {
          const fn = $if_let_value;
          (await $expect_Util.equal(fn.params.length, 1));
          (await $expect_Util.equal($helpers.lookup(fn.params, 0).kind, "num"));
          (await $expect_Util.equal(fn.returns.kind, "bool"));
          (await $expect_Util.equal(fn.phase, $std_reflect_Phase.INFLIGHT));
          (await $expect_Util.equal((await fn.toString()), "inflight (num): bool"));
        }
        else {
          (await $expect_Util.fail("t4 is not a function"));
        }
      }
      const t6 = $std_reflect_Type__ofVoid__;
      (await $expect_Util.equal(t6.kind, "void"));
      (await $expect_Util.equal((await t6.toString()), "void"));
      const t7 = $std_reflect_Type__ofOptional_std_reflect_Type__ofStr___;
      (await $expect_Util.equal(t7.kind, "optional"));
      (await $expect_Util.equal((await t7.toString()), "str?"));
      {
        const $if_let_value = (await t7.asOptional());
        if ($if_let_value != undefined) {
          const opt = $if_let_value;
          (await $expect_Util.equal(opt.child.kind, "str"));
          (await $expect_Util.equal((await opt.toString()), "str?"));
        }
        else {
          (await $expect_Util.fail("t7 is not an optional"));
        }
      }
      const t8 = $std_reflect_Type__ofArray_std_reflect_Type__ofNum____false_;
      (await $expect_Util.equal(t8.kind, "array"));
      (await $expect_Util.equal((await t8.toString()), "Array<num>"));
      {
        const $if_let_value = (await t8.asArray());
        if ($if_let_value != undefined) {
          const arr = $if_let_value;
          (await $expect_Util.equal(arr.child.kind, "num"));
          (await $expect_Util.equal((await arr.toString()), "Array<num>"));
          (await $expect_Util.equal(arr.isMut, false));
        }
        else {
          (await $expect_Util.fail("t8 is not an array"));
        }
      }
      const t9 = $std_reflect_Type__ofMap_std_reflect_Type__ofBool____true_;
      (await $expect_Util.equal(t9.kind, "mutmap"));
      (await $expect_Util.equal((await t9.toString()), "MutMap<bool>"));
      {
        const $if_let_value = (await t9.asMap());
        if ($if_let_value != undefined) {
          const map = $if_let_value;
          (await $expect_Util.equal(map.child.kind, "bool"));
          (await $expect_Util.equal((await map.toString()), "MutMap<bool>"));
          (await $expect_Util.equal(map.isMut, true));
        }
        else {
          (await $expect_Util.fail("t9 is not a map"));
        }
      }
      const t10 = $std_reflect_Type__ofJson__;
      (await $expect_Util.equal(t10.kind, "json"));
      (await $expect_Util.equal((await t10.toString()), "Json"));
      const t11 = $std_reflect_Type__ofMutJson__;
      (await $expect_Util.equal(t11.kind, "mutjson"));
      (await $expect_Util.equal((await t11.toString()), "MutJson"));
      const t12 = $std_reflect_Type__ofDuration__;
      (await $expect_Util.equal(t12.kind, "duration"));
      (await $expect_Util.equal((await t12.toString()), "duration"));
      const t13 = $std_reflect_Type__ofBytes__;
      (await $expect_Util.equal(t13.kind, "bytes"));
      (await $expect_Util.equal((await t13.toString()), "bytes"));
      const t14 = $std_reflect_Type__ofDatetime__;
      (await $expect_Util.equal(t14.kind, "datetime"));
      (await $expect_Util.equal((await t14.toString()), "datetime"));
      const t15 = $std_reflect_Type__ofBytes__;
      (await $expect_Util.equal(t15.kind, "bytes"));
      (await $expect_Util.equal((await t15.toString()), "bytes"));
      const t16 = $_types_t1_interface_MyInterface;
      (await $expect_Util.equal(t16.kind, "interface"));
      (await $expect_Util.equal((await t16.toString()), "MyInterface"));
      {
        const $if_let_value = (await t16.asInterface());
        if ($if_let_value != undefined) {
          const iface = $if_let_value;
          (await $expect_Util.equal(iface.name, "MyInterface"));
          (await $expect_Util.equal((await iface.toString()), "MyInterface"));
          (await $expect_Util.equal(iface.bases.length, 1));
          (await $expect_Util.equal($helpers.lookup(iface.bases, 0).name, "BaseInterface"));
          (await $expect_Util.equal($macros.__Map_size(false, iface.methods, ), 1));
          (await $expect_Util.equal($helpers.lookup(iface.methods, "method1").name, "method1"));
          (await $expect_Util.equal((await $helpers.lookup(iface.methods, "method1").child.toString()), "preflight (): void"));
        }
        else {
          (await $expect_Util.fail("t16 is not an interface"));
        }
      }
      const t17 = $_types_t15_class_MyClass;
      (await $expect_Util.equal(t17.kind, "class"));
      (await $expect_Util.equal((await t17.toString()), "MyClass"));
      {
        const $if_let_value = (await t17.asClass());
        if ($if_let_value != undefined) {
          const cls = $if_let_value;
          (await $expect_Util.equal(cls.name, "MyClass"));
          (await $expect_Util.equal((await cls.toString()), "MyClass"));
          {
            const $if_let_value = cls.base;
            if ($if_let_value != undefined) {
              const base = $if_let_value;
              (await $expect_Util.equal(base.name, "Resource"));
            }
            else {
              (await $expect_Util.fail("t17 does not have a base class"));
            }
          }
          (await $expect_Util.equal($macros.__Map_size(false, cls.properties, ), 1));
          (await $expect_Util.equal($helpers.lookup(cls.properties, "field1").name, "field1"));
          (await $expect_Util.equal($helpers.lookup(cls.properties, "field1").child.kind, "str"));
          (await $expect_Util.ok(($macros.__Map_size(false, cls.methods, ) >= 2)));
          (await $expect_Util.equal($helpers.lookup(cls.methods, "method1").name, "method1"));
          (await $expect_Util.equal($helpers.lookup(cls.methods, "method1").isStatic, false));
          (await $expect_Util.equal((await $helpers.lookup(cls.methods, "method1").child.toString()), "preflight (): void"));
          (await $expect_Util.equal($helpers.lookup(cls.methods, "method2").name, "method2"));
          (await $expect_Util.equal($helpers.lookup(cls.methods, "method2").isStatic, true));
          (await $expect_Util.equal((await $helpers.lookup(cls.methods, "method2").child.toString()), "preflight (): void"));
        }
        else {
          (await $expect_Util.fail("t17 is not a class"));
        }
      }
      const t18 = $_types_t29_enum_MyEnum;
      (await $expect_Util.equal(t18.kind, "enum"));
      (await $expect_Util.equal((await t18.toString()), "MyEnum"));
      {
        const $if_let_value = (await t18.asEnum());
        if ($if_let_value != undefined) {
          const enm = $if_let_value;
          (await $expect_Util.equal(enm.name, "MyEnum"));
          (await $expect_Util.equal((await enm.toString()), "MyEnum"));
          (await $expect_Util.equal($macros.__Map_size(false, enm.variants, ), 2));
          (await $expect_Util.equal($helpers.lookup(enm.variants, "VARIANT1").name, "VARIANT1"));
          (await $expect_Util.equal($helpers.lookup(enm.variants, "VARIANT2").name, "VARIANT2"));
        }
        else {
          (await $expect_Util.fail("t18 is not an enum"));
        }
      }
      const t19 = $_types_t30_struct_MyStruct;
      (await $expect_Util.equal(t19.kind, "struct"));
      (await $expect_Util.equal((await t19.toString()), "MyStruct"));
      {
        const $if_let_value = (await t19.asStruct());
        if ($if_let_value != undefined) {
          const st = $if_let_value;
          (await $expect_Util.equal(st.name, "MyStruct"));
          (await $expect_Util.equal((await st.toString()), "MyStruct"));
          (await $expect_Util.equal(st.bases.length, 2));
          (await $expect_Util.equal($helpers.lookup(st.bases, 0).name, "Base1"));
          (await $expect_Util.equal($helpers.lookup(st.bases, 1).name, "Base2"));
          (await $expect_Util.equal($macros.__Map_size(false, st.fields, ), 4));
          (await $expect_Util.equal($helpers.lookup(st.fields, "base1").name, "base1"));
          (await $expect_Util.equal($helpers.lookup(st.fields, "base1").child.kind, "bool"));
          (await $expect_Util.equal($helpers.lookup(st.fields, "base2").name, "base2"));
          (await $expect_Util.equal($helpers.lookup(st.fields, "base2").child.kind, "bool"));
          (await $expect_Util.equal($helpers.lookup(st.fields, "field1").name, "field1"));
          (await $expect_Util.equal($helpers.lookup(st.fields, "field1").child.kind, "num"));
          (await $expect_Util.equal($helpers.lookup(st.fields, "field2").name, "field2"));
          (await $expect_Util.equal($helpers.lookup(st.fields, "field2").child.kind, "array"));
          const arr = $helpers.unwrap((await $helpers.lookup(st.fields, "field2").child.asArray()));
          (await $expect_Util.equal(arr.child.kind, "optional"));
          const opt = $helpers.unwrap((await arr.child.asOptional()));
          (await $expect_Util.equal(opt.child.kind, "json"));
        }
        else {
          (await $expect_Util.fail("t19 is not a struct"));
        }
      }
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.MyClass-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class MyClass {
  }
  return MyClass;
}
//# sourceMappingURL=inflight.MyClass-1.cjs.map
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
    const expect = $stdlib.expect;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    const MyEnum =
      (function (tmp) {
        tmp["VARIANT1"] = "VARIANT1";
        tmp["VARIANT2"] = "VARIANT2";
        return tmp;
      })({})
    ;
    class MyClass extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.field1 = "hello";
      }
      method1() {
      }
      static method2($scope) {
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.MyClass-1.cjs")({
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
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $_types_t15_class_MyClass: ${$stdlib.core.liftObject($types.t15_class_MyClass)},
            $_types_t1_interface_MyInterface: ${$stdlib.core.liftObject($types.t1_interface_MyInterface)},
            $_types_t29_enum_MyEnum: ${$stdlib.core.liftObject($types.t29_enum_MyEnum)},
            $_types_t30_struct_MyStruct: ${$stdlib.core.liftObject($types.t30_struct_MyStruct)},
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.expect.Util") ?? expect.Util, "@winglang/sdk/expect", "Util"))},
            $std_reflect_Phase: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.reflect.Phase, "@winglang/sdk/std", "reflect.Phase"))},
            $std_reflect_Type__ofArray_std_reflect_Type__ofNum____false_: ${$stdlib.core.liftObject(std.reflect.Type._ofArray(std.reflect.Type._ofNum(), false))},
            $std_reflect_Type__ofBool__: ${$stdlib.core.liftObject(std.reflect.Type._ofBool())},
            $std_reflect_Type__ofBytes__: ${$stdlib.core.liftObject(std.reflect.Type._ofBytes())},
            $std_reflect_Type__ofDatetime__: ${$stdlib.core.liftObject(std.reflect.Type._ofDatetime())},
            $std_reflect_Type__ofDuration__: ${$stdlib.core.liftObject(std.reflect.Type._ofDuration())},
            $std_reflect_Type__ofFunction_new_std_reflect_FunctionType_std_reflect_Phase_INFLIGHT___std_reflect_Type__ofNum_______std_reflect_Type__ofBool____: ${$stdlib.core.liftObject(std.reflect.Type._ofFunction(new std.reflect.FunctionType(std.reflect.Phase.INFLIGHT, [std.reflect.Type._ofNum(), ], std.reflect.Type._ofBool())))},
            $std_reflect_Type__ofJson__: ${$stdlib.core.liftObject(std.reflect.Type._ofJson())},
            $std_reflect_Type__ofMap_std_reflect_Type__ofBool____true_: ${$stdlib.core.liftObject(std.reflect.Type._ofMap(std.reflect.Type._ofBool(), true))},
            $std_reflect_Type__ofMutJson__: ${$stdlib.core.liftObject(std.reflect.Type._ofMutJson())},
            $std_reflect_Type__ofNum__: ${$stdlib.core.liftObject(std.reflect.Type._ofNum())},
            $std_reflect_Type__ofOptional_std_reflect_Type__ofStr___: ${$stdlib.core.liftObject(std.reflect.Type._ofOptional(std.reflect.Type._ofStr()))},
            $std_reflect_Type__ofStr__: ${$stdlib.core.liftObject(std.reflect.Type._ofStr())},
            $std_reflect_Type__ofVoid__: ${$stdlib.core.liftObject(std.reflect.Type._ofVoid())},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.expect.Util") ?? expect.Util, "@winglang/sdk/expect", "Util"), [].concat(["equal"], ["fail"], ["ok"])],
            [$stdlib.core.toLiftableModuleType(std.reflect.Phase, "@winglang/sdk/std", "reflect.Phase"), ["INFLIGHT"]],
            [$types.t15_class_MyClass, []],
            [$types.t1_interface_MyInterface, []],
            [$types.t29_enum_MyEnum, []],
            [$types.t30_struct_MyStruct, []],
            [std.reflect.Type._ofArray(std.reflect.Type._ofNum(), false), []],
            [std.reflect.Type._ofBool(), []],
            [std.reflect.Type._ofBytes(), []],
            [std.reflect.Type._ofDatetime(), []],
            [std.reflect.Type._ofDuration(), []],
            [std.reflect.Type._ofFunction(new std.reflect.FunctionType(std.reflect.Phase.INFLIGHT, [std.reflect.Type._ofNum(), ], std.reflect.Type._ofBool())), []],
            [std.reflect.Type._ofJson(), []],
            [std.reflect.Type._ofMap(std.reflect.Type._ofBool(), true), []],
            [std.reflect.Type._ofMutJson(), []],
            [std.reflect.Type._ofNum(), []],
            [std.reflect.Type._ofOptional(std.reflect.Type._ofStr()), []],
            [std.reflect.Type._ofStr(), []],
            [std.reflect.Type._ofVoid(), []],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.expect.Util") ?? expect.Util, "@winglang/sdk/expect", "Util"), []],
            [$stdlib.core.toLiftableModuleType(std.reflect.Phase, "@winglang/sdk/std", "reflect.Phase"), []],
            [$types.t15_class_MyClass, []],
            [$types.t1_interface_MyInterface, []],
            [$types.t29_enum_MyEnum, []],
            [$types.t30_struct_MyStruct, []],
            [std.reflect.Type._ofArray(std.reflect.Type._ofNum(), false), []],
            [std.reflect.Type._ofBool(), []],
            [std.reflect.Type._ofBytes(), []],
            [std.reflect.Type._ofDatetime(), []],
            [std.reflect.Type._ofDuration(), []],
            [std.reflect.Type._ofFunction(new std.reflect.FunctionType(std.reflect.Phase.INFLIGHT, [std.reflect.Type._ofNum(), ], std.reflect.Type._ofBool())), []],
            [std.reflect.Type._ofJson(), []],
            [std.reflect.Type._ofMap(std.reflect.Type._ofBool(), true), []],
            [std.reflect.Type._ofMutJson(), []],
            [std.reflect.Type._ofNum(), []],
            [std.reflect.Type._ofOptional(std.reflect.Type._ofStr()), []],
            [std.reflect.Type._ofStr(), []],
            [std.reflect.Type._ofVoid(), []],
          ],
        });
      }
    }
    const t1 = std.reflect.Type._ofNum();
    (expect.Util.equal(t1.kind, "num"));
    (expect.Util.equal((t1.toString()), "num"));
    const t2 = std.reflect.Type._ofStr();
    (expect.Util.equal(t2.kind, "str"));
    (expect.Util.equal((t2.toString()), "str"));
    const t3 = std.reflect.Type._ofBool();
    (expect.Util.equal(t3.kind, "bool"));
    (expect.Util.equal((t3.toString()), "bool"));
    const t4 = std.reflect.Type._ofFunction(new std.reflect.FunctionType(std.reflect.Phase.INFLIGHT, [std.reflect.Type._ofNum(), ], std.reflect.Type._ofBool()));
    (expect.Util.equal(t4.kind, "function"));
    (expect.Util.equal((t4.toString()), "inflight (num): bool"));
    {
      const $if_let_value = (t4.asFunction());
      if ($if_let_value != undefined) {
        const fn = $if_let_value;
        (expect.Util.equal(fn.params.length, 1));
        (expect.Util.equal($helpers.lookup(fn.params, 0).kind, "num"));
        (expect.Util.equal(fn.returns.kind, "bool"));
        (expect.Util.equal(fn.phase, std.reflect.Phase.INFLIGHT));
        (expect.Util.equal((fn.toString()), "inflight (num): bool"));
      }
      else {
        (expect.Util.fail("t4 is not a function"));
      }
    }
    const t5 = std.reflect.Type._ofFunction(new std.reflect.FunctionType(std.reflect.Phase.PREFLIGHT, [std.reflect.Type._ofBool(), ], std.reflect.Type._ofVoid()));
    (expect.Util.equal(t5.kind, "function"));
    (expect.Util.equal((t5.toString()), "preflight (bool): void"));
    {
      const $if_let_value = (t5.asFunction());
      if ($if_let_value != undefined) {
        const fn = $if_let_value;
        (expect.Util.equal(fn.params.length, 1));
        (expect.Util.equal($helpers.lookup(fn.params, 0).kind, "bool"));
        (expect.Util.equal(fn.returns.kind, "void"));
        (expect.Util.equal((fn.toString()), "preflight (bool): void"));
      }
      else {
        (expect.Util.fail("t5 is not a function"));
      }
    }
    const t6 = std.reflect.Type._ofVoid();
    (expect.Util.equal(t6.kind, "void"));
    (expect.Util.equal((t6.toString()), "void"));
    const t7 = std.reflect.Type._ofOptional(std.reflect.Type._ofStr());
    (expect.Util.equal(t7.kind, "optional"));
    (expect.Util.equal((t7.toString()), "str?"));
    {
      const $if_let_value = (t7.asOptional());
      if ($if_let_value != undefined) {
        const opt = $if_let_value;
        (expect.Util.equal(opt.child.kind, "str"));
        (expect.Util.equal((opt.toString()), "str?"));
      }
      else {
        (expect.Util.fail("t7 is not an optional"));
      }
    }
    const t8 = std.reflect.Type._ofArray(std.reflect.Type._ofNum(), false);
    (expect.Util.equal(t8.kind, "array"));
    (expect.Util.equal((t8.toString()), "Array<num>"));
    {
      const $if_let_value = (t8.asArray());
      if ($if_let_value != undefined) {
        const arr = $if_let_value;
        (expect.Util.equal(arr.isMut, false));
        (expect.Util.equal(arr.child.kind, "num"));
        (expect.Util.equal((arr.toString()), "Array<num>"));
      }
      else {
        (expect.Util.fail("t8 is not an array"));
      }
    }
    const t9 = std.reflect.Type._ofMap(std.reflect.Type._ofBool(), true);
    (expect.Util.equal(t9.kind, "mutmap"));
    (expect.Util.equal((t9.toString()), "MutMap<bool>"));
    {
      const $if_let_value = (t9.asMap());
      if ($if_let_value != undefined) {
        const map = $if_let_value;
        (expect.Util.equal(map.isMut, true));
        (expect.Util.equal(map.child.kind, "bool"));
        (expect.Util.equal((map.toString()), "MutMap<bool>"));
      }
      else {
        (expect.Util.fail("t9 is not a map"));
      }
    }
    const t10 = std.reflect.Type._ofJson();
    (expect.Util.equal(t10.kind, "json"));
    (expect.Util.equal((t10.toString()), "Json"));
    const t11 = std.reflect.Type._ofMutJson();
    (expect.Util.equal(t11.kind, "mutjson"));
    (expect.Util.equal((t11.toString()), "MutJson"));
    const t12 = std.reflect.Type._ofDuration();
    (expect.Util.equal(t12.kind, "duration"));
    (expect.Util.equal((t12.toString()), "duration"));
    const t13 = std.reflect.Type._ofBytes();
    (expect.Util.equal(t13.kind, "bytes"));
    (expect.Util.equal((t13.toString()), "bytes"));
    const t14 = std.reflect.Type._ofDatetime();
    (expect.Util.equal(t14.kind, "datetime"));
    (expect.Util.equal((t14.toString()), "datetime"));
    const t15 = std.reflect.Type._ofBytes();
    (expect.Util.equal(t15.kind, "bytes"));
    (expect.Util.equal((t15.toString()), "bytes"));
    const t16 = $types.t1_interface_MyInterface;
    (expect.Util.equal(t16.kind, "interface"));
    (expect.Util.equal((t16.toString()), "MyInterface"));
    {
      const $if_let_value = (t16.asInterface());
      if ($if_let_value != undefined) {
        const iface = $if_let_value;
        (expect.Util.equal(iface.name, "MyInterface"));
        (expect.Util.equal((iface.toString()), "MyInterface"));
        (expect.Util.equal(iface.bases.length, 1));
        (expect.Util.equal($helpers.lookup(iface.bases, 0).name, "BaseInterface"));
        (expect.Util.equal($macros.__Map_size(false, iface.methods, ), 1));
        (expect.Util.equal($helpers.lookup(iface.methods, "method1").name, "method1"));
        (expect.Util.equal(($helpers.lookup(iface.methods, "method1").child.toString()), "preflight (): void"));
      }
      else {
        (expect.Util.fail("t16 is not an interface"));
      }
    }
    const t17 = $types.t15_class_MyClass;
    (expect.Util.equal(t17.kind, "class"));
    (expect.Util.equal((t17.toString()), "MyClass"));
    {
      const $if_let_value = (t17.asClass());
      if ($if_let_value != undefined) {
        const cls = $if_let_value;
        (expect.Util.equal(cls.name, "MyClass"));
        (expect.Util.equal((cls.toString()), "MyClass"));
        {
          const $if_let_value = cls.base;
          if ($if_let_value != undefined) {
            const base = $if_let_value;
            (expect.Util.equal(base.name, "Resource"));
          }
          else {
            (expect.Util.fail("t17 does not have a base class"));
          }
        }
        (expect.Util.equal($macros.__Map_size(false, cls.properties, ), 1));
        (expect.Util.equal($helpers.lookup(cls.properties, "field1").name, "field1"));
        (expect.Util.equal($helpers.lookup(cls.properties, "field1").child.kind, "str"));
        (expect.Util.ok(($macros.__Map_size(false, cls.methods, ) >= 2)));
        (expect.Util.equal($helpers.lookup(cls.methods, "method1").name, "method1"));
        (expect.Util.equal($helpers.lookup(cls.methods, "method1").isStatic, false));
        (expect.Util.equal(($helpers.lookup(cls.methods, "method1").child.toString()), "preflight (): void"));
        (expect.Util.equal($helpers.lookup(cls.methods, "method2").name, "method2"));
        (expect.Util.equal($helpers.lookup(cls.methods, "method2").isStatic, true));
        (expect.Util.equal(($helpers.lookup(cls.methods, "method2").child.toString()), "preflight (): void"));
      }
      else {
        (expect.Util.fail("t17 is not a class"));
      }
    }
    const t18 = $types.t29_enum_MyEnum;
    (expect.Util.equal(t18.kind, "enum"));
    (expect.Util.equal((t18.toString()), "MyEnum"));
    {
      const $if_let_value = (t18.asEnum());
      if ($if_let_value != undefined) {
        const enm = $if_let_value;
        (expect.Util.equal(enm.name, "MyEnum"));
        (expect.Util.equal((enm.toString()), "MyEnum"));
        (expect.Util.equal($macros.__Map_size(false, enm.variants, ), 2));
        (expect.Util.equal($helpers.lookup(enm.variants, "VARIANT1").name, "VARIANT1"));
        (expect.Util.equal($helpers.lookup(enm.variants, "VARIANT2").name, "VARIANT2"));
      }
      else {
        (expect.Util.fail("t18 is not an enum"));
      }
    }
    const t19 = $types.t30_struct_MyStruct;
    (expect.Util.equal(t19.kind, "struct"));
    (expect.Util.equal((t19.toString()), "MyStruct"));
    {
      const $if_let_value = (t19.asStruct());
      if ($if_let_value != undefined) {
        const st = $if_let_value;
        (expect.Util.equal(st.name, "MyStruct"));
        (expect.Util.equal((st.toString()), "MyStruct"));
        (expect.Util.equal(st.bases.length, 2));
        (expect.Util.equal($helpers.lookup(st.bases, 0).name, "Base1"));
        (expect.Util.equal($helpers.lookup(st.bases, 1).name, "Base2"));
        (expect.Util.equal($macros.__Map_size(false, st.fields, ), 4));
        (expect.Util.equal($helpers.lookup(st.fields, "base1").name, "base1"));
        (expect.Util.equal($helpers.lookup(st.fields, "base1").child.kind, "bool"));
        (expect.Util.equal($helpers.lookup(st.fields, "base2").name, "base2"));
        (expect.Util.equal($helpers.lookup(st.fields, "base2").child.kind, "bool"));
        (expect.Util.equal($helpers.lookup(st.fields, "field1").name, "field1"));
        (expect.Util.equal($helpers.lookup(st.fields, "field1").child.kind, "num"));
        (expect.Util.equal($helpers.lookup(st.fields, "field2").name, "field2"));
        (expect.Util.equal($helpers.lookup(st.fields, "field2").child.kind, "array"));
        const arr = $helpers.unwrap(($helpers.lookup(st.fields, "field2").child.asArray()));
        (expect.Util.equal(arr.child.kind, "optional"));
        const opt = $helpers.unwrap((arr.child.asOptional()));
        (expect.Util.equal(opt.child.kind, "json"));
      }
      else {
        (expect.Util.fail("t19 is not a struct"));
      }
    }
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:@type in inflight", new $Closure1(this, "$Closure1"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "type_intrinsic.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

