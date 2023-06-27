# User Story 12b - bring jsii in preflight

> **Status**: Expected released on 2023/02/02

We want to be able to bring a jsii module into wing, this story focuses on the smallest step,
bringing the code so it can be used in preflight.

Here is the expected test that should work in the end of this sprint:

```ts (wing)
// Prerequisite
// npm install --save cdk-constants

bring cloud;
bring "jsii-code-samples" as stuff;

let hello = new stuff.HelloWorld();
let greeting = hello.say_hello("wingnuts");

new cloud.Function(inflight (m: str): str => {
  assert(greeting == "Hello, wingnuts");
}) as "test:say_hello";
```
