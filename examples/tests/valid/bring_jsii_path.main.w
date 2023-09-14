bring cloud;
bring "./node_modules/jsii-code-samples" as jsiiCodeSamples;

let hello = new jsiiCodeSamples.HelloWorld();
let greeting = hello.sayHello("wingnuts");

test "sayHello" {
  assert(greeting == "Hello, wingnuts");
}
