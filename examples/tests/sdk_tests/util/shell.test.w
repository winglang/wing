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

test "shell() with valid command" {
  let command = "echo -n Hello, Wing!";

  let output = util.shell(command);
  
  expect.equal(output, "Hello, Wing!");
}

test "shell() with invalid command" {
  let NOT_FOUND_ERROR = "Error executing command \"no-such-command\". Exited with error: /bin/sh: 1: no-such-command: not found";

  let command = "no-such-command";

  assertThrows(NOT_FOUND_ERROR, () => {
    util.shell(command);
  });
}

test "shell() with explicit non-zero exit status" {
  let ERROR = "Error executing command \"exit 1\". Exited with error code: 1";

  let command = "exit 1";

  assertThrows(ERROR, () => {
    util.shell(command);
  });
}

test "shell() with env option" {
  let command = "echo -n $ENV_VAR";
  let opts = {env: { "ENV_VAR": "Wing" }};

  let output = util.shell(command, opts);

  expect.equal(output, "Wing");
}

test "shell() with cwd option" {
  let tempDir = fs.mkdtemp();
  let tempFile = fs.join(tempDir, "tempfile.txt");
  fs.writeFile(tempFile, "Hello, Wing!");

  let command = "ls -1";
  let opts = {cwd: tempDir};

  let output = util.shell(command, opts);

  expect.equal(output, "tempfile.txt\n");
}

test "shell() with throw option" {
  let command = "exit 1";
  let opts = {throw: false};

  let output = util.shell(command, opts);

  expect.equal(output, 1);
}