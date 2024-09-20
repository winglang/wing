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

let t4_fn = t4.asFunction()!;
expect.equal(t4_fn.params.length, 1);
expect.equal(t4_fn.params[0].kind, "num");
expect.equal(t4_fn.returns.kind, "bool");
expect.equal(t4_fn.phase, std.Phase.INFLIGHT);
expect.equal(t4_fn.toString(), "inflight (num): bool");

// TODO: why doesn't this work?

// test "@type in inflight" {
//   let t5 = @type(inflight (num): bool);
//   expect.equal(t5.kind, "function");
//   expect.equal(t5.toString(), "inflight (num): bool");
// }
