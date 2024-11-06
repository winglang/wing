// This file was auto generated from an example found in: 08-optionality.md_example_4
// Example metadata: {"valid":true}
let j  = Json {
  working: {
    a: {
      b: "value"
    }
  },
  broken: {}
};

if let value = j.tryGet("working")?.tryGet("a")?.tryGet("b")?.tryAsStr() {
  log("value is {value}");
} 

if let value = j.tryGet("broken")?.tryGet("a")?.tryGet("b")?.tryAsStr() {
  // not reachable 
} else {
  log("value was not found");
}
