bring expect;

// === fixtures ===

interface BaseInterface {}

interface MyInterface extends BaseInterface {
  method1(): void;
}

class MyClass impl MyInterface {
  pub field1: str;
  pub method1(): void {}
  pub static method2(): void {}
  new() {
    this.field1 = "hello";
  }
}

enum MyEnum {
  VARIANT1,
  VARIANT2,
}

struct Base1 {
  base1: bool;
}

struct Base2 {
  base2: bool;
}

struct MyStruct extends Base1, Base2 {
  field1: num;
  field2: Array<Json?>;
}

// === tests ===

let t1 = @type(num);
expect.equal(t1.kind, "num");
expect.equal(t1.toString(), "num");

let t2 = @type(str);
expect.equal(t2.kind, "str");
expect.equal(t2.toString(), "str");

let t3 = @type(bool);
expect.equal(t3.kind, "bool");
expect.equal(t3.toString(), "bool");

let t4 = @type(inflight (num): bool);
expect.equal(t4.kind, "function");
expect.equal(t4.toString(), "inflight (num): bool");

if let fn = t4.asFunction() {
  expect.equal(fn.params.length, 1);
  expect.equal(fn.params[0].kind, "num");
  expect.equal(fn.returns.kind, "bool");
  expect.equal(fn.phase, std.Phase.INFLIGHT);
  expect.equal(fn.toString(), "inflight (num): bool");
} else {
  expect.fail("t4 is not a function");
}

let t5 = @type((bool): void);
expect.equal(t5.kind, "function");
expect.equal(t5.toString(), "preflight (bool): void");

if let fn = t5.asFunction() {
  expect.equal(fn.params.length, 1);
  expect.equal(fn.params[0].kind, "bool");
  expect.equal(fn.returns.kind, "void");
  expect.equal(fn.toString(), "preflight (bool): void");
} else {
  expect.fail("t5 is not a function");
}

let t6 = @type(void);
expect.equal(t6.kind, "void");
expect.equal(t6.toString(), "void");

let t7 = @type(str?);
expect.equal(t7.kind, "optional");
expect.equal(t7.toString(), "str?");
if let opt = t7.asOptional() {
  expect.equal(opt.child.kind, "str");
  expect.equal(opt.toString(), "str?");
} else {
  expect.fail("t7 is not an optional");
}

let t8 = @type(Array<num>);
expect.equal(t8.kind, "array");
expect.equal(t8.toString(), "Array<num>");
if let arr = t8.asArray() {
  expect.equal(arr.child.kind, "num");
  expect.equal(arr.toString(), "Array<num>");
  expect.equal(arr.isMut, false);
} else {
  expect.fail("t8 is not an array");
}

let t9 = @type(MutMap<bool>);
expect.equal(t9.kind, "mutmap");
expect.equal(t9.toString(), "MutMap<bool>");
if let map = t9.asMap() {
  expect.equal(map.child.kind, "bool");
  expect.equal(map.toString(), "MutMap<bool>");
  expect.equal(map.isMut, true);
} else {
  expect.fail("t9 is not a map");
}

let t10 = @type(Json);
expect.equal(t10.kind, "json");
expect.equal(t10.toString(), "Json");

let t11 = @type(MutJson);
expect.equal(t11.kind, "mutjson");
expect.equal(t11.toString(), "MutJson");

let t12 = @type(duration);
expect.equal(t12.kind, "duration");
expect.equal(t12.toString(), "duration");

let t13 = @type(bytes);
expect.equal(t13.kind, "bytes");
expect.equal(t13.toString(), "bytes");

let t14 = @type(datetime);
expect.equal(t14.kind, "datetime");
expect.equal(t14.toString(), "datetime");

let t15 = @type(bytes);
expect.equal(t15.kind, "bytes");
expect.equal(t15.toString(), "bytes");

let t16 = @type(MyInterface);
expect.equal(t16.kind, "interface");
expect.equal(t16.toString(), "MyInterface");
if let iface = t16.asInterface() {
  expect.equal(iface.name, "MyInterface");
  expect.equal(iface.toString(), "MyInterface");

  expect.equal(iface.bases.length, 1);
  expect.equal(iface.bases[0].name, "BaseInterface");

  expect.equal(iface.methods.size(), 1);
  expect.equal(iface.methods["method1"].name, "method1");
  expect.equal(iface.methods["method1"].child.toString(), "preflight (): void");
} else {
  expect.fail("t16 is not an interface");
}

let t17 = @type(MyClass);
expect.equal(t17.kind, "class");
expect.equal(t17.toString(), "MyClass");
if let cls = t17.asClass() {
  expect.equal(cls.name, "MyClass");
  expect.equal(cls.toString(), "MyClass");
  if let base = cls.base {
    expect.equal(base.name, "Resource");
  } else {
    expect.fail("t17 does not have a base class");
  }
  expect.equal(cls.properties.size(), 1);
  expect.equal(cls.properties["field1"].name, "field1");
  expect.equal(cls.properties["field1"].child.kind, "str");
  expect.ok(cls.methods.size() >= 2); // all classes have some base methods
  expect.equal(cls.methods["method1"].name, "method1");
  expect.equal(cls.methods["method1"].isStatic, false);
  expect.equal(cls.methods["method1"].child.toString(), "preflight (): void");
  expect.equal(cls.methods["method2"].name, "method2");
  expect.equal(cls.methods["method2"].isStatic, true);
  expect.equal(cls.methods["method2"].child.toString(), "preflight (): void");
} else {
  expect.fail("t17 is not a class");
}

let t18 = @type(MyEnum);
expect.equal(t18.kind, "enum");
expect.equal(t18.toString(), "MyEnum");
if let enm = t18.asEnum() {
  expect.equal(enm.name, "MyEnum");
  expect.equal(enm.toString(), "MyEnum");
  expect.equal(enm.variants.size(), 2);
  expect.equal(enm.variants["VARIANT1"].name, "VARIANT1");
  expect.equal(enm.variants["VARIANT2"].name, "VARIANT2");
} else {
  expect.fail("t18 is not an enum");
}

let t19 = @type(MyStruct);
expect.equal(t19.kind, "struct");
expect.equal(t19.toString(), "MyStruct");
if let st = t19.asStruct() {
  expect.equal(st.name, "MyStruct");
  expect.equal(st.toString(), "MyStruct");

  expect.equal(st.bases.length, 2);
  expect.equal(st.bases[0].name, "Base1");
  expect.equal(st.bases[1].name, "Base2");

  expect.equal(st.fields.size(), 4);
  expect.equal(st.fields["base1"].name, "base1");
  expect.equal(st.fields["base1"].child.kind, "bool");
  expect.equal(st.fields["base2"].name, "base2");
  expect.equal(st.fields["base2"].child.kind, "bool");
  expect.equal(st.fields["field1"].name, "field1");
  expect.equal(st.fields["field1"].child.kind, "num");
  expect.equal(st.fields["field2"].name, "field2");
  expect.equal(st.fields["field2"].child.kind, "array");
  let arr = st.fields["field2"].child.asArray()!;
  expect.equal(arr.child.kind, "optional");
  let opt = arr.child.asOptional()!;
  expect.equal(opt.child.kind, "json");
} else {
  expect.fail("t19 is not a struct");
}

test "@type in inflight" {
  let t1 = @type(num);
  expect.equal(t1.kind, "num");
  expect.equal(t1.toString(), "num");

  let t2 = @type(str);
  expect.equal(t2.kind, "str");
  expect.equal(t2.toString(), "str");

  let t3 = @type(bool);
  expect.equal(t3.kind, "bool");
  expect.equal(t3.toString(), "bool");

  let t4 = @type(inflight (num): bool);
  expect.equal(t4.kind, "function");
  expect.equal(t4.toString(), "inflight (num): bool");

  if let fn = t4.asFunction() {
    expect.equal(fn.params.length, 1);
    expect.equal(fn.params[0].kind, "num");
    expect.equal(fn.returns.kind, "bool");
    expect.equal(fn.phase, std.Phase.INFLIGHT);
    expect.equal(fn.toString(), "inflight (num): bool");
  } else {
    expect.fail("t4 is not a function");
  }

  // skip t5 since preflight functions since we don't have a way to represent a preflight function type annotation in inflight

  let t6 = @type(void);
  expect.equal(t6.kind, "void");
  expect.equal(t6.toString(), "void");

  let t7 = @type(str?);
  expect.equal(t7.kind, "optional");
  expect.equal(t7.toString(), "str?");
  if let opt = t7.asOptional() {
    expect.equal(opt.child.kind, "str");
    expect.equal(opt.toString(), "str?");
  } else {
    expect.fail("t7 is not an optional");
  }

  let t8 = @type(Array<num>);
  expect.equal(t8.kind, "array");
  expect.equal(t8.toString(), "Array<num>");
  if let arr = t8.asArray() {
    expect.equal(arr.child.kind, "num");
    expect.equal(arr.toString(), "Array<num>");
    expect.equal(arr.isMut, false);
  } else {
    expect.fail("t8 is not an array");
  }

  let t9 = @type(MutMap<bool>);
  expect.equal(t9.kind, "mutmap");
  expect.equal(t9.toString(), "MutMap<bool>");
  if let map = t9.asMap() {
    expect.equal(map.child.kind, "bool");
    expect.equal(map.toString(), "MutMap<bool>");
    expect.equal(map.isMut, true);
  } else {
    expect.fail("t9 is not a map");
  }

  let t10 = @type(Json);
  expect.equal(t10.kind, "json");
  expect.equal(t10.toString(), "Json");

  let t11 = @type(MutJson);
  expect.equal(t11.kind, "mutjson");
  expect.equal(t11.toString(), "MutJson");

  let t12 = @type(duration);
  expect.equal(t12.kind, "duration");
  expect.equal(t12.toString(), "duration");

  let t13 = @type(bytes);
  expect.equal(t13.kind, "bytes");
  expect.equal(t13.toString(), "bytes");

  let t14 = @type(datetime);
  expect.equal(t14.kind, "datetime");
  expect.equal(t14.toString(), "datetime");

  let t15 = @type(bytes);
  expect.equal(t15.kind, "bytes");
  expect.equal(t15.toString(), "bytes");

  let t16 = @type(MyInterface);
  // expect.equal(t16.kind, "interface");
  // expect.equal(t16.toString(), "MyInterface");
  // if let iface = t16.asInterface() {
  //   expect.equal(iface.name, "MyInterface");
  //   expect.equal(iface.toString(), "MyInterface");

  //   expect.equal(iface.bases.length, 1);
  //   expect.equal(iface.bases[0].name, "BaseInterface");

  //   expect.equal(iface.methods.size(), 1);
  //   expect.equal(iface.methods["method1"].name, "method1");
  //   expect.equal(iface.methods["method1"].child.toString(), "preflight (): void");
  // } else {
  //   expect.fail("t16 is not an interface");
  // }

  // let t17 = @type(MyClass);
  // expect.equal(t17.kind, "class");
  // expect.equal(t17.toString(), "MyClass");
  // if let cls = t17.asClass() {
  //   expect.equal(cls.name, "MyClass");
  //   expect.equal(cls.toString(), "MyClass");
  //   if let base = cls.base {
  //     expect.equal(base.name, "Resource");
  //   } else {
  //     expect.fail("t17 does not have a base class");
  //   }
  //   expect.equal(cls.properties.size(), 1);
  //   expect.equal(cls.properties["field1"].name, "field1");
  //   expect.equal(cls.properties["field1"].child.kind, "str");
  //   expect.ok(cls.methods.size() >= 2); // all classes have some base methods
  //   expect.equal(cls.methods["method1"].name, "method1");
  //   expect.equal(cls.methods["method1"].isStatic, false);
  //   expect.equal(cls.methods["method1"].child.toString(), "preflight (): void");
  //   expect.equal(cls.methods["method2"].name, "method2");
  //   expect.equal(cls.methods["method2"].isStatic, true);
  //   expect.equal(cls.methods["method2"].child.toString(), "preflight (): void");
  // } else {
  //   expect.fail("t17 is not a class");
  // }

  // let t18 = @type(MyEnum);
  // expect.equal(t18.kind, "enum");
  // expect.equal(t18.toString(), "MyEnum");
  // if let enm = t18.asEnum() {
  //   expect.equal(enm.name, "MyEnum");
  //   expect.equal(enm.toString(), "MyEnum");
  //   expect.equal(enm.variants.size(), 2);
  //   expect.equal(enm.variants["VARIANT1"].name, "VARIANT1");
  //   expect.equal(enm.variants["VARIANT2"].name, "VARIANT2");
  // } else {
  //   expect.fail("t18 is not an enum");
  // }

  // let t19 = @type(MyStruct);
  // expect.equal(t19.kind, "struct");
  // expect.equal(t19.toString(), "MyStruct");
  // if let st = t19.asStruct() {
  //   expect.equal(st.name, "MyStruct");
  //   expect.equal(st.toString(), "MyStruct");

  //   expect.equal(st.bases.length, 2);
  //   expect.equal(st.bases[0].name, "Base1");
  //   expect.equal(st.bases[1].name, "Base2");

  //   expect.equal(st.fields.size(), 4);
  //   expect.equal(st.fields["base1"].name, "base1");
  //   expect.equal(st.fields["base1"].child.kind, "bool");
  //   expect.equal(st.fields["base2"].name, "base2");
  //   expect.equal(st.fields["base2"].child.kind, "bool");
  //   expect.equal(st.fields["field1"].name, "field1");
  //   expect.equal(st.fields["field1"].child.kind, "num");
  //   expect.equal(st.fields["field2"].name, "field2");
  //   expect.equal(st.fields["field2"].child.kind, "array");
  //   let arr = st.fields["field2"].child.asArray()!;
  //   expect.equal(arr.child.kind, "optional");
  //   let opt = arr.child.asOptional()!;
  //   expect.equal(opt.child.kind, "json");
  // } else {
  //   expect.fail("t19 is not a struct");
  // }
}
