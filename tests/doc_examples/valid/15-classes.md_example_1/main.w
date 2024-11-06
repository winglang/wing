// This file was auto generated from an example found in: 15-classes.md_example_1
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

  // private inflight function, only accessible during inflight
  inflight new() {
    this.field3 = ["value created on inflight init"];
    log("at inflight init");
  }

  // public inflight function, only accessible during inflight
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

// inflight example for a cloud function
new cloud.Function(inflight () => {
  // calling the public inflight function (doStuff) of the Foo class.
  // This function is not accessible during preflight.
  f.doStuff();
});

