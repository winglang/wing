bring cloud;
bring aws;
bring util;

let target = util.env("WING_TARGET");

let topic = new cloud.Topic() as "aws-wing-topic";

let getTopicName = (t: cloud.Topic): str? => {
  if let topic = aws.Topic.from(t) {
    let topicAws = topic.innerAwsTopic();
    if target == "tf-aws" {
      return topicAws.name;
    }
    return topicAws.topicName;
  }
  return nil;
};

let topicName = getTopicName(topic);

test "validates the AWS topic name" {
  if let name = topicName {
    if target == "tf-aws" {
      assert(name.contains("aws-wing-topic"));
    } else { // If it's not a 'tf-aws' target, it's an 'awscdk'
      assert(name.contains("awswingtopic"));
    }
  }
  // If the test is not on AWS, it should not fail, so I am returning true.
  assert(true);
}