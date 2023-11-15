bring cloud;
bring aws;
bring util;

let target = util.env("WING_TARGET");

let topic = new cloud.Topic() as "aws-wing-topic";

let getTopicInfo = (t: cloud.Topic): Map<str>? => {
  if let topic = aws.Topic.from(t) {
    return {
      name: topic.name(),
      arn: topic.arn(),
    };
  }
  return nil;
};

let topicInfo = getTopicInfo(topic);

test "validates the AWS topic name" {
  if let topic = topicInfo {
    if target == "tf-aws" {
      assert(topic.get("arn").contains("arn:aws:sns:"));
      assert(topic.get("arn").contains("aws-wing-topic"));
      assert(topic.get("name").contains("aws-wing-topic"));
    } else { // If it's not a 'tf-aws' target, it's an 'awscdk'
      assert(topic.get("arn").contains("arn:aws:sns:"));
      assert(topic.get("arn").contains("awswingtopic"));
      assert(topic.get("name").contains("awswingtopic"));
    }
  }
  // If the test is not on AWS, it should not fail, so I am returning true.
  assert(true);
}