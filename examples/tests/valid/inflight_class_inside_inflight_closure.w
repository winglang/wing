bring cloud;

class PreflightClass {
  b: cloud.Bucket;
  init() {
    this.b = new cloud.Bucket();
  }
  preflight_method(): cloud.Function {
    let inflight_closure = inflight (payload: str) => {
      this.b.put("k","v");  // Here `this` is the parent class instance
      inflight class InflightClass {
        field: str;
        init() {
          this.field = "value";
        }
        inflight method() {
          assert(this.field == "value"); // Here `this` is the inflight class instance
        }
      }
      let c = new InflightClass();
      c.method();
    };
    return new cloud.Function(inflight_closure);
  }
}

let p = new PreflightClass();
let f = p.preflight_method();

test "it works" {
  f.invoke("text");
}
