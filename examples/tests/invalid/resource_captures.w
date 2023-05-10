bring cloud;

class Foo {
  bucket: cloud.Bucket;
  mutArray: MutArray<str>;
  var reassignable: num;
  collectionOfResources: Array<cloud.Bucket>;

  init() {
    this.bucket = new cloud.Bucket();
    this.mutArray = MutArray<str>[];
    this.mutArray.push("hello");
    this.reassignable = 42;
    this.collectionOfResources = Array<cloud.Bucket>[];
  }

  inflight test() {
    log("${this.reassignable}");
//           ^^^^^^^^^^^^^^^^^ Cannot capture reassignable field 'reassignable'
    log(this.mutArray.at(0));
//        ^^^^^^^^^ Unable to reference "this.mutArray" from inflight method "test" because type MutArray<str> is not capturable

    let b = this.bucket;
//          ^^^^^^^^^^^ Unable to qualify which operations are performed on 'this.bucket' of type 'Bucket'. This is not supported yet.
    b.put("hello", "world");

    this.collectionOfResources.at(0).put("hello", "world");
//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Capturing collection of resources is not supported yet (type is 'Array<Bucket>')
  }
}
