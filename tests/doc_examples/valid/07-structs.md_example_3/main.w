// This file was auto generated from an example found in: 07-structs.md_example_3
// Example metadata: {"valid":true}
struct Another {
  hello: str;
}

struct MyData {
  a: str;
  b: num?;
  c: Another;
}

let data = MyData {
  a: "hello",
  c: Another {
    hello: "two"
  }
};

log(data.a); // prints hello  
log(data.c.hello); // prints two
