// This file was auto generated from an example found in: 06-json.md_example_9
// Example metadata: {"valid":true}
struct Foo {
  val1: str;
  val2: num;
}

let jFoo = {
  val1: "cool",
  val2: 21
};

let foo = Foo.fromJson(jFoo);
