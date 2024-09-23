bring expect;

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

// TODO: why doesn't this work?

// test "@type in inflight" {
//   let t5 = @type(inflight (num): bool);
//   expect.equal(t5.kind, "function");
//   expect.equal(t5.toString(), "inflight (num): bool");
// }
