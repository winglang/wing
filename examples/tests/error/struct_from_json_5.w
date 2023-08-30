// Note that this test has to be alone because it needs to compile successfully and fail at preflight.
// If it is run with other tests, subsequent failures will be ignored in snapshot.

struct Foo {
  names: Map<str>;
}

let jFoo = {
  names: {
    a: "Amanda",
    b: "Barry",
    c: 10
  }
};

Foo.fromJson(jFoo);
//           ^ ERROR: unable to parse Foo:
// - instance.names.c is not of a type(s) string
