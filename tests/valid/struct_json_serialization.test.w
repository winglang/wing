// Duration and regex fields can be serialized to/from Json.
// Each duration is serialized as a string with an integer number of milliseconds,
// and each regex as a JavaScript RegExp string (e.g. "/p[a-z]+ch/").
struct MyStruct {
  field1: duration;
  field2: str;
  field3: regex;
}

let fromJson = MyStruct.fromJson({
  field1: "6000",
  field2: "hi",
  field3: "/p[a-z]+ch/",
});

assert(fromJson.field1.milliseconds == 6000);
assert(fromJson.field2 == "hi");
assert(fromJson.field3.test("punch"));
assert(!fromJson.field3.test("reach"));

// Nested structs, arrays, maps and optional fields also round-trip.
struct Inner {
  d: duration;
}

struct Wrapper {
  inner: Inner;
  arr: Array<regex>;
  map: Map<duration>;
  opt: regex?;
}

let wrapper = Wrapper.fromJson({
  inner: { d: "1000" },
  arr: ["/ab+c/", "/[0-9]+/"],
  map: { a: "5000" },
  opt: "/x+y/",
});

assert(wrapper.inner.d.milliseconds == 1000);
assert(wrapper.arr.at(0).test("abbbc"));
assert(wrapper.arr.at(1).test("123"));
assert(wrapper.map.get("a").milliseconds == 5000);

if let opt = wrapper.opt {
  assert(opt.test("xxy"));
} else {
  assert(false);
}

// fromJson on a value without a regex optional field yields nil for that field.
let wrapper2 = Wrapper.fromJson({
  inner: { d: "2000" },
  arr: [],
  map: {},
});

assert(wrapper2.inner.d.milliseconds == 2000);

if let opt = wrapper2.opt {
  assert(false);
}
