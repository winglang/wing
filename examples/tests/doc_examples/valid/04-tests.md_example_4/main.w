// This file was auto generated from an example found in: 04-tests.md_example_4
// Example metadata: {"valid":true}
bring cloud;
bring util;

let b = new cloud.Bucket();
b.onCreate(inflight (key: str) => {
  if !key.startsWith("/dest") {
    let content = b.get(key);
    b.put("/dest/" + key, content.uppercase());
  }
});

test "bucket onCreate" {
  b.put("file", "lorem ipsum");
  // Using waitUntil for waiting until the async event system of onCreate
  // finished generating a the dest/file
  let foundUppercaseFile = util.waitUntil((): bool => {
      return b.exists("/dest/file");
  });
  assert(foundUppercaseFile && b.get("/dest/file") == "LOREM IPSUM");
}

