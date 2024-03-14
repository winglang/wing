bring cloud;

let bucket = new cloud.Bucket();

let prelight_string = "hi";

class Foo {
  pub inflight mehtod1() {
    let b = bucket;
    lift(b, ["put"]); // Explicit qualification with inflight object
      // ^ Expected a preflight object as first argument to `lift` builtin, found inflight expression instead
    lift(prelight_string, ["contains"]); // Explicit qualification on preflight non-class
      // ^^^^^^^^^^^^^^^ Expected type to be "Resource", but got "str" instead

    let inflight_qualifier = "delete";
    lift(bucket, [inflight_qualifier]); // Explicit qualification with inflight qualifiers
              // ^^^^^^^^^^^^^^^^^^^^ Qualification list must not contain any inflight elements
  }

  pub inflight method2() {
    let b = bucket;
    b.put("k", "v"); // With no explicit qualification this should be an error
    //^ Expression of type "Bucket" references an unknown preflight object
  }
}
