bring cloud;
bring "./node_modules/jsii-code-samples" as jsiiCodeSamples;

let hello = new jsiiCodeSamples.HelloWorld();
let greeting = hello.sayHello("wingnuts");

new cloud.Function(inflight (m: str): str => {
  assert(greeting == "Hello, wingnuts");
}) as "test:sayHello";
