bring cloud;
bring aws;
bring util;

let target = util.env("WING_TARGET");

let queue = new cloud.Queue() as "aws-wing-queue";

let getQueueInfo = (q: cloud.Queue): Map<str>? => {
  if let queue = aws.Queue.from(q) {
    return {
      queueName: queue.queueName,
      queueUrl: queue.queueUrl,
      queueArn: queue.queueArn,
    };
  }
  return nil;
};

let queueInfo = getQueueInfo(queue);

test "validates the AWS queue name" {
  if let queue = queueInfo {
    if target == "tf-aws" {
      assert(queue.get("queueArn").contains("arn:aws:sqs:"));
      assert(queue.get("queueArn").contains("aws-wing-queue"));
      assert(queue.get("queueName").contains("aws-wing-queue"));
    } else { // If it's not a 'tf-aws' target, it's an 'awscdk'
      assert(queue.get("queueArn").contains("arn:aws:sqs:"));
      assert(queue.get("queueArn").contains("awswingqueue"));
      assert(queue.get("queueName").contains("awswingqueue"));
    }
  } else {
    // If the test is not on AWS, it should not fail, so I am returning true.
    assert(true);
  }
}