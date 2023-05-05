bring cloud;

let global_bucket = new cloud.Bucket();
let global_counter = new cloud.Counter();
let global_str = "hello";
let global_bool = true;
let global_num = 42;
let global_array_of_str = ["hello", "world"];
let global_map_of_num = Map<num>{ "a": -5, "b": 2 };
let global_set_of_str = Set<str>{ "a", "b" };

class First {
  my_resource: cloud.Bucket;

  init() {
    this.my_resource = new cloud.Bucket();
  }
}

class Another {
  my_field: str;
  first: First;

  init () {
    this.my_field = "hello!";
    this.first = new First();
  }

  inflight init() {
    assert(global_counter.peek() == 0);
  }

  inflight my_method(): num {
    global_counter.inc();
    return global_counter.peek();
  }
}

let global_another = new Another();

class MyResource {
  local_topic: cloud.Topic;
  local_counter: cloud.Counter;
  init() {
    this.local_topic = new cloud.Topic();
    this.local_counter = new cloud.Counter();
    let $parent_this = this;

    class R impl cloud.ITopicOnMessageHandler {
      inflight handle() {
        global_counter.inc();
        $parent_this.local_counter.inc();
      }
    }
    this.local_topic.on_message(new R());
  }

  inflight my_put() {
    this.local_topic.publish("hello");
    global_bucket.put("key", "value");
    assert(global_str == "hello");
    assert(global_bool == true);
    assert(global_num == 42);
    assert(global_array_of_str.at(0) == "hello");
    assert(global_map_of_num.get("a") == -5);
    assert(global_set_of_str.has("a"));
    assert(global_another.my_field == "hello!");
    global_another.first.my_resource.put("key", "value");
    assert(global_another.my_method() > 0);
  }
}

let res = new MyResource();

new cloud.Function(inflight () => {
  res.my_put();
}) as "test";
