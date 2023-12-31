bring util;
bring expect;

test "spawn() with successful execution" {
  let program = "echo";
  let args = ["Hello, Wing!"];
  
  let child = util.spawn(program, args);
  let output = child.wait();

  expect.equal(output.stdout, "Hello, Wing!\n");
  expect.equal(output.status, 0);
}