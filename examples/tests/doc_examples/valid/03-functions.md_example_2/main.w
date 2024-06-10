// This file was auto generated from an example found in: 03-functions.md_example_2
// Example metadata: {"valid":true}

let handler = inflight (message: str): void => {
  // using the inflight modifier 
  let dup = inflight (s: str, count: num): str => {
    // code
  };
  // inflight modifier is not required when function is declared in inflight context
  let sup = (s: str, count: num): str => {
    // code
  };
};
