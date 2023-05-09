bring cloud;
bring "jsii-code-samples" as stuff;

let hello = new stuff.HelloWorld();
let greeting = hello.sayHello("wingnuts");

new cloud.Function(inflight (m: str): str => {
  assert(greeting == "Hello, wingnuts");
}) as "test:sayHello";
