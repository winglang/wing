bring cloud;
bring "jsii-code-samples" as stuff;

let hello = new stuff.HelloWorld();
let greeting = hello.sayHello("wingnuts");

test "sayHello" {
  assert(greeting == "Hello, wingnuts");
  let helloInflight = new stuff.HelloWorld();
  assert(helloInflight.sayHello("wingnuts") == greeting);
}
