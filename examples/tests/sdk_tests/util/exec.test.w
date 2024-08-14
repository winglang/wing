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

let output1 = util.exec("echo", ["-n", "Hello, Wing!"]);
  
  expect.equal(output1.stdout, "Hello, Wing!");
  expect.equal(output1.stderr, "");
  expect.equal(output1.status, 0);


test "exec()" {
  // "exec() with valid program"
  let output1 = util.exec("echo", ["-n", "Hello, Wing!"]);
  
  expect.equal(output1.stdout, "Hello, Wing!");
  expect.equal(output1.stderr, "");
  expect.equal(output1.status, 0);


// "exec() with invalid program" 
  let NOT_FOUND_ERROR = "Program not found:";

  assertThrows(NOT_FOUND_ERROR, () => {
    util.exec("no-such-program",  [""]);
  });

// "exec() with explicit non-zero exit status" 
  let output2 = util.exec("bash", ["--norc", "--noprofile", "-c", "exit 1"]);

  expect.equal(output2.stdout, "");
  expect.equal(output2.stderr, "");
  expect.equal(output2.status, 1);

//  "exec() with env option" 
  let program3 = "bash";
  let args3 = ["--norc", "--noprofile", "-c", "echo $WING_TARGET $ENV_VAR"];
  let opts3 = {
    env: { ENV_VAR: "Wing" },
  };

  let output3 = util.exec(program3, args3, opts3);

  expect.equal(output3.stdout, "Wing\n");
  expect.equal(output3.stderr, "");
  expect.equal(output3.status, 0);


//  "exec() with inheritEnv option" 
  let program4 = "bash";
  let args4 = ["--norc", "--noprofile", "-c", "echo $WING_TARGET"];
  let opts4 = {
    inheritEnv: true,
  };

  let output4 = util.exec(program4, args4);
  let output5 = util.exec(program4, args4, opts4);

  // LF (\n)
  expect.equal(output4.stdout.length, 1);
  expect.equal(output4.stderr, "");
  expect.equal(output4.status, 0);

  assert(output5.stdout.length > 1);
  expect.equal(output5.stderr, "");
  expect.equal(output5.status, 0);


// "exec() with cwd option" 
  let tempDir = fs.mkdtemp();
  let tempFile = fs.join(tempDir, "tempfile.txt");
  fs.writeFile(tempFile, "Hello, Wing!");

  let program6 = "ls";
  let args6 = ["-1"];
  let opts6 = {cwd: tempDir};

  let output6 = util.exec(program6, args6, opts6);

  expect.equal(output6.stdout, "tempfile.txt\n");
  expect.equal(output6.stderr, "");
  expect.equal(output6.status, 0);
}