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

// TODO: why doesn't this work?

// test "@type in inflight" {
//   let t5 = @type(inflight (num): bool);
//   expect.equal(t5.kind, "function");
//   expect.equal(t5.toString(), "inflight (num): bool");
// }
