bring cloud;

class Foo {
  bucket: cloud.Bucket;
  mut_array: MutArray<str>;
  var reassignable: num;
  collection_of_resources: Array<cloud.Bucket>;

  init() {
    this.mut_array = MutArray<str>[];
    this.mut_array.push("hello");
    this.reassignable = 42;
    this.collection_of_resources = Array<cloud.Bucket>[];
  }

  inflight test() {
    log("${this.reassignable}");
//           ^^^^^^^^^^^^^^^^^ Cannot capture reassignable field 'reassignable'
    log(this.mut_array.at(0));
//        ^^^^^^^^^ Unable to reference "this.mut_array" from inflight method "test" because type MutArray<str> is not capturable

    let b = this.bucket;
//          ^^^^^^^^^^^ Unable to qualify which operations are performed on 'this.bucket' of type 'Bucket'. This is not supported yet.
    b.put("hello", "world");

    this.collection_of_resources.at(0).put("hello", "world");
//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Capturing collection of resources is not supported yet (type is 'Array<Bucket>')
  }
}
