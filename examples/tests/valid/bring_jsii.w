bring cloud;
bring "jsii-code-samples" as stuff;

let hello = new stuff.HelloWorld();
let greeting = hello.say_hello("wingnuts");

test "say_hello" {
  assert(greeting == "Hello, wingnuts");
}
