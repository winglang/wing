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

class TableBasedKeyValueStore impl IKVStore {
  table: cloud.Table;
  new() {
    this.table = new cloud.Table(
      name: "table",
      primaryKey: "key",
      columns: {
        value: ex.ColumnType.STRING
      }
    );
  }
  pub inflight get(key: str): Json {
    return this.table.get(key);
  }
  pub inflight set(key: str, value: Json): str {
    this.table.insert(key, value);
  }
}

let bucketBased: IKVStore = new BucketBasedKeyValueStore();
let tableBased: IKVStore = new TableBasedKeyValueStore();

let testKv = inflight (kv: IKVStore):void => {
  kv.set("k", Json { 
    value: "v" 
  });
  let result = kv.get("k");
  log("{result.get("value")}");
  assert("v" == str.fromJson(result.get("value")));
};

new cloud.Function(inflight () => {
  log("testing bucketBased KVStore");
  testKv(bucketBased);
  log("testing tableBased KVStore");
  testKv(tableBased);
});
