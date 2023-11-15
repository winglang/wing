bring cloud;
bring aws;
bring util;

let target = util.env("WING_TARGET");

let api = new cloud.Api() as "aws-wing-api";
api.get("/", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    status: 200
  };
});

let getApiName = (a: cloud.Api): str? => {
  if let api = aws.Api.from(a) {
    let apiAws = api.innerAwsApi();
    return apiAws.name;
  }
  return nil;
};

let apiName = getApiName(api);

test "validates the AWS api name" {
  if let name = apiName {
    assert(name.contains("aws-wing-api"));
  }
  // If the test is not on AWS, it should not fail, so I am returning true.
  assert(true);
}