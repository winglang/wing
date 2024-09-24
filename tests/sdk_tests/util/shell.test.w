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
  let command = "echo Hello, Wing!";

  let output = util.shell(command);
  
  if util.os() != "win32" {
    expect.equal(output, "Hello, Wing!\n");
  } else {
    expect.equal(output, "Hello, Wing!\r\n");
  }
}

test "shell() with invalid command" {
  let NOT_FOUND_ERROR = "Error executing command \"no-such-command\". Exited with error:";

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
  let var command = "";
  if util.os() != "win32" {
    command = "echo $WING_TARGET $ENV_VAR";
  } else {
    command = "echo %WING_TARGET% %ENV_VAR%";
  }
  let opts = {
    env: { ENV_VAR: "Wing" },
  };

  let output = util.shell(command, opts);

  if util.os() != "win32" {
    expect.equal(output, "Wing\n");
  } else {
    expect.equal(output, "%WING_TARGET% Wing\r\n");
  }
}

test "shell() with inheritEnv option" {
  let var command = "";
  if util.os() != "win32" {
    command = "echo $WING_TARGET";
  } else {
    command = "echo %WING_TARGET%";
  }
  let opts = {
    inheritEnv: true,
  };

  let output1 = util.shell(command);
  let output2 = util.shell(command, opts);

  if util.os() != "win32" {
    // \n
    expect.equal(output1.length, 1);
  } else {
    // %WING_TARGET%\r\n
    expect.equal(output1.length, 15);
  }
  assert(output1.contains(@target) == false);
  assert(output2.contains(@target) == true);
}

test "shell() with cwd option" {
  let tempDir = fs.mkdtemp();
  let tempFile = fs.join(tempDir, "tempfile.txt");
  fs.writeFile(tempFile, "Hello, Wing!");

  let command1 = "ls -1";
  let opts1 = {cwd: tempDir};

  let output1 = util.shell(command1, opts1);

  expect.equal(output1, "tempfile.txt\n");

// "shell() with throw option" 
  let command2 = "exit 1";
  let opts2 = {throw: false};

  let output2 = util.shell(command2, opts2);

  expect.equal(output2, "Error executing command \"exit 1\". Exited with error code: 1");
}
