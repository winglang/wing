// This file was auto generated from an example found in: 02-application-tree.md_example_2
// Example metadata: {"valid":true}
bring cloud;

class Group1 {
  new() {
    new cloud.Bucket() as "Store";
  }
}

class Group2 {
  new() {
    new cloud.Bucket() as "Store";
  }
}

// The following is valid
new Group1();
new Group2();
