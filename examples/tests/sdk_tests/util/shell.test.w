bring util;
bring expect;
bring fs;

class Util {
  extern "./util.js" pub static inflight platformInflight(): str;
  extern "./util.js" pub static platformPreflight(): str;
}

let assertThrowsPreflight = (expected: str, block: (): void) => {
  let var error = false;
  try {
    block();
  } catch actual {
    assert(actual.contains(expected));
    error = true;
  }
  assert(error);
};

let assertThrowsInflight = inflight (expected: str, block: (): void) => {
  let var error = false;
  try {
    block();
  } catch actual {
    assert(actual.contains(expected));
    error = true;
  }
  assert(error);
};

// note: each test is run twice, once in inflight and once in preflight
// please keep them in sync until unphased functions are implemented :-)

test "shell() with valid command" {
  let command = "echo Hello, Wing!";

  let output = util.shell(command);
  
  if Util.platformInflight() != "win32" {
    expect.equal(output, "Hello, Wing!\n");
  } else {
    expect.equal(output, "Hello, Wing!\r\n");
  }
}

(() => {
  let command = "echo Hello, Wing!";

  let output = util.shell(command);

  if Util.platformPreflight() != "win32" {
    expect.equal(output, "Hello, Wing!\n");
  } else {
    expect.equal(output, "Hello, Wing!\r\n");
  }
});

test "shell() with invalid command" {
  let NOT_FOUND_ERROR = "Error executing command \"no-such-command\". Exited with error:";

  let command = "no-such-command";

  assertThrowsInflight(NOT_FOUND_ERROR, () => {
    util.shell(command);
  });
}

(() => {
  let NOT_FOUND_ERROR = "Error executing command \"no-such-command\". Exited with error:";

  let command = "no-such-command";

  assertThrowsPreflight(NOT_FOUND_ERROR, () => {
    util.shell(command);
  });
});

test "shell() with explicit non-zero exit status" {
  let ERROR = "Error executing command \"exit 1\". Exited with error code: 1";

  let command = "exit 1";

  assertThrowsInflight(ERROR, () => {
    util.shell(command);
  });
}

(() => {
  let ERROR = "Error executing command \"exit 1\". Exited with error code: 1";

  let command = "exit 1";

  assertThrowsPreflight(ERROR, () => {
    util.shell(command);
  });
});

test "shell() with env option" {
  let var command = "";
  if Util.platformInflight() != "win32" {
    command = "echo $WING_TARGET $ENV_VAR";
  } else {
    command = "echo %WING_TARGET% %ENV_VAR%";
  }
  let opts = {
    env: { ENV_VAR: "Wing" },
  };

  let output = util.shell(command, opts);

  if Util.platformInflight() != "win32" {
    expect.equal(output, "Wing\n");
  } else {
    expect.equal(output, "%WING_TARGET% Wing\r\n");
  }
}

(() => {
  let var command = "";
  if Util.platformPreflight() != "win32" {
    command = "echo $WING_TARGET $ENV_VAR";
  } else {
    command = "echo %WING_TARGET% %ENV_VAR%";
  }
  let opts = {
    env: { ENV_VAR: "Wing" },
  };

  let output = util.shell(command, opts);

  if Util.platformPreflight() != "win32" {
    expect.equal(output, "Wing\n");
  } else {
    expect.equal(output, "%WING_TARGET% Wing\r\n");
  }
});

test "shell() with inheritEnv option" {
  let target = util.env("WING_TARGET");

  let var command = "";
  if Util.platformInflight() != "win32" {
    command = "echo $WING_TARGET";
  } else {
    command = "echo %WING_TARGET%";
  }
  let opts = {
    inheritEnv: true,
  };

  let output1 = util.shell(command);
  let output2 = util.shell(command, opts);

  if Util.platformInflight() != "win32" {
    // \n
    expect.equal(output1.length, 1);
  } else {
    // %WING_TARGET%\r\n
    expect.equal(output1.length, 15);
  }
  assert(output1.contains(target) == false);
  assert(output2.contains(target) == true);
}

(() => {
  let target = util.env("WING_TARGET");

  let var command = "";
  if Util.platformPreflight() != "win32" {
    command = "echo $WING_TARGET";
  } else {
    command = "echo %WING_TARGET%";
  }
  let opts = {
    inheritEnv: true,
  };

  let output1 = util.shell(command);
  let output2 = util.shell(command, opts);

  if Util.platformPreflight() != "win32" {
    // \n
    expect.equal(output1.length, 1);
  } else {
    // %WING_TARGET%\r\n
    expect.equal(output1.length, 15);
  }
  assert(output1.contains(target) == false);
  assert(output2.contains(target) == true);
});

test "shell() with cwd option" {
  let tempDir = fs.mkdtemp();
  let tempFile = fs.join(tempDir, "tempfile.txt");
  fs.writeFile(tempFile, "Hello, Wing!");

  let command = "ls -1";
  let opts = {cwd: tempDir};

  let output = util.shell(command, opts);

  expect.equal(output, "tempfile.txt\n");
}

(() => {
  let tempDir = fs.mkdtemp();
  let tempFile = fs.join(tempDir, "tempfile.txt");
  fs.writeFile(tempFile, "Hello, Wing!");

  let command = "ls -1";
  let opts = {cwd: tempDir};

  let output = util.shell(command, opts);

  expect.equal(output, "tempfile.txt\n");
});

test "shell() with throw option" {
  let command = "exit 1";
  let opts = { throw: false };

  let output = util.shell(command, opts);

  expect.equal(output, "Error executing command \"exit 1\". Exited with error code: 1");
}

(() => {
  let command = "exit 1";
  let opts = { throw: false };

  let output = util.shell(command, opts);

  expect.equal(output, "Error executing command \"exit 1\". Exited with error code: 1");
});
