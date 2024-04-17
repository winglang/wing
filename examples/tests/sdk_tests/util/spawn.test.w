bring util;
bring expect;

class Util {
  extern "./util.js" pub static inflight platform(): str;
}

let assertThrows = inflight (expected: str, block: (): void) => {
  let var error = false;
  try {
    block();
    } catch actual {
      expect.equal(actual, expected);
      error = true;
    }
    expect.equal(error, true);
};


test "spawn() with successful execution" {
  let program = "echo";
  let args = ["Hello, Wing!"];
  
  let child = util.spawn(program, args);
  let output = child.wait();

  expect.equal(output.stdout, "Hello, Wing!\n");
  expect.equal(output.status, 0);
}

test "spawn() with empty args" {
  let program = "echo";
  let args = [""];
  
  let child = util.spawn(program, args);
  let output = child.wait();

  if Util.platform() != "darwin" {
    expect.equal(output.stdout, "\n");
  } else {
    expect.equal(output.stdout, "");
  }
  expect.equal(output.status, 0);
}

test "spawn() with non-existent program" {
  let program = "no-such-program";
  let args = ["--help" ];

  let child = util.spawn(program, args);

  assertThrows("spawn no-such-program ENOENT", () => {
    child.wait();
  });
}

test "spawn() and wait for terminated program" {
  let program = "sleep";
  let args = ["0.1"];

  let child = util.spawn(program, args);
  util.sleep(1s);
  let output = child.wait();

  expect.equal(output.stdout, "");
  expect.equal(output.status, 0);
}


test "spawn() and kill process" {
  let program = "sleep";
  let args = ["1"];

  let child = util.spawn(program, args);
  child.kill();

  assertThrows("Process terminated by signal SIGTERM", () => {
    child.wait();
  });
}