bring cloud;
bring aws;
bring util;

let target = util.env("WING_TARGET");

let queue = new cloud.Queue() as "aws-wing-queue";

let getQueueName = (q: cloud.Queue): str? => {
  if let queue = aws.Queue.from(q) {
    let queueAws = queue.innerAwsQueue();
    if target == "tf-aws" {
      return queueAws.name;
    }
    return queueAws.queueName;
  }
  return nil;
};

let queueName = getQueueName(queue);

test "validates the AWS queue name" {
  if let name = queueName {
    if target == "tf-aws" {
      assert(name.contains("aws-wing-queue"));
    } else { // If it's not a 'tf-aws' target, it's an 'awscdk'
      assert(name.contains("awswingqueue"));
    }
  }
  // If the test is not on AWS, it should not fail, so I am returning true.
  assert(true);
}