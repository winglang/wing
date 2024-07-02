bring expect;

// Play around with "this"
let path = nodeof(this).path;

for c in nodeof(this).children {
  log(nodeof(c).path);
}

// we run this file during hangar testing- 
// once with the test command on sim and then with the compile command on tf-aws
let rootMatch: Map<str> = {
  "true": "Test.",
  "false": "root"
  };

expect.notNil(nodeof(this));
expect.match(nodeof(this).path.split("/").at(0),   rootMatch["{nodeof(this).app.isTestEnvironment}"]);
