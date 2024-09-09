// This file was auto generated from an example found in: bucket.md_example_4
// Example metadata: {"valid":true}
bring cloud;

let store = new cloud.Bucket();
let copies = new cloud.Bucket() as "Backup";

store.onCreate(inflight (key: str) => {
  let data = store.get(key);
  if !key.endsWith(".log") {
    copies.put(key, data);
  }
});

store.onDelete(inflight (key: str) => {
  copies.delete(key);
  log("Deleted {key}");
});
