bring cloud;

resource First {
  my_resource: cloud.Bucket;

  init() {
    this.my_resource = new cloud.Bucket();
  }
}

resource Another {
  my_field: str;
  first: First;

  init () {
    this.my_field = "hello!";
    this.first = new First();
  }

  inflight meaning_of_life(): num {
    return 42;
  }

  inflight another_func(): str {
    return "42";
  }
}

resource MyResource {
  my_resource: cloud.Bucket;
  my_str: str;
  my_num: num;
  my_bool: bool;
  array_of_str: Array<str>;
  map_of_num: Map<num>;
  set_of_str: Set<str>;
  another: Another;
  my_queue: cloud.Queue;
  unused_resource: cloud.Counter;

  ext_bucket: cloud.Bucket;
  ext_num: num;


  // Needs to be var since we don't support inflight inits yet.
  inflight var inflight_field: num;

  init(external_bucket: cloud.Bucket, external_num: num) {
    this.my_resource = new cloud.Bucket();
    this.my_str = "my_string";
    this.my_num = 42;
    this.my_bool = true;
    this.array_of_str = ["s1", "s2"];
    this.map_of_num = {
      k1: 11,
      k2: 22
    };
    this.set_of_str = {"s1", "s2", "s1"};

    this.another = new Another();
    this.my_queue = new cloud.Queue();
    this.ext_bucket = external_bucket;
    this.ext_num = external_num;
    this.unused_resource = new cloud.Counter();
  }

  inflight test_no_capture() {
    let arr = [1,2,3];
    assert(arr.length == 3);
    log("array.len=${arr.length}");
  }

  inflight test_capture_collections_of_data() {
    assert(this.array_of_str.length == 2);
    assert(this.array_of_str.at(0) == "s1");
    assert(this.array_of_str.at(1) == "s2");
    assert(this.map_of_num.get("k1") == 11);
    assert(this.map_of_num.get("k2") == 22);
    assert(this.set_of_str.has("s1"));
    assert(this.set_of_str.has("s2"));
    assert(!this.set_of_str.has("s3"));
  }

  inflight test_capture_primitives() {
    assert(this.my_str == "my_string");
    assert(this.my_num == 42);
    assert(this.my_bool == true);
  }

  hello_preflight(): Another {
    return this.another;
  }

  inflight test_capture_resource() {
    this.my_resource.put("f1.txt", "f1");
    assert(this.my_resource.get("f1.txt") == "f1");
    assert(this.my_resource.list().length == 1);
  }

  inflight test_nested_preflight_field() {
    assert(this.another.my_field == "hello!");
    log("field=${this.another.my_field}");
  }

  inflight test_nested_resource() {
    assert(this.another.first.my_resource.list().length == 0);
    this.another.first.my_resource.put("hello", this.my_str);
    log("this.another.first.my_resource:${this.another.first.my_resource.get("hello")}");
  }

  // expression within an expression
  inflight test_expression_recursive() {
    this.my_queue.push(this.my_str);
  }

  inflight test_external() {
    assert(this.ext_bucket.list().length == 0);
    assert(this.ext_num == 12);
  }

  inflight test_user_defined_resource() {
    assert(this.another.meaning_of_life() == 42);
    assert(this.another.another_func() == "42");
  }

  inflight test_inflight_field() {
    this.inflight_field = 123;
    assert(this.inflight_field == 123);
  }
}

let b = new cloud.Bucket();
let r = new MyResource(b, 12);

new cloud.Function(inflight () => {
  r.test_no_capture();
  r.test_capture_collections_of_data();
  r.test_capture_primitives();
  r.test_capture_resource();
  r.test_nested_preflight_field();
  r.test_nested_resource();
  r.test_expression_recursive();
  r.test_external();
  r.test_user_defined_resource();
  r.test_inflight_field();
}) as "test";
