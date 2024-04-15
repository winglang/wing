bring cloud;

interface IPreflightInterface {
  inflight method(): void;
}
class PreflightClass impl IPreflightInterface {
  pub inflight method(): void {}
}

let bucket = new cloud.Bucket();

let prelight_string = "hi";
let preflight_class = new PreflightClass();

class Foo {
  pub inflight mehtod1() {
    let b = bucket;
    lift(b, ["put"]); // Explicit qualification with inflight object, lift call as non first statement
      // ^ Expected a preflight object as first argument to `lift` builtin, found inflight expression instead
    //^^^^^^^^^^^^^^^ lift() calls must be at the top of the method

    lift(prelight_string, ["contains"]); // Explicit qualification on preflight non-class
      // ^^^^^^^^^^^^^^^ Expected type to be "Resource", but got "str" instead
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ lift() calls must be at the top of the method

    let inflight_qualifier = "delete";
    lift(bucket, [inflight_qualifier]); // Explicit qualification with inflight qualifiers, lift call as non first statement
              // ^^^^^^^^^^^^^^^^^^^^ Qualification list must not contain any inflight elements
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ lift() calls must be at the top of the method

    let inner_closure = () => {
      lift(bucket, ["get"]); // lift() call in inner closure
      //^^^^^^^^^^^^^^^^^^^^ lift() calls are only allowed in inflight methods and closures defined in preflight
    };
    class Bar {
      pub inflight method() {
        lift(bucket, ["get"]); // lift() call in inner class
        //^^^^^^^^^^^^^^^^^^^^ lift() calls are only allowed in inflight methods and closures defined in preflight
    }
    }
  }

  pub inflight method2() {
    let b = bucket;
    b.put("k", "v"); // With no explicit qualification this should be an error
    //^ Expression of type "Bucket" references an unknown preflight object

    let i: IPreflightInterface = preflight_class;
    i.method(); // With no explicit qualification this should be an error
    //^ Expression of type "IPreflightInterface" references an unknown preflight object
  }
}
