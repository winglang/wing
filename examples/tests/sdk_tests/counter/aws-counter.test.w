bring cloud;
bring aws;
bring util;

let target = util.env("WING_TARGET");

let counter = new cloud.Counter(initial: 1) as "aws-wing-counter";

let getCounterInfo = (c: cloud.Counter): Map<str>? => {
  if let counter = aws.Counter.from(c) {
    return {
      tableName: counter.tableName,
      arn: counter.arn,
    };
  }
  return nil;
};

let counterInfo = getCounterInfo(counter);

test "validates the AWS counter name" {
  if let counter = counterInfo {
    assert(counter.get("arn").contains("arn:aws:dynamodb:"));
    assert(counter.get("arn").contains("aws-wing-counter"));
    assert(counter.get("tableName").contains("aws-wing-counter"));
  } else {
    // If the test is not on AWS, it should not fail, so I am returning true.
    assert(true);
  }
}