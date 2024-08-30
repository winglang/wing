bring cloud;
bring aws;
bring util;

let target = util.env("WING_TARGET");

let topic = new cloud.Topic() as "aws-wing-topic";

let getTopicInfo = (t: cloud.Topic): Map<str>? => {
  if let topic = aws.Topic.from(t) {
    return {
      topicName: topic.topicName,
      topicArn: topic.topicArn,
    };
  }
  return nil;
};

let topicInfo = getTopicInfo(topic);

test "validates the AWS topic name" {
  if let topic = topicInfo {
    if target == "tf-aws" {
      assert(topic.get("topicArn").contains("arn:aws:sns:"));
      assert(topic.get("topicArn").contains("aws-wing-topic"));
      assert(topic.get("topicName").contains("aws-wing-topic"));
    } else { // If it's not a 'tf-aws' target, it's an 'awscdk'
      assert(topic.get("topicArn").contains("arn:aws:sns:"));
      assert(topic.get("topicArn").contains("awswingtopic"));
      assert(topic.get("topicName").contains("awswingtopic"));
    }
  }
  // If the test is not on AWS, it should not fail, so I am returning true.
  assert(true);
}