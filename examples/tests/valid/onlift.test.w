bring cloud;
bring fs;

let out = MutArray<str>[];

fs.writeFile("./onlift.test.result", "");

class A {
  pub onLift(host: std.IInflightHost, ops: Array<str>) {
    fs.writeFile("./onlift.test.result", "A: {host} {ops}\n", flag: "a+");
  }

  pub inflight action() {
  }
}

let a = new A();

class B {
  pub onLift(host: std.IInflightHost, ops: Array<str>) {
    fs.writeFile("./onlift.test.result", "B: {host} {ops}\n", flag: "a+");
  }

  pub inflight action1() {
  }

  pub inflight action2() {
    this.action1();
  }
}

let b = new B();

class C {
  bucket: cloud.Bucket;

  new() {
    this.bucket = new cloud.Bucket();
  }

  pub onLift(host: std.IInflightHost, ops: Array<str>) {
    fs.writeFile("./onlift.test.result", "C: {host} {ops}\n", flag: "a+");
  }

  pub inflight action() {
    this.bucket.exists("test");
  }
}

let c = new C();

test "onLift method" {
  a.action();
  b.action2();
  c.action();

  let excepted = "A: root/env0/test:/Handler action,$inflight_init
B: root/env0/test:/Handler action2,$inflight_init
B: root/env0/test:/Handler action1,$inflight_init
C: root/env0/test:/Handler action,$inflight_init
";

  log("{fs.readFile("./onlift.test.result")}");

  fs.remove("./onlift.test.result");
}
