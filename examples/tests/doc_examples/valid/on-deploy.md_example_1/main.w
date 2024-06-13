// This file was auto generated from an example found in: on-deploy.md_example_1
// Example metadata: {"valid":true}
bring cloud;

let bucket = new cloud.Bucket();

// each time the application is deployed, all objects in the bucket are deleted
let setup = new cloud.OnDeploy(inflight () => {
  for key in bucket.list() {
    bucket.delete(key);
  }
});
