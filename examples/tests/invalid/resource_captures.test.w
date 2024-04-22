bring cloud;

class Foo {
  bucket: cloud.Bucket;
  collectionOfResources: Array<cloud.Bucket>;

  new() {
    this.bucket = new cloud.Bucket();
    this.collectionOfResources = Array<cloud.Bucket>[];
  }

  inflight test() {
    let b = this.bucket;
    b.put("hello", "world");
//  ^ Expression of type "Bucket" references an unknown preflight object

    this.collectionOfResources.at(0).put("hello", "world");
//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Capturing collection of resources is not supported yet (type is 'Array<Bucket>')
  }
}
