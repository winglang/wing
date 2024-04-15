bring cloud;
bring "jsii-code-samples" as stuff;
bring "jsii-fixture" as jsii_fixture;

let hello = new stuff.HelloWorld();
let greeting = hello.sayHello("wingnuts");

test "sayHello" {
  assert(greeting == "Hello, wingnuts");
  let helloInflight = new stuff.HelloWorld();
  assert(helloInflight.sayHello("wingnuts") == greeting);
}

let jsiiClass = new jsii_fixture.JsiiClass(10);
assert(jsiiClass.applyClosure(5, (x) => { return x * 2; }) == 10);

let jsiiStruct = jsii_fixture.SomeStruct { field: "struct field" };
assert(jsiiClass.methodWithStructParam(jsiiStruct) == "struct field");

// Use a JSII interface
class X impl jsii_fixture.ISomeInterface {
  pub method() {}
}
