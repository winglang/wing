bring util;
bring expect;
bring fs;

test "shell() with valid command" {
  let command = "echo -n 'Hello, Wing!'";

  let output = util.shell(command);
  
  expect.equal(output.stdout, "Hello, Wing!");
  expect.equal(output.stderr, "");
  expect.equal(output.status, 0);
}

test "shell() with invalid command" {
  let command = "no-such-command";

  let output = util.shell(command);

  expect.equal(output.stdout, "");
  expect.equal(output.stderr, "/bin/sh: 1: no-such-command: not found\n");
  expect.equal(output.status, 127);
}

test "shell() with explicit non-zero exit status" {
  let command = "exit 1";

  let output = util.shell(command);

  expect.equal(output.stdout, "");
  expect.equal(output.stderr, "");
  expect.equal(output.status, 1);
}

test "shell() with env option" {
  let command = "echo -n $ENV_VAR";
  let opts = {env: { "ENV_VAR": "Wing" }};

  let output = util.shell(command, opts);

  expect.equal(output.stdout, "Wing");
  expect.equal(output.stderr, "");
  expect.equal(output.status, 0);
}

test "shell() with cwd option" {
  let tempDir = fs.mkdtemp();
  let tempFile = fs.join(tempDir, "tempfile.txt");
  fs.writeFile(tempFile, "Hello, Wing!");

  let command = "ls -1";
  let opts = {cwd: tempDir};

  let output = util.shell(command, opts);

  expect.equal(output.stdout, "tempfile.txt\n");
  expect.equal(output.stderr, "");
  expect.equal(output.status, 0);
}