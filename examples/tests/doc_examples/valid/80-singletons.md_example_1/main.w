// This file was auto generated from an example found in: 80-singletons.md_example_1
// Example metadata: {"valid":true}
bring cloud;

class SingletonBucket {
  pub static of(scope: std.IResource): cloud.Bucket {
    let uid = "SingletonBucket";
    let root = nodeof(scope).root;
    let rootNode = nodeof(root);
    return unsafeCast(rootNode.tryFindChild(uid)) ?? new cloud.Bucket() as uid in root;
  }
}
