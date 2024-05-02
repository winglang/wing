bring cloud;

interface IPreflightInterface {
  inflight method(): void;
}
class PreflightClass impl IPreflightInterface {
  pub inflight method(): void {}

  preflight_method() {
    lift {bucket: [put]}{} // Lift statment in preflight method
  }
}

let bucket = new cloud.Bucket();

let prelight_string = "hi";
let preflight_class = new PreflightClass();

// Lift statement in preflight global scope
lift {bucket: [put]}{}

class Foo {
  pub inflight mehtod1() {
    let b = bucket;
    lift {b: [put]}{} // Explicit qualification with inflight object
    lift {prelight_string: contains}{} // Explicit qualification on preflight non-class
    lift {bucket: [shoot]}{} // Explicit qualification with unknown member
    lift {bucket: shoot}{} // Explicit qualification with unknown, single method format
    lift {not_bucket: put, not_bucket_again: get}{} // Explicit qualification with unknown objects
    lift {bucket: addObject}{} // Explicit qualification with preflight method op
    lift {bucket: "put"}{} // Explicit qualification non method type op
  }

  pub inflight method2() {
    let b = bucket;
    b.put("k", "v"); // With no explicit qualification this should be an error

    let b2 = bucket;
    lift {bucket: put}{}
    b2.put("k", "v"); // With explicit qualification, but outside of lift block, this should be an error

    let i: IPreflightInterface = preflight_class;
    i.method(); // With no explicit qualification this should be an error
  }
}
