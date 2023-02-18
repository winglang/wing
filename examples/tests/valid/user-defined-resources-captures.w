bring cloud;

resource MyResource {
  my_resource: cloud.Bucket;
  my_str: str;
  my_num: num;
  my_bool: bool;
  array_of_str: Array<str>;
  map_of_num: Map<num>;
  set_of_str: Set<str>;

  array_of_queues: Array<cloud.Queue>;

  init() {
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

    this.array_of_queues = [
      new cloud.Queue() as "q1", 
      new cloud.Queue() as "q2"
    ];
  }

  inflight capture_resource() {
    this.my_resource.put("f1.txt", "f1");
    assert(this.my_resource.get("f1.txt") == "f1");
    assert(this.my_resource.list().length == 1);
  }

  inflight capture_primitives() {
    assert(this.my_str == "my_string");
    assert(this.my_num == 42);
    assert(this.my_bool == true);
  }

  inflight capture_array() {
    assert(this.array_of_str.length == 2);
    assert(this.array_of_str.at(0) == "s1");
    assert(this.array_of_str.at(1) == "s2");
  }

  inflight capture_map() {
    assert(this.map_of_num.get("k1") == 11);
    assert(this.map_of_num.get("k2") == 22);
  }

  inflight capture_set() {
    assert(this.set_of_str.has("s1"));
    assert(this.set_of_str.has("s2"));
    assert(!this.set_of_str.has("s3"));
  }

  inflight capture_array_of_queues() {
    this.array_of_queues.at(0).push("q1");
    this.array_of_queues.at(1).push("q2");
  }
}

let r = new MyResource();
new cloud.Function(inflight () => { r.capture_resource(); }) as "test:capture_resource";
new cloud.Function(inflight () => { r.capture_primitives(); }) as "test:capture_primitives";
new cloud.Function(inflight () => { r.capture_array(); }) as "test:capture_array";
new cloud.Function(inflight () => { r.capture_map(); }) as "test:capture_map";
new cloud.Function(inflight () => { r.capture_set(); }) as "test:capture_set";
new cloud.Function(inflight () => { r.capture_array_of_queues(); }) as "test:capture_array_of_queues";
