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
//          ^^^^^^^^^^^ Unable to qualify which operations are performed on 'this.bucket' of type 'Bucket'. This is not supported yet.
    b.put("hello", "world");

    this.collectionOfResources.at(0).put("hello", "world");
//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Capturing collection of resources is not supported yet (type is 'Array<Bucket>')
  }
}
