bring util;
bring expect;
bring fs;

test "exec() with valid program" {
  let program = "echo";
  let args = ["-n", "Hello, Wing!"];

  let output = util.exec(program, args);
  
  expect.equal(output.stdout, "Hello, Wing!");
  expect.equal(output.stderr, "");
  expect.equal(output.status, 0);
}

test "exec() with invalid program" {
  let program = "no-such-program";
  let args = [""];

  let output = util.exec(program, args);

  expect.equal(output.stdout, "");
  expect.equal(output.stderr, "");
  expect.equal(output.status, "ENOENT");
}

test "exec() with explicit non-zero exit status" {
  let program = "bash";
  let args = ["-c", "exit 1"];

  let output = util.exec(program, args);

  expect.equal(output.stdout, "");
  expect.equal(output.stderr, "");
  expect.equal(output.status, 1);
}

test "shell() with env and inheritEnv options" {
  let program = "bash";
  let args = ["-c", "echo $WING_TARGET $ENV_VAR"];
  let opts = {
    env: { ENV_VAR: "Wing" },
    inheritEnv: false,
  };

  let output = util.exec(program, args, opts);

  expect.equal(output.stdout, "Wing\n");
  expect.equal(output.stderr, "");
  expect.equal(output.status, 0);
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