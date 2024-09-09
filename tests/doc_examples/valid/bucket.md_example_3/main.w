// This file was auto generated from an example found in: bucket.md_example_3
// Example metadata: {"valid":true}
bring cloud;

let bucket = new cloud.Bucket();

let bucketFunc = inflight () => {
  bucket.put("file.txt", "Hello, world!");
  bucket.putJson("person.json", Json { name: "Alice" });

  let fileData = bucket.get("file.txt");
  assert(fileData == "Hello, world!");

  let jsonData = bucket.getJson("person.json");
  assert(jsonData.get("name") == "Alice");

  let keys = bucket.list();
  assert(keys.at(0) == "file.txt");
  assert(keys.at(1) == "person.json");

  bucket.delete("file.txt");
};

new cloud.Function(bucketFunc);
