// This file was auto generated from an example found in: 01-preflight-and-inflight.md_example_10
// Example metadata: {"valid":true}
inflight () => {
  class Person {
    name: str;
    age: num;

    new(name: str, age: num) {
      this.name = name;
      this.age = age;
    }

    pub inflight greet() {
      log("Hello, {this.name}!");
    }
  }

  let p = new Person("John", 30);
  p.greet();
};
