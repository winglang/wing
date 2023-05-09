bring cloud;

let globalBucket = new cloud.Bucket();
let globalCounter = new cloud.Counter();
let globalStr = "hello";
let globalBool = true;
let globalNum = 42;
let globalArrayOfStr = ["hello", "world"];
let globalMapOfNum = Map<num>{ "a": -5, "b": 2 };
let globalSetOfStr = Set<str>{ "a", "b" };

class First {
  myResource: cloud.Bucket;

  init() {
    this.myResource = new cloud.Bucket();
  }
}

class Another {
  myField: str;
  first: First;

  init () {
    this.myField = "hello!";
    this.first = new First();
  }

  inflight init() {
    assert(globalCounter.peek() == 0);
  }

  inflight myMethod(): num {
    globalCounter.inc();
    return globalCounter.peek();
  }
}

let globalAnother = new Another();

class MyResource {
  localTopic: cloud.Topic;
  localCounter: cloud.Counter;
  init() {
    this.localTopic = new cloud.Topic();
    this.localCounter = new cloud.Counter();
    let $parentThis = this;

    class R impl cloud.ITopicOnMessageHandler {
      inflight handle() {
        globalCounter.inc();
        $parentThis.localCounter.inc();
      }
    }
    this.localTopic.onMessage(new R());
  }

  inflight myPut() {
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
  }
}

let res = new MyResource();

new cloud.Function(inflight () => {
  res.myPut();
}) as "test";
