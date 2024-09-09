// This file was auto generated from an example found in: 01-preflight-and-inflight.md_example_13
// Example metadata: {"valid":true}
let preflight_str = "hello from preflight"; 
inflight () => {
  log(preflight_str); // `preflight_str` is "lifted" into inflight.
};
