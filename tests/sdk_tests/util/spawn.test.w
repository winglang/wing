bring util;
bring expect;

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

test "spawn()" {
// "spawn() with successful execution"
  let program1 = "echo";
  let args1 = ["Hello, Wing!"];
  
  let child1 = util.spawn(program1, args1);
  let output1 = child1.wait();

  expect.equal(output1.stdout, "Hello, Wing!\n");
  expect.equal(output1.status, 0);

// "spawn() with empty args" 
  let program2 = "echo";
  let args2 = [""];
  
  let child2 = util.spawn(program2, args2);
  let output2 = child2.wait();

  expect.equal(["", "\n"].contains(output2.stdout), true);
  expect.equal(output2.status, 0);

// "spawn() with non-existent program" 
  let program3 = "no-such-program";
  let args3 = ["--help" ];

  let child3 = util.spawn(program3, args3);

  assertThrows("spawn no-such-program ENOENT", () => {
    child3.wait();
  });

//  "spawn() and wait for terminated program" 
  let program4 = "sleep";
  let args4 = ["0.1"];

  let child4 = util.spawn(program4, args4);
  util.sleep(1s);
  let output4 = child4.wait();

  expect.equal(output4.stdout, "");
  expect.equal(output4.status, 0);

// "spawn() and kill process" 
  let program5 = "sleep";
  let args5 = ["1"];

  let child5 = util.spawn(program5, args5);
  child5.kill();

  assertThrows("Process terminated by signal SIGTERM", () => {
    child5.wait();
  });
}