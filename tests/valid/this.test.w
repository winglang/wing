bring expect;

// Play around with "this"

let path = this.node.path;

for c in this.node.children {
  log(c.node.path);
}

expect.notNil(this.node);
expect.equal(this.node.path.split("/").at(0), "root");
