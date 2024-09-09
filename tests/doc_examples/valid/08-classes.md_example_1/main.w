// This file was auto generated from an example found in: 08-classes.md_example_1
// Example metadata: {"valid":true}
bring cloud;
bring util;

class Foo  {
  pub field1: str;     // <-- readonly
  pub var field2: num; // <-- reassignable
  inflight field3: Array<str>;

  new() {
    this.field1 = "hello";
    this.field2 = 123;
  }

  setField2(value: num): void {
    this.field2 = value;
  }

  inflight new() {
    this.field3 = ["value created on inflight init"];
    log("at inflight init");
  }

  pub inflight doStuff() {
    // all code is async and runs on the cloud
    log("field3[0]='{this.field3.at(0)}'");
    util.sleep(1s);
    log("done");
  }
}

let f = new Foo();
log("field1={f.field1}");
log("field2={f.field2}");

new cloud.Function(inflight () => {
  f.doStuff();
});

