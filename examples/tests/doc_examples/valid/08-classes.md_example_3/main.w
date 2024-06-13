// This file was auto generated from an example found in: 08-classes.md_example_3
// Example metadata: {"valid":true}
bring cloud;
/**
 * Preflight Interface
 **/ 
interface IKVStore extends std.IResource { // https://github.com/winglang/wing/issues/1961
  inflight get(key: str): Json;
  inflight set(key: str, value: Json): void;
}

class BucketBasedKeyValueStore impl IKVStore {
  bucket: cloud.Bucket;
  new() {
    this.bucket = new cloud.Bucket();
  }
  pub inflight get(key: str): Json {
    return this.bucket.getJson(key);
  }
  pub inflight set(key: str, value: Json): void {
    this.bucket.putJson(key, value);
  }
}

