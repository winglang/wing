bring cloud;

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

  pub inflight meaningOfLife(): num {
    return 42;
  }

  pub inflight anotherFunc(): str {
    return "42";
  }
}

class MyResource {
  myResource: cloud.Bucket;
  myStr: str;
  myNum: num;
  myBool: bool;
  myOptStr: str?;
  arrayOfStr: Array<str>;
  mapOfNum: Map<num>;
  setOfStr: Set<str>;
  another: Another;
  myQueue: cloud.Queue;
  unusedResource: cloud.Counter;

  extBucket: cloud.Bucket;
  extNum: num;

  inflight inflightField: num;
  inflight new() {
    this.inflightField = 123;
  }

  new(externalBucket: cloud.Bucket, externalNum: num) {
    this.myResource = new cloud.Bucket();
    this.myStr = "myString";
    this.myNum = 42;
    this.myBool = true;
    this.myOptStr = "myOptString";
    this.arrayOfStr = ["s1", "s2"];
    this.mapOfNum = {
      "k1" => 11,
      "k2" => 22
    };
    this.setOfStr = {"s1", "s2", "s1"};

    this.another = new Another();
    this.myQueue = new cloud.Queue();
    this.extBucket = externalBucket;
    this.extNum = externalNum;
    this.unusedResource = new cloud.Counter();
  }

  pub inflight testNoCapture() {
    let arr = [1,2,3];
    assert(arr.length == 3);
    log("array.len={arr.length}");
  }

  pub inflight testCaptureCollectionsOfData() {
    assert(this.arrayOfStr.length == 2);
    assert(this.arrayOfStr.at(0) == "s1");
    assert(this.arrayOfStr.at(1) == "s2");
    assert(this.mapOfNum.get("k1") == 11);
    assert(this.mapOfNum.get("k2") == 22);
    assert(this.setOfStr.has("s1"));
    assert(this.setOfStr.has("s2"));
    assert(!this.setOfStr.has("s3"));
  }

  pub inflight testCapturePrimitives() {
    assert(this.myStr == "myString");
    assert(this.myNum == 42);
    assert(this.myBool == true);
  }

  pub inflight testCaptureOptional() {
    assert(this.myOptStr ?? "" == "myOptString");
  }

  helloPreflight(): Another {
    return this.another;
  }

  pub inflight testCaptureResource() {
    this.myResource.put("f1.txt", "f1");
    assert(this.myResource.get("f1.txt") == "f1");
    assert(this.myResource.list().length == 1);
  }

  pub inflight testNestedInflightField() {
    assert(this.another.myField == "hello!");
    log("field={this.another.myField}");
  }

  pub inflight testNestedResource() {
    assert(this.another.first.myResource.list().length == 0);
    this.another.first.myResource.put("hello", this.myStr);
    log("this.another.first.myResource:{this.another.first.myResource.get("hello")}");
  }

  // expression within an expression
  pub inflight testExpressionRecursive() {
    this.myQueue.push(this.myStr);
  }

  pub inflight testExternal() {
    assert(this.extBucket.list().length == 0);
    assert(this.extNum == 12);
  }

  pub inflight testUserDefinedResource() {
    assert(this.another.meaningOfLife() == 42);
    assert(this.another.anotherFunc() == "42");
  }

  pub inflight testInflightField() {
    assert(this.inflightField == 123);
  }
}

let b = new cloud.Bucket();
let r = new MyResource(b, 12);

test "test" {
  r.testNoCapture();
  r.testCaptureCollectionsOfData();
  r.testCapturePrimitives();
  r.testCaptureOptional();
  r.testCaptureResource();
  r.testNestedInflightField();
  r.testNestedResource();
  r.testExpressionRecursive();
  r.testExternal();
  r.testUserDefinedResource();
  r.testInflightField();
}
