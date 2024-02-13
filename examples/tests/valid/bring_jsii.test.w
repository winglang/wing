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