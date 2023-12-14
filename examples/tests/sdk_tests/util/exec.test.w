bring util;
bring expect;

test "exec() with valid command" {
  let program = "/bin/echo";
  let args = ["-n", "Hello, Wing!"];

  let output = util.exec(program, args);
  
  expect.equal(output.stdout, "Hello, Wing!");
  expect.equal(output.stderr, "");
  expect.equal(output.status, 0);
}

test "exec() with invalid command" {
  let program = "no-such-program";
  let args = [""];

  let output = util.exec(program, args);

  expect.equal(output.stdout, "");
  expect.equal(output.stderr, "/bin/sh: 1: no-such-program: not found\n");
  expect.equal(output.status, 127);
}

test "exec() with explicit non-zero exit status return" {
  let program = "/bin/sh";
  let args = ["-c", "'exit 1'"];

  let output = util.exec(program, args);

  expect.equal(output.stdout, "");
  expect.equal(output.stderr, "");
  expect.equal(output.status, 1);
}
