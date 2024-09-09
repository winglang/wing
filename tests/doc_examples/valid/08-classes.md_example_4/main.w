// This file was auto generated from an example found in: 08-classes.md_example_4
// Example metadata: {"valid":true}
bring cloud;

interface IKVStore extends std.IResource { 
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

let bucketBased: IKVStore = new BucketBasedKeyValueStore();

test "bucketBased KVStore" {
  bucketBased.set("k", Json {
    value: "v"
  });
  let result = bucketBased.get("k");
  log("{result.get("value")}");
  assert("v" == str.fromJson(result.get("value")));
}
