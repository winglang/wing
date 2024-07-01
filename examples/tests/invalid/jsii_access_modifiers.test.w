// Import a JSII module (our sdk)
bring cloud;

let b = new cloud.Bucket();

class MyBucket extends cloud.Bucket {
  method() {
    // Call protected method from withing subclass (should work)
    b.createTopic(cloud.BucketEventType.CREATE);
  }
}

b.createTopic(cloud.BucketEventType.CREATE);
//^ Cannot access protected member

// Call public method from outside the class (should work)
b.addObject("k", "v");