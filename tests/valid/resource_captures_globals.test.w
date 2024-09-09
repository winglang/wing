bring cloud;
bring util;

let globalBucket = new cloud.Bucket();
let globalCounter = new cloud.Counter();
let globalStr = "hello";
let globalBool = true;
let globalNum = 42;
let globalArrayOfStr = ["hello", "world"];
let globalMapOfNum = Map<num>{ "a" => -5, "b" => 2 };
let globalSetOfStr = Set<str>[ "a", "b" ];

class First {
  pub myResource: cloud.Bucket;

  new() {
    this.myResource = new cloud.Bucket();
  }
}

class Another {
  pub myField: str;
  pub first: First;

  new() {
    this.myField = "hello!";
    this.first = new First();
  }

  inflight new() {
    assert(globalCounter.peek() == 0);
  }

  pub inflight myMethod(): num {
    globalCounter.inc();
    return globalCounter.peek();
  }

  pub static inflight myStaticMethod(): num {
    return globalCounter.peek();
  }
}

let globalAnother = new Another();

class MyResource {
  localTopic: cloud.Topic;
  localCounter: cloud.Counter;
  new() {
    this.localTopic = new cloud.Topic();
    this.localCounter = new cloud.Counter();
    let $parentThis = this;

    class R impl cloud.ITopicOnMessageHandler {
      pub inflight handle() {
        globalCounter.inc();
        $parentThis.localCounter.inc();
      }
    }
    this.localTopic.onMessage(new R());
  }

  pub inflight myPut() {
    this.localTopic.publish("hello");
    globalBucket.put("key", "value");
    assert(globalStr == "hello");
    assert(globalBool == true);
    assert(globalNum == 42);
    assert(globalArrayOfStr.at(0) == "hello");
    assert(globalMapOfNum.get("a") == -5);
    assert(globalSetOfStr.has("a"));
    assert(globalAnother.myField == "hello!");
    globalAnother.first.myResource.put("key", "value");
    assert(globalAnother.myMethod() > 0);
    assert(Another.myStaticMethod() > 0);
    util.waitUntil(inflight () => {
      return this.localCounter.peek() > 0;
    });
  }
}

let res = new MyResource();

test "test" {
  res.myPut();
}

test "access cloud resource through static methods only" {
  // Call a static method which access a (global) cloud resource
  // the capturing should work through the Type binding mechanism
  assert(Another.myStaticMethod() == 0);
}
