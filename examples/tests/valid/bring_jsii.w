bring cloud;
bring "jsii-code-samples" as stuff;

let hello = new stuff.HelloWorld();
let greeting = hello.sayHello("wingnuts");

test "sayHello2" {
  assert(greeting == "Hello, wingnuts");
}
