bring util;
bring expect;
bring fs;

let assertThrows = inflight (expected: str, block: (): void) => {
  let var error = false;
  try {
    block();
  } catch actual {
    assert(actual.contains(expected));
    error = true;
  }
  assert(error);
};


test "exec() with valid program" {
  let program = "echo";
  let args = ["-n", "Hello, Wing!"];

  let output = util.exec(program, args);
  
  expect.equal(output.stdout, "Hello, Wing!");
  expect.equal(output.stderr, "");
  expect.equal(output.status, 0);
}

test "exec() with invalid program" {
  let NOT_FOUND_ERROR = "Program not found:";

  let program = "no-such-program";
  let args = [""];

  assertThrows(NOT_FOUND_ERROR, () => {
    util.exec(program, args);
  });
}

test "exec() with explicit non-zero exit status" {
  let program = "bash";
  let args = ["--norc", "--noprofile", "-c", "exit 1"];

  let output = util.exec(program, args);

  expect.equal(output.stdout, "");
  expect.equal(output.stderr, "");
  expect.equal(output.status, 1);
}

test "exec() with env option" {
  let program = "bash";
  let args = ["--norc", "--noprofile", "-c", "echo $WING_TARGET $ENV_VAR"];
  let opts = {
    env: { ENV_VAR: "Wing" },
  };

  let output = util.exec(program, args, opts);

  expect.equal(output.stdout, "Wing\n");
  expect.equal(output.stderr, "");
  expect.equal(output.status, 0);
}

test "exec() with inheritEnv option" {
  let program = "bash";
  let args = ["--norc", "--noprofile", "-c", "echo $WING_TARGET"];
  let opts = {
    inheritEnv: true,
  };

  let output1 = util.exec(program, args);
  let output2 = util.exec(program, args, opts);

  // LF (\n)
  expect.equal(output1.stdout.length, 1);
  expect.equal(output1.stderr, "");
  expect.equal(output1.status, 0);

  assert(output2.stdout.length > 1);
  expect.equal(output2.stderr, "");
  expect.equal(output2.status, 0);
}

test "exec() with cwd option" {
  let tempDir = fs.mkdtemp();
  let tempFile = fs.join(tempDir, "tempfile.txt");
  fs.writeFile(tempFile, "Hello, Wing!");

  let program = "ls";
  let args = ["-1"];
  let opts = {cwd: tempDir};

  let output = util.exec(program, args, opts);

  expect.equal(output.stdout, "tempfile.txt\n");
  expect.equal(output.stderr, "");
  expect.equal(output.status, 0);
}