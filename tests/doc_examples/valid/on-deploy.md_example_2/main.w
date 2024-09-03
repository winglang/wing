// This file was auto generated from an example found in: on-deploy.md_example_2
// Example metadata: {"valid":true}
bring cloud;

let counter = new cloud.Counter();

let setup2 = new cloud.OnDeploy(inflight () => {
  counter.inc();
}) as "setup2";
let setup1 = new cloud.OnDeploy(inflight () => {
  counter.set(10);
}, executeBefore: [setup2]) as "setup1";
