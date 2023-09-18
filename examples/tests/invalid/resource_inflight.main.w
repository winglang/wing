bring cloud;

let f = inflight () => {
  new cloud.Bucket(); // Should fail because we can't create resources inflight
};