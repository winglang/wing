bring expect;

class A {
  new() {
    this.node.hidden;
    // ^ Error: member "node" does not exist in A

    nodeof(this).hidden; // OK

    nodeof(this).root.node;
    // ^ Error: member "node" does not exist in IConstruct
  }
}
