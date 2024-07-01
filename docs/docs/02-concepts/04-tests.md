---
title: Tests
id: tests
description: Execute tests in Winglang across multiple clouds
keywords: [Wing test, multi-cloud]
---

Winglang incorporates a lightweight testing framework, which is built around the `wing test` command and the `test` keyword. It lets you to run the same tests, in isolation, on both the Wing simulator and in the cloud.

### How to create a test

You can create a test by adding the following code structure to any Winglang file (.w):

```ts wing example
test "<test-name>" {
  // test code
}
```

If a test throws an exception (typically using the `assert` function), it's considered to have failed.

Here's an example:

```ts playground example
// example.w
bring math;

test "abs" {
  assert(1 == math.abs(-1));
}
```

### Running tests in the Simulator

You can execute all tests in a `.w` file in the simulator using the following command:

```sh
% wing test example.w --target sim
pass ─ example.wsim » root/env0/test:abs


Tests 1 passed (1)
Test Files 1 passed (1)
Duration 0m0.54s
```

**Notice:** The `--target sim` argument can be omitted as it's the default target for the wing test command.

### Tests run in isolation

Every Winglang test is executed in complete isolation. Take a look at the following code:

```ts playground example
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

In the first test (`bucket list should include created file`), a file is created in the bucket. The second test (`bucket starts empty`) verifies that the bucket is initialized without any file.

### Running tests in the cloud

Consider the following example:

```ts playground example
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

By default, the tested resources will be destroyed at the end of the test. You can use the `--no-clean` to keep them up. The path to the randomized directory containing the output files will be displayed at the end of the test.

```sh
% wing test example.w -t tf-aws --no-clean
✔ Compiling example.w to tf-aws...
✔ terraform init
✔ terraform apply
✔ Setting up test runner...
✔ Running tests...
pass ─ example.tfaws » root/Default/env0/test:bucket onCreate
✔ terraform destroy
Clean up is disabled!
Output files available at /var/folders/1m/..../example.tfaws

Tests 1 passed (1)
Test Files 1 passed (1)
Duration 1m31.44s
```

### Running tests in the console

Wing Console provides a straightforward method to run either a single test or all your tests.

Consider the following code:

```ts playground example{valid: false}
// example.w
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

Refer to the TESTS section in the image below. You have the option to run all tests or a single test.
![image](https://github.com/winglang/wing/assets/1727147/7d5ebc00-9316-41d1-9a3c-0e28e195d077)

### Saving test output to a file

To save test output to a file, add the relative path to the file to the `-o` or `--output-file` option. The format is inferred by the extension, only .json is supported at the moment.

For example:
`wing test -t sim -o out.json /test/file.test.w`
`wing test -t sim --output-file path/to/out.json /test/file.test.w`
