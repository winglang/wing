// This file was auto generated from an example found in: redis.md_example_1
// Example metadata: {"valid":true}
bring redis;
bring cloud;

// Create a reddit resource
let redisInstance  = new redis.Redis();

new cloud.Function(inflight () => {
  // Set value in the redis cache
  redisInstance.set("mykey", "myvalue");
});
