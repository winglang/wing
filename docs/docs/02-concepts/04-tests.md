---
title: Tests
id: tests
description: Execute tests in Winglang across multiple clouds
keywords: [Wing test, multi-cloud]
---

Winglang incorporates a lightweight testing framework, which is built around the `wing test` command and the `test` keyword.

You can construct a test by creating a Winglang file that includes the following code structure:
```ts wing
test "<test-name>" {
  // test code 
}
```
Each test is run in isolation within the test framework. If a test throws an exception (typically using the `assert` function), it's considered to have failed.

Here's an example:

```ts playground
// example.w
bring math;

test "abs" {
  assert(1 == math.abs(-1));
}
```

You can execute the test on the simulator using the following command:

```sh
% wing test example.w --target sim 
pass ─ example.wsim » root/env0/test:abs

 
Tests 1 passed (1)
Test Files 1 passed (1)
Duration 0m0.54s
```

**Notice:** The `--target sim` argument can be omitted as it's the default target for the wing test command.

### Test run in isolation
Every Winglang test is executed in complete isolation. Take a look at the following code:

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

In the first test (`bucket list should include created file`), a file is created in the bucket. The second test (`bucket starts empty`) verifies that the bucket is initialized without any file

### Run test on a the cloud

Consider the following example:

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

### Running tests on the console

Wing Console provides an easy way to run a single or all your tests

When running `wing run example.w`, where example:
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

test "this test should fail" {
  throw("test throws an exception fails");
}
```

Take a look at the **TESTS** section on the image, you can run all tests or a single test 
![image](https://github.com/winglang/wing/assets/1727147/7d5ebc00-9316-41d1-9a3c-0e28e195d077)


