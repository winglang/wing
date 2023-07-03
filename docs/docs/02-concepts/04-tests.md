---
title: Tests
id: tests
description: Run test in wing cross multiple clouds
keywords: [Wing test, multi-cloud]
---

Winglang has a lightweight test framework composed of the `wing test` command and the `test` keyword.

You write a test by creating a winglang file that contains:
```ts wing
test "<test-name>" {
  // inflight test code 
}
```
The test framework runs each such test in isolation; if the test throws an expection (usually using the `assert` funciton) the test is considered to have failed.


Consider this example:

```ts playground
// example.w
bring math;

test "abs" {
  assert(1 == math.abs(-1));
}
```

And running the test on the simulator
```sh
% wing test example.w --target sim 
pass ─ example.wsim » root/env0/test:abs

 
Tests 1 passed (1)
Test Files 1 passed (1)
Duration 0m0.54s
```

**Notice:** The `--target sim` can be ommited since it is the default target for the `wing test` command

### Test run in isolation
Each wing test runs in complete isolation, consider the following code:

```ts playground
bring cloud;

let b = new cloud.Bucket();

test "bucket list should include created file" {
  b.put("file", "lorem ipsum");
  let listOfFile = b.list();
  assert(listOfFile.length == 1);
}

test "bucket starts empty" {
  let listOfFile = b.list();
  assert(listOfFile.length == 0);
}
```

The first test `bucket list should include created file` is creating a file in the bucket, and the second test `bucket starts empty` verifies that the bucket is initialized with no files. 

### Run test on a the cloud

Lets consider the following example:
```ts playground
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

```

Running the test on the tf-aws target 
```sh
% wing test example.w -t tf-aws 
✔ Compiling example.w to tf-aws...
✔ terraform init
✔ terraform apply
✔ Setting up test runner...
✔ Running tests...
pass ─ example.tfaws » root/Default/env0/test:bucket onCreate
✔ terraform destroy
 
 
Tests 1 passed (1)
Test Files 1 passed (1)
Duration 1m31.44s
```
