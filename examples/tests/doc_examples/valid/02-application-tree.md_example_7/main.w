// This file was auto generated from an example found in: 02-application-tree.md_example_7
// Example metadata: {"valid":true}
bring cloud;

class Base {
  new(b: cloud.Bucket) {}
}
class Derived extends Base {
  new() {
    super(new cloud.Bucket()); // Bucket create before `Derived` so scope defaults to caller
  }
}
new Derived();

// tree:
//          root
//           /\
//     Bucket  Derived
