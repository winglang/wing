bring util;
bring expect;

test "exec() with valid command" {
  let program = "/bin/echo";
  let args = ["-n", "Hello, Wing!"];
  let output = util.exec(program, args);
  expect.equal(output.stdout, "Hello, Wing!");
  expect.equal(output.status, 0);
}
