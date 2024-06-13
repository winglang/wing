// This file was auto generated from an example found in: 02-application-tree.md_example_6
// Example metadata: {"valid":true}
bring cloud;

class Factory {
  pub static make() {
    new cloud.Bucket(); // We're in a static, so we don't know where to place this bucket
  }
}

class MyBucket {
  new() {
    Factory.make(); // Bucket will be placed inside `this` instance of `MyBucket`
  }
}
new MyBucket();

// tree:
//          root
//           /
//       MyBucket
//         /
//      Bucket
