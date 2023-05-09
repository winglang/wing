bring cloud;
bring "./node_modules/jsii-code-samples" as jsii_code_samples;

let hello = new jsii_code_samples.HelloWorld();
let greeting = hello.say_hello("wingnuts");

test "say_hello" {
  assert(greeting == "Hello, wingnuts");
}
