bring cloud;
bring aws;
bring util;

let target = util.env("WING_TARGET");

let counter = new cloud.Counter(initial: 1) as "aws-wing-counter";

let getCounterInfo = (c: cloud.Counter): Map<str>? => {
  if let counter = aws.Counter.from(c) {
    return {
      dynamoTableArn: counter.dynamoTableArn,
      dynamoTableName: counter.dynamoTableName,
    };
  }
  return nil;
};

let counterInfo = getCounterInfo(counter);

test "validates the AWS counter name" {
  if let counter = counterInfo {
    if target == "tf-aws" {
      assert(counter.get("dynamoTableArn").contains("arn:aws:dynamodb:"));
      assert(counter.get("dynamoTableArn").contains("aws-wing-counter"));
      assert(counter.get("dynamoTableName").contains("aws-wing-counter"));
    } else {
      assert(counter.get("dynamoTableArn").contains("arn:aws:dynamodb:"));
      assert(counter.get("dynamoTableArn").contains("awswingcounter"));
      assert(counter.get("dynamoTableName").contains("awswingcounter"));
    }
  } else {
    // If the test is not on AWS, it should not fail, so I am returning true.
    assert(true);
  }
}