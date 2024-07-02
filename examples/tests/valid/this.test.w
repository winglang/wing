bring expect;

// Play around with "this"

let path = nodeof(this).path;

for c in nodeof(this).children {
  log(nodeof(c).path);
}

expect.notNil(nodeof(this));
expect.match(nodeof(this).path.split("/").at(0), "Test.");
