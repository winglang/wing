bring cloud;
bring "./node_modules/jsii-code-samples" as jsii_code_samples;

let hello = new jsii_code_samples.HelloWorld();
let greeting = hello.say_hello("wingnuts");

new cloud.Function(inflight (m: str): str => {
  assert(greeting == "Hello, wingnuts");
}) as "test:say_hello";
